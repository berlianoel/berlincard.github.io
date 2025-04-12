import { useState } from 'react';
import { motion } from 'framer-motion';
import { useMutation, useQuery } from '@tanstack/react-query';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { apiRequest, queryClient } from '@/lib/queryClient';
import { Message, MessageReply } from '@shared/schema';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2, MessageSquare, Reply, User } from 'lucide-react';

type MessageWithReplies = Message & { replies: MessageReply[] };

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  content: z.string().min(5, { message: "Message must be at least 5 characters." }).max(500, { message: "Message must be 500 characters or less." }),
});

export default function MessagesSection() {
  const { toast } = useToast();
  const [expandedMessage, setExpandedMessage] = useState<number | null>(null);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  
  const { data: messages = [], isLoading } = useQuery<MessageWithReplies[]>({
    queryKey: ['/api/messages'],
    refetchInterval: 30000, // Refetch every 30 seconds
  });
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      content: "",
    },
  });
  
  const messageMutation = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      const response = await apiRequest("POST", "/api/messages", data);
      if (!response.ok) {
        throw new Error("Failed to submit message");
      }
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message Sent",
        description: "Your message has been sent successfully!",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ['/api/messages'] });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
  
  const replyForm = useForm<{ content: string }>({
    resolver: zodResolver(z.object({
      content: z.string().min(2, { message: "Reply must be at least 2 characters." }).max(200, { message: "Reply must be 200 characters or less." }),
    })),
    defaultValues: {
      content: "",
    },
  });
  
  const replyMutation = useMutation({
    mutationFn: async ({ messageId, content }: { messageId: number, content: string }) => {
      const response = await apiRequest("POST", `/api/messages/${messageId}/replies`, { content });
      if (!response.ok) {
        throw new Error("Failed to submit reply");
      }
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Reply Sent",
        description: "Your reply has been sent successfully!",
      });
      replyForm.reset();
      setReplyingTo(null);
      queryClient.invalidateQueries({ queryKey: ['/api/messages'] });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
  
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    messageMutation.mutate(data);
  };
  
  const handleReply = (content: string) => {
    if (replyingTo) {
      replyMutation.mutate({ messageId: replyingTo, content });
    }
  };
  
  return (
    <section 
      id="messages"
      className="section mb-16 glass rounded-lg p-6 md:p-8"
    >
      <h2 className="font-cinzel text-3xl text-primary mb-6 flex items-center">
        <i className="fas fa-message mr-3"></i> Secret Messages
      </h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="font-cinzel text-xl text-gray-200 mb-4 flex items-center">
            <MessageSquare className="mr-2 h-5 w-5" />
            Leave a Message
          </h3>
          
          <div className="glass border border-primary/20 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-300 mb-4">
              Leave me an anonymous message! I may reply to it if I feel like it.
              Feel free to share your thoughts, but please keep it respectful.
            </p>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-cinzel text-gray-300">Your Name (or Anonymous)</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter your name or alias" 
                          className="bg-background/50 border-gray-700 focus:border-primary" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-cinzel text-gray-300">Your Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Type your message here..." 
                          className="bg-background/50 border-gray-700 focus:border-primary min-h-[120px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/80 text-white"
                  disabled={messageMutation.isPending}
                >
                  {messageMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="font-cinzel text-xl text-gray-200 mb-4 flex items-center">
            <i className="fas fa-comments mr-2"></i>
            Recent Messages
          </h3>
          
          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : messages.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <MessageSquare className="h-12 w-12 mx-auto mb-2 opacity-20" />
                <p>No messages yet. Be the first to leave a message!</p>
              </div>
            ) : (
              messages.map((message) => (
                <div 
                  key={message.id} 
                  className="glass border border-primary/20 rounded-lg p-4 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center">
                      <User className="h-5 w-5 mr-2 text-primary" />
                      <span className="font-medium">{message.name || "Anonymous"}</span>
                    </div>
                    <span className="text-xs text-gray-400">
                      {new Date(message.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <p className="text-gray-300 mb-2">{message.content}</p>
                  
                  <div className="flex justify-between items-center mt-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs text-gray-400 hover:text-primary"
                      onClick={() => setExpandedMessage(
                        expandedMessage === message.id ? null : message.id
                      )}
                    >
                      {message.replies.length} {message.replies.length === 1 ? "reply" : "replies"}
                    </Button>
                    
                    {/* Admin Reply Button would be here */}
                  </div>
                  
                  {expandedMessage === message.id && message.replies.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-gray-800">
                      <h4 className="text-sm font-medium mb-2 text-gray-300">Replies:</h4>
                      <div className="space-y-3">
                        {message.replies.map((reply) => (
                          <div key={reply.id} className="bg-primary/10 p-3 rounded">
                            <div className="flex justify-between items-start mb-1">
                              <span className="font-medium text-primary text-sm">Berlinnad</span>
                              <span className="text-xs text-gray-400">
                                {new Date(reply.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-sm text-gray-300">{reply.content}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}