import { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X, Loader2, Check, Trash2, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { format } from 'date-fns';
import { ServiceRequest, Message, MessageReply } from '@shared/schema';

interface AdminDashboardProps {
  onClose: () => void;
}

const replySchema = z.object({
  content: z.string().min(1, { message: "Reply cannot be empty." }),
});

type MessageWithReplies = Message & { replies: MessageReply[] };

export default function AdminDashboard({ onClose }: AdminDashboardProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [replyToId, setReplyToId] = useState<number | null>(null);
  
  const { data: serviceRequests = [], isLoading: isLoadingServices } = useQuery<ServiceRequest[]>({
    queryKey: ['/api/services'],
  });
  
  const { data: messages = [], isLoading: isLoadingMessages } = useQuery<MessageWithReplies[]>({
    queryKey: ['/api/messages'],
  });
  
  const replyForm = useForm<z.infer<typeof replySchema>>({
    resolver: zodResolver(replySchema),
    defaultValues: {
      content: "",
    },
  });
  
  const completeServiceMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await apiRequest("PUT", `/api/services/${id}/complete`, {});
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Service Completed",
        description: "The service request has been marked as completed.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/services'] });
    },
    onError: (error) => {
      toast({
        title: "Action Failed",
        description: error.message || "Could not complete this operation.",
        variant: "destructive",
      });
    },
  });
  
  const deleteServiceMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/services/${id}`, {});
    },
    onSuccess: () => {
      toast({
        title: "Service Deleted",
        description: "The service request has been deleted.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/services'] });
    },
    onError: (error) => {
      toast({
        title: "Deletion Failed",
        description: error.message || "Could not delete this service request.",
        variant: "destructive",
      });
    },
  });
  
  const replyMutation = useMutation({
    mutationFn: async ({ id, content }: { id: number, content: string }) => {
      const response = await apiRequest("POST", `/api/messages/${id}/replies`, { content });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Reply Sent",
        description: "Your royal response has been delivered.",
      });
      replyForm.reset();
      setReplyToId(null);
      queryClient.invalidateQueries({ queryKey: ['/api/messages'] });
    },
    onError: (error) => {
      toast({
        title: "Reply Failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });
  
  const onSubmitReply = (data: z.infer<typeof replySchema>) => {
    if (replyToId !== null) {
      replyMutation.mutate({ id: replyToId, content: data.content });
    }
  };
  
  // Handle click outside to close
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
  return (
    <motion.div 
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={handleBackdropClick}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <Card className="glass flex-1 overflow-hidden">
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle className="font-cinzel text-2xl text-primary">Admin Dashboard</CardTitle>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </Button>
          </CardHeader>
          <CardContent className="p-0 overflow-hidden">
            <Tabs defaultValue="services" className="h-full flex flex-col">
              <TabsList className="mx-6 my-2 justify-start">
                <TabsTrigger value="services" className="font-cinzel">Service Requests</TabsTrigger>
                <TabsTrigger value="messages" className="font-cinzel">Secret Messages</TabsTrigger>
              </TabsList>
              
              {/* Services Tab */}
              <TabsContent value="services" className="flex-1 overflow-auto m-0 p-6 pt-0">
                {isLoadingServices ? (
                  <div className="flex justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : serviceRequests.length === 0 ? (
                  <div className="glass rounded-lg p-4 text-center my-6">
                    <p className="text-gray-400">No service requests yet.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full glass rounded-lg mt-4">
                      <thead>
                        <tr>
                          <th className="px-4 py-3 text-left text-primary font-cinzel">Name</th>
                          <th className="px-4 py-3 text-left text-primary font-cinzel">Contact</th>
                          <th className="px-4 py-3 text-left text-primary font-cinzel">Request</th>
                          <th className="px-4 py-3 text-left text-primary font-cinzel">Date</th>
                          <th className="px-4 py-3 text-left text-primary font-cinzel">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {serviceRequests.map((request) => (
                          <tr key={request.id} className={request.completed ? "opacity-50" : ""}>
                            <td className="px-4 py-3 border-t border-gray-800">{request.name}</td>
                            <td className="px-4 py-3 border-t border-gray-800">{request.contact}</td>
                            <td className="px-4 py-3 border-t border-gray-800 max-w-xs truncate">{request.requestDetails}</td>
                            <td className="px-4 py-3 border-t border-gray-800">
                              {format(new Date(request.createdAt), 'MMM d, yyyy')}
                            </td>
                            <td className="px-4 py-3 border-t border-gray-800">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-primary hover:text-primary/80"
                                onClick={() => completeServiceMutation.mutate(request.id)}
                                disabled={request.completed || completeServiceMutation.isPending}
                              >
                                <Check className="h-5 w-5" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-destructive hover:text-destructive/80 ml-1"
                                onClick={() => deleteServiceMutation.mutate(request.id)}
                                disabled={deleteServiceMutation.isPending}
                              >
                                <Trash2 className="h-5 w-5" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </TabsContent>
              
              {/* Messages Tab */}
              <TabsContent value="messages" className="flex-1 overflow-auto m-0 p-6 pt-0">
                {isLoadingMessages ? (
                  <div className="flex justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : messages.length === 0 ? (
                  <div className="glass rounded-lg p-4 text-center my-6">
                    <p className="text-gray-400">No messages yet.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div key={message.id} className="glass rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-primary font-cinzel text-sm">Anonymous Subject</span>
                          <span className="text-gray-400 text-xs">
                            {format(new Date(message.createdAt), 'MMM d, yyyy h:mm a')}
                          </span>
                        </div>
                        <p className="text-gray-300 mb-3">{message.content}</p>
                        
                        {/* Display existing replies */}
                        {message.replies && message.replies.length > 0 && (
                          <div className="pl-4 border-l-2 border-primary mt-3 space-y-3">
                            {message.replies.map((reply) => (
                              <div key={reply.id}>
                                <div className="flex justify-between items-start mb-1">
                                  <span className="text-primary font-cinzel text-sm">Berlinnad</span>
                                  <span className="text-gray-400 text-xs">
                                    {format(new Date(reply.createdAt), 'MMM d, yyyy h:mm a')}
                                  </span>
                                </div>
                                <p className="text-gray-300">{reply.content}</p>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {/* Reply form */}
                        <div className="mt-3">
                          {replyToId === message.id ? (
                            <Form {...replyForm}>
                              <form onSubmit={replyForm.handleSubmit(onSubmitReply)} className="flex gap-2">
                                <FormField
                                  control={replyForm.control}
                                  name="content"
                                  render={({ field }) => (
                                    <FormItem className="flex-grow">
                                      <FormControl>
                                        <Input 
                                          placeholder="Reply to this message..." 
                                          className="bg-background/50 border-gray-700 focus:border-primary" 
                                          {...field} 
                                        />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                                <Button 
                                  type="submit" 
                                  className="px-4 bg-primary hover:bg-primary/80 text-white"
                                  disabled={replyMutation.isPending}
                                >
                                  {replyMutation.isPending ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                  ) : (
                                    <Send className="h-4 w-4" />
                                  )}
                                </Button>
                                <Button 
                                  type="button" 
                                  variant="ghost"
                                  onClick={() => setReplyToId(null)}
                                >
                                  Cancel
                                </Button>
                              </form>
                            </Form>
                          ) : (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setReplyToId(message.id)}
                              className="mt-2"
                            >
                              <Send className="h-4 w-4 mr-2" /> Reply
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
