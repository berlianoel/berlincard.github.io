import { 
  users, type User, type InsertUser,
  secretMessages, type SecretMessage, type InsertSecretMessage,
  serviceOrders, type ServiceOrder, type InsertServiceOrder 
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Secret Messages
  getAllSecretMessages(): Promise<SecretMessage[]>;
  getSecretMessage(id: number): Promise<SecretMessage | undefined>;
  createSecretMessage(message: InsertSecretMessage): Promise<SecretMessage>;
  deleteSecretMessage(id: number): Promise<void>;
  
  // Service Orders
  getAllServiceOrders(): Promise<ServiceOrder[]>;
  getServiceOrder(id: number): Promise<ServiceOrder | undefined>;
  createServiceOrder(order: InsertServiceOrder): Promise<ServiceOrder>;
  completeServiceOrder(id: number): Promise<ServiceOrder>;
  deleteServiceOrder(id: number): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private messages: Map<number, SecretMessage>;
  private orders: Map<number, ServiceOrder>;
  private currentUserId: number;
  private currentMessageId: number;
  private currentOrderId: number;

  constructor() {
    this.users = new Map();
    this.messages = new Map();
    this.orders = new Map();
    this.currentUserId = 1;
    this.currentMessageId = 1;
    this.currentOrderId = 1;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Secret Message methods
  async getAllSecretMessages(): Promise<SecretMessage[]> {
    return Array.from(this.messages.values()).sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }

  async getSecretMessage(id: number): Promise<SecretMessage | undefined> {
    return this.messages.get(id);
  }

  async createSecretMessage(insertMessage: InsertSecretMessage): Promise<SecretMessage> {
    const id = this.currentMessageId++;
    const message: SecretMessage = { 
      ...insertMessage, 
      id, 
      date: new Date() 
    };
    this.messages.set(id, message);
    return message;
  }

  async deleteSecretMessage(id: number): Promise<void> {
    this.messages.delete(id);
  }

  // Service Order methods
  async getAllServiceOrders(): Promise<ServiceOrder[]> {
    return Array.from(this.orders.values()).sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }

  async getServiceOrder(id: number): Promise<ServiceOrder | undefined> {
    return this.orders.get(id);
  }

  async createServiceOrder(insertOrder: InsertServiceOrder): Promise<ServiceOrder> {
    const id = this.currentOrderId++;
    const order: ServiceOrder = { 
      ...insertOrder, 
      id, 
      date: new Date() 
    };
    this.orders.set(id, order);
    return order;
  }

  async completeServiceOrder(id: number): Promise<ServiceOrder> {
    const order = this.orders.get(id);
    if (!order) {
      throw new Error(`Service order with ID ${id} not found`);
    }
    
    const updatedOrder = { ...order, completed: true };
    this.orders.set(id, updatedOrder);
    return updatedOrder;
  }

  async deleteServiceOrder(id: number): Promise<void> {
    this.orders.delete(id);
  }
}

export const storage = new MemStorage();
