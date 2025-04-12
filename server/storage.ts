import { 
  users, type User, type InsertUser,
  serviceRequests, type ServiceRequest, type InsertServiceRequest,
  messages, type Message, type InsertMessage,
  messageReplies, type MessageReply, type InsertMessageReply
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and } from "drizzle-orm";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import { pool } from "./db";

const PostgresSessionStore = connectPgSimple(session);

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
  
  // Session store
  sessionStore: ReturnType<typeof connectPgSimple>;
}

export class DatabaseStorage implements IStorage {
  sessionStore: ReturnType<typeof connectPgSimple>;
  
  constructor() {
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

export const storage = new DatabaseStorage();
