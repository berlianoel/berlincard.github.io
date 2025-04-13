import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const secretMessages = pgTable("secret_messages", {
  id: serial("id").primaryKey(),
  text: text("text").notNull(),
  date: timestamp("date").defaultNow().notNull(),
  read: boolean("read").default(false).notNull(),
});

export const serviceOrders = pgTable("service_orders", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  whatsapp: text("whatsapp").notNull(),
  service: text("service").notNull(),
  details: text("details").notNull(),
  date: timestamp("date").defaultNow().notNull(),
  completed: boolean("completed").default(false).notNull(),
});

export const insertSecretMessageSchema = createInsertSchema(secretMessages).omit({
  id: true,
  date: true,
});

export const insertServiceOrderSchema = createInsertSchema(serviceOrders).omit({
  id: true,
  date: true,
});

export type InsertSecretMessage = z.infer<typeof insertSecretMessageSchema>;
export type SecretMessage = typeof secretMessages.$inferSelect;

export type InsertServiceOrder = z.infer<typeof insertServiceOrderSchema>;
export type ServiceOrder = typeof serviceOrders.$inferSelect;

// Maintain original User schema for compatibility
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
