/**
 * CrimsonRealm Storage System
 * Copyright © 2023-2025 Berlianoel
 * All rights reserved.
 * This entire codebase was created by Berlianoel.
 */

import { 
  users, type User, type InsertUser,
  serviceRequests, type ServiceRequest, type InsertServiceRequest,
  messages, type Message, type InsertMessage,
  messageReplies, type MessageReply, type InsertMessageReply
} from "@shared/schema";
import { db, pool } from "./db";
import { eq, desc } from "drizzle-orm";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import { FileStorage } from "./file-storage";

// Interface untuk storage
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Service request methods
  createServiceRequest(request: InsertServiceRequest): Promise<ServiceRequest>;
  getServiceRequests(): Promise<ServiceRequest[]>;
  completeServiceRequest(id: number): Promise<ServiceRequest | undefined>;
  deleteServiceRequest(id: number): Promise<void>;
  
  // Message methods
  createMessage(message: InsertMessage): Promise<Message>;
  getMessages(): Promise<(Message & { replies: MessageReply[] })[]>;
  createMessageReply(reply: InsertMessageReply): Promise<MessageReply>;
  
  // Session store - bisa berupa memorystore atau pg store
  sessionStore: any;
}

// Implementasi storage dengan PostgreSQL
export class DatabaseStorage implements IStorage {
  sessionStore: any;
  
  constructor() {
    const PostgresSessionStore = connectPgSimple(session);
    this.sessionStore = new PostgresSessionStore({ 
      pool, 
      createTableIfMissing: true 
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }
  
  // Service request methods
  async createServiceRequest(request: InsertServiceRequest): Promise<ServiceRequest> {
    const [serviceRequest] = await db
      .insert(serviceRequests)
      .values(request)
      .returning();
    return serviceRequest;
  }
  
  async getServiceRequests(): Promise<ServiceRequest[]> {
    return db
      .select()
      .from(serviceRequests)
      .orderBy(desc(serviceRequests.createdAt));
  }
  
  async completeServiceRequest(id: number): Promise<ServiceRequest | undefined> {
    const [serviceRequest] = await db
      .update(serviceRequests)
      .set({ completed: true })
      .where(eq(serviceRequests.id, id))
      .returning();
    return serviceRequest;
  }
  
  async deleteServiceRequest(id: number): Promise<void> {
    await db
      .delete(serviceRequests)
      .where(eq(serviceRequests.id, id));
  }
  
  // Message methods
  async createMessage(message: InsertMessage): Promise<Message> {
    const [newMessage] = await db
      .insert(messages)
      .values(message)
      .returning();
    return newMessage;
  }
  
  async getMessages(): Promise<(Message & { replies: MessageReply[] })[]> {
    const allMessages = await db
      .select()
      .from(messages)
      .where(eq(messages.status, 'active'))
      .orderBy(desc(messages.createdAt));
    
    const result = [];
    
    for (const message of allMessages) {
      const messageRepliesData = await db
        .select()
        .from(messageReplies)
        .where(eq(messageReplies.messageId, message.id))
        .orderBy(messageReplies.createdAt);
      
      result.push({
        ...message,
        replies: messageRepliesData,
      });
    }
    
    return result;
  }
  
  async createMessageReply(reply: InsertMessageReply): Promise<MessageReply> {
    const [newReply] = await db
      .insert(messageReplies)
      .values(reply)
      .returning();
    return newReply;
  }
}

// Pilih implementasi storage berdasarkan konfigurasi
function selectStorage(): IStorage {
  // Kondisi untuk memilih file storage (deployment tanpa database)
  // - Tidak ada DATABASE_URL
  // - Ada USE_FILE_STORAGE=true dalam environment
  // - Kondisi lain sesuai kebutuhan
  const useFileStorage = !process.env.DATABASE_URL || 
                        process.env.USE_FILE_STORAGE === 'true' ||
                        process.env.NODE_ENV === 'production';
  
  if (useFileStorage) {
    console.log("Using file-based storage for deployment");
    return new FileStorage();
  } else {
    try {
      console.log("Using database storage");
      return new DatabaseStorage();
    } catch (error) {
      console.error("Error initializing database storage:", error);
      console.log("Falling back to file-based storage");
      return new FileStorage();
    }
  }
}

// Export instance storage yang digunakan aplikasi
export const storage = selectStorage();
