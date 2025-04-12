import { pgTable, text, serial, integer, boolean, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// User schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  isAdmin: boolean("is_admin").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  isAdmin: true,
});

// Service request schema
export const serviceRequests = pgTable("service_requests", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  contact: text("contact").notNull(),
  requestDetails: text("request_details").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  completed: boolean("completed").default(false).notNull(),
});

export const insertServiceRequestSchema = createInsertSchema(serviceRequests).pick({
  name: true,
  contact: true,
  requestDetails: true,
});

// Message status enum
export const messageStatusEnum = pgEnum("message_status", ["active", "hidden"]);

// Messages schema
export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  name: text("name").default("Anonymous"),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  status: messageStatusEnum("status").default("active").notNull(),
});

export const insertMessageSchema = createInsertSchema(messages).pick({
  name: true,
  content: true,
});

// Message replies schema
export const messageReplies = pgTable("message_replies", {
  id: serial("id").primaryKey(),
  messageId: integer("message_id").notNull().references(() => messages.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertMessageReplySchema = createInsertSchema(messageReplies).pick({
  messageId: true,
  content: true,
});

// Relations
export const messagesRelations = relations(messages, ({ many }) => ({
  replies: many(messageReplies),
}));

export const messageRepliesRelations = relations(messageReplies, ({ one }) => ({
  message: one(messages, {
    fields: [messageReplies.messageId],
    references: [messages.id],
  }),
}));

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type ServiceRequest = typeof serviceRequests.$inferSelect;
export type InsertServiceRequest = z.infer<typeof insertServiceRequestSchema>;

export type Message = typeof messages.$inferSelect;
export type InsertMessage = z.infer<typeof insertMessageSchema>;

export type MessageReply = typeof messageReplies.$inferSelect;
export type InsertMessageReply = z.infer<typeof insertMessageReplySchema>;
