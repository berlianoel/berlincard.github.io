import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSecretMessageSchema, insertServiceOrderSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Secret Messages API
  app.get("/api/messages", async (req, res) => {
    try {
      const messages = await storage.getAllSecretMessages();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: "Error fetching messages" });
    }
  });

  app.post("/api/messages", async (req, res) => {
    try {
      const data = insertSecretMessageSchema.parse(req.body);
      const message = await storage.createSecretMessage(data);
      res.status(201).json(message);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid message data", error });
      } else {
        res.status(500).json({ message: "Error creating message" });
      }
    }
  });

  app.delete("/api/messages/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteSecretMessage(id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: "Error deleting message" });
    }
  });

  // Service Orders API
  app.get("/api/orders", async (req, res) => {
    try {
      const orders = await storage.getAllServiceOrders();
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: "Error fetching orders" });
    }
  });

  app.post("/api/orders", async (req, res) => {
    try {
      const data = insertServiceOrderSchema.parse(req.body);
      const order = await storage.createServiceOrder(data);
      res.status(201).json(order);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid order data", error });
      } else {
        res.status(500).json({ message: "Error creating order" });
      }
    }
  });

  app.patch("/api/orders/:id/complete", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const order = await storage.completeServiceOrder(id);
      res.json(order);
    } catch (error) {
      res.status(500).json({ message: "Error updating order" });
    }
  });

  app.delete("/api/orders/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteServiceOrder(id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: "Error deleting order" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
