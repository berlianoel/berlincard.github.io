import { motion } from 'framer-motion';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { insertServiceRequestSchema } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, LogIn } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  contact: z.string().min(5, { message: "Please provide a valid email or WhatsApp number." }),
  requestDetails: z.string().min(10, { message: "Please describe your request in detail (min 10 chars)." }),
});

type FormValues = z.infer<typeof formSchema>;

export default function ServicesSection() {
  const { toast } = useToast();
  
  const services = [
    "Coding", "Repairs", "Deliveries", "Assistance", "Custom Work"
  ];
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      contact: "",
      requestDetails: "",
    },
  });
  
  const mutation = useMutation({
    mutationFn: async (data: FormValues) => {
      const response = await apiRequest("POST", "/api/services", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Request Submitted",
        description: "Your service request has been submitted to the royal court!",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Submission Failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });
  
  const onSubmit = (data: FormValues) => {
    mutation.mutate(data);
  };
  
  return (
    <section 
      id="services"
      className="section mb-16 glass rounded-lg p-6 md:p-8"
    >
      <h2 className="font-cinzel text-3xl text-primary mb-6 flex items-center">
        <i className="fas fa-crown mr-3"></i> Royal Services
      </h2>
      
      <div className="mb-6">
        <motion.p 
          className="text-gray-300 mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          I offer various services in the Yogyakarta area. From coding to repairs to deliveries - your royal command is my mission. Fill out the form below to request my services.
        </motion.p>
        
        <motion.div 
          className="flex flex-wrap gap-3 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
        >
          {services.map((service, index) => (
            <motion.div 
              key={index}
              className="px-4 py-2 bg-primary/30 rounded-full text-sm"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {service}
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-cinzel text-gray-300">Your Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter your name" 
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
            name="contact"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-cinzel text-gray-300">Email/WhatsApp</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter your email or WhatsApp number" 
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
            name="requestDetails"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-cinzel text-gray-300">Your Request</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Describe what service you need in detail" 
                    className="bg-background/50 border-gray-700 focus:border-primary" 
                    rows={4}
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary/80 text-white py-3 rounded-md font-cinzel"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Request"
            )}
          </Button>
        </form>
      </Form>
      
      {/* Admin Login Link - Only at bottom of services section */}
      <div className="mt-8 text-center">
        <Button 
          variant="link" 
          size="sm"
          onClick={() => {
            const event = new CustomEvent('showAdminModal');
            window.dispatchEvent(event);
          }}
          className="text-primary/60 hover:text-primary text-xs"
        >
          <LogIn className="h-3 w-3 mr-1" />
          Admin Access
        </Button>
      </div>
    </section>
  );
}