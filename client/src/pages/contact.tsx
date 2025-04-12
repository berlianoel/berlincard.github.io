import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Phone, Mail, Clock, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { insertContactMessageSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

// Extend the schema with validation rules
const formSchema = insertContactMessageSchema.extend({
  name: z.string().min(2, { message: "Name must be at least 2 characters long" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters long" }),
});

type FormValues = z.infer<typeof formSchema>;

export default function Contact() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      adventure: "",
      message: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: FormValues) => {
      const res = await apiRequest("POST", "/api/contact", values);
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "Thank you for your message. We'll get back to you soon.",
        variant: "default",
      });
      form.reset();
      setSubmitted(true);
    },
    onError: (error) => {
      toast({
        title: "Error sending message",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  function onSubmit(values: FormValues) {
    mutate(values);
  }

  return (
    <section id="contact" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Contact Us</h1>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">Have questions about our adventures or need help planning your trip? Get in touch with our team.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Get In Touch</h2>
            <p className="text-lg text-gray-600 mb-8">Our adventure experts are ready to help you plan your perfect outdoor experience. Contact us with any questions or special requests.</p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="text-primary mr-4">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Our Location</h3>
                  <p className="text-gray-600">123 Adventure Way, Mountain View, CA 94043, USA</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="text-primary mr-4">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Phone</h3>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="text-primary mr-4">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Email</h3>
                  <p className="text-gray-600">info@crimsonadventure.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="text-primary mr-4">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Hours</h3>
                  <p className="text-gray-600">Monday-Friday: 9am-5pm<br />Saturday: 10am-3pm<br />Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-white p-8 rounded-xl shadow-md">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="text-primary mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
                  <p className="text-gray-600 mb-6">Your message has been sent successfully. We'll get back to you shortly.</p>
                  <Button 
                    onClick={() => setSubmitted(false)}
                    className="bg-primary hover:bg-primary/90"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium">Your Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium">Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="john@example.com" {...field} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="adventure"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium">Interested In</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                                <SelectValue placeholder="Select an Adventure" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="">Select an Adventure</SelectItem>
                              <SelectItem value="mountain-trekking">Mountain Trekking</SelectItem>
                              <SelectItem value="rock-climbing">Rock Climbing</SelectItem>
                              <SelectItem value="river-kayaking">River Kayaking</SelectItem>
                              <SelectItem value="custom">Custom Adventure</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium">Your Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell us about your adventure plans or questions..." 
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg" 
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
                      className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-lg transition duration-300 shadow-md"
                      disabled={isPending}
                    >
                      {isPending ? (
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
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
