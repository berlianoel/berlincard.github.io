import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { insertServiceRequestSchema, insertMessageSchema, insertMessageReplySchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication routes
  setupAuth(app);

  // Service requests API
  app.post("/api/services", async (req, res, next) => {
    try {
      const validatedData = insertServiceRequestSchema.parse(req.body);
      const serviceRequest = await storage.createServiceRequest(validatedData);
      res.status(201).json(serviceRequest);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid request data", errors: error.errors });
      }
      next(error);
    }
  });

  app.get("/api/services", async (req, res, next) => {
    try {
      if (!req.isAuthenticated() || !req.user.isAdmin) {
        return res.status(403).json({ message: "Unauthorized" });
      }
      
      const serviceRequests = await storage.getServiceRequests();
      res.json(serviceRequests);
    } catch (error) {
      next(error);
    }
  });

  app.put("/api/services/:id/complete", async (req, res, next) => {
    try {
      if (!req.isAuthenticated() || !req.user.isAdmin) {
        return res.status(403).json({ message: "Unauthorized" });
      }
      
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
      }
      
      const serviceRequest = await storage.completeServiceRequest(id);
      if (!serviceRequest) {
        return res.status(404).json({ message: "Service request not found" });
      }
      
      res.json(serviceRequest);
    } catch (error) {
      next(error);
    }
  });

  app.delete("/api/services/:id", async (req, res, next) => {
    try {
      if (!req.isAuthenticated() || !req.user.isAdmin) {
        return res.status(403).json({ message: "Unauthorized" });
      }
      
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
      }
      
      await storage.deleteServiceRequest(id);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  });

  // Messages API
  app.post("/api/messages", async (req, res, next) => {
    try {
      const validatedData = insertMessageSchema.parse(req.body);
      const message = await storage.createMessage(validatedData);
      res.status(201).json(message);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid message data", errors: error.errors });
      }
      next(error);
    }
  });

  app.get("/api/messages", async (req, res, next) => {
    try {
      const messages = await storage.getMessages();
      res.json(messages);
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/messages/:id/replies", async (req, res, next) => {
    try {
      if (!req.isAuthenticated() || !req.user.isAdmin) {
        return res.status(403).json({ message: "Unauthorized" });
      }
      
      const messageId = parseInt(req.params.id);
      if (isNaN(messageId)) {
        return res.status(400).json({ message: "Invalid message ID" });
      }
      
      const validatedData = insertMessageReplySchema.parse({
        messageId,
        content: req.body.content,
      });
      
      const reply = await storage.createMessageReply(validatedData);
      res.status(201).json(reply);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid reply data", errors: error.errors });
      }
      next(error);
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
