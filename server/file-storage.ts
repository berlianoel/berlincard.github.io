/**
 * CrimsonRealm File-Based Storage
 * Copyright © 2023-2025 Berlianoel
 * All rights reserved.
 * This entire codebase was created by Berlianoel.
 */

import { 
  type User, type InsertUser,
  type ServiceRequest, type InsertServiceRequest,
  type Message, type InsertMessage,
  type MessageReply, type InsertMessageReply
} from "@shared/schema";
import { IStorage } from "./storage";
import fs from "fs";
import path from "path";
import session from "express-session";
import memorystore from "memorystore";

// Direktori tempat file data akan disimpan
const DATA_DIR = path.join(process.cwd(), "data");

// Memastikan direktori data ada
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Fungsi untuk membaca file data
function readDataFile<T>(filename: string, defaultValue: T): T {
  const filePath = path.join(DATA_DIR, filename);
  
  if (!fs.existsSync(filePath)) {
    return defaultValue;
  }
  
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data) as T;
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    return defaultValue;
  }
}

// Fungsi untuk menulis file data
function writeDataFile<T>(filename: string, data: T): void {
  const filePath = path.join(DATA_DIR, filename);
  
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error(`Error writing ${filename}:`, error);
  }
}

export class FileStorage implements IStorage {
  private users: User[] = [];
  private serviceRequests: ServiceRequest[] = [];
  private messages: Message[] = [];
  private messageReplies: MessageReply[] = [];
  readonly sessionStore: any;
  
  constructor() {
    // Membuat session store berbasis memori
    const MemoryStore = memorystore(session);
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000 // Hapus session expired setiap 24 jam
    });
    
    // Load data dari file
    this.loadData();
  }
  
  // Memuat data dari file JSON
  private loadData(): void {
    this.users = readDataFile<User[]>("users.json", []);
    this.serviceRequests = readDataFile<ServiceRequest[]>("service-requests.json", []);
    this.messages = readDataFile<Message[]>("messages.json", []);
    this.messageReplies = readDataFile<MessageReply[]>("message-replies.json", []);
    
    console.log("Loaded file-based storage data");
  }
  
  // Menyimpan data ke file JSON
  private saveData(): void {
    writeDataFile("users.json", this.users);
    writeDataFile("service-requests.json", this.serviceRequests);
    writeDataFile("messages.json", this.messages);
    writeDataFile("message-replies.json", this.messageReplies);
  }
  
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }
  
  async getUserByUsername(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
  
  async createUser(insertUser: InsertUser): Promise<User> {
    const newId = this.users.length > 0 
      ? Math.max(...this.users.map(u => u.id)) + 1 
      : 1;
    
    const now = new Date();
    
    const newUser: User = {
      id: newId,
      username: insertUser.username,
      password: insertUser.password,
      isAdmin: insertUser.isAdmin || false,
      createdAt: now
    };
    
    this.users.push(newUser);
    this.saveData();
    
    return newUser;
  }
  
  // Service request methods
  async createServiceRequest(request: InsertServiceRequest): Promise<ServiceRequest> {
    const newId = this.serviceRequests.length > 0 
      ? Math.max(...this.serviceRequests.map(sr => sr.id)) + 1 
      : 1;
    
    const now = new Date();
    
    const newServiceRequest: ServiceRequest = {
      id: newId,
      name: request.name,
      contact: request.contact,
      requestDetails: request.requestDetails,
      completed: false,
      createdAt: now
    };
    
    this.serviceRequests.push(newServiceRequest);
    this.saveData();
    
    return newServiceRequest;
  }
  
  async getServiceRequests(): Promise<ServiceRequest[]> {
    return [...this.serviceRequests].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }
  
  async completeServiceRequest(id: number): Promise<ServiceRequest | undefined> {
    const index = this.serviceRequests.findIndex(sr => sr.id === id);
    
    if (index === -1) {
      return undefined;
    }
    
    this.serviceRequests[index].completed = true;
    this.saveData();
    
    return this.serviceRequests[index];
  }
  
  async deleteServiceRequest(id: number): Promise<void> {
    const index = this.serviceRequests.findIndex(sr => sr.id === id);
    
    if (index !== -1) {
      this.serviceRequests.splice(index, 1);
      this.saveData();
    }
  }
  
  // Message methods
  async createMessage(message: InsertMessage): Promise<Message> {
    const newId = this.messages.length > 0 
      ? Math.max(...this.messages.map(m => m.id)) + 1 
      : 1;
    
    const now = new Date();
    
    const newMessage: Message = {
      id: newId,
      name: message.name || "Anonymous",
      content: message.content,
      createdAt: now,
      status: "active"
    };
    
    this.messages.push(newMessage);
    this.saveData();
    
    return newMessage;
  }
  
  async getMessages(): Promise<(Message & { replies: MessageReply[] })[]> {
    return this.messages
      .filter(message => message.status === "active")
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .map(message => ({
        ...message,
        replies: this.messageReplies
          .filter(reply => reply.messageId === message.id)
          .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
      }));
  }
  
  async createMessageReply(reply: InsertMessageReply): Promise<MessageReply> {
    const newId = this.messageReplies.length > 0 
      ? Math.max(...this.messageReplies.map(r => r.id)) + 1 
      : 1;
    
    const now = new Date();
    
    const newReply: MessageReply = {
      id: newId,
      messageId: reply.messageId,
      content: reply.content,
      createdAt: now
    };
    
    this.messageReplies.push(newReply);
    this.saveData();
    
    return newReply;
  }
}