import { useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { insertUserSchema } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, CrownIcon } from "lucide-react";

const loginSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters long",
  }),
  password: z.string().min(4, {
    message: "Password must be at least 4 characters long",
  }),
});

const registerSchema = insertUserSchema.extend({
  password: z.string().min(4, {
    message: "Password must be at least 4 characters long",
  }),
});

export default function AuthPage() {
  const [location, navigate] = useLocation();
  const { user, loginMutation, registerMutation } = useAuth();
  
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  
  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  
  async function onLoginSubmit(values: z.infer<typeof loginSchema>) {
    await loginMutation.mutateAsync(values);
  }
  
  async function onRegisterSubmit(values: z.infer<typeof registerSchema>) {
    await registerMutation.mutateAsync(values);
  }
  
  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Background */}
      <div className="fixed inset-0 bg-cover bg-center z-[-1]" 
           style={{backgroundImage: "url('https://i.ibb.co/gFHGbmwB/Crimson-Portal.jpg')"}}></div>
      <div className="fixed inset-0 bg-gradient-to-b from-background/80 to-background/95 z-[-1]"></div>
      
      <div className="flex-1 container flex items-center justify-center py-12">
        <div className="grid w-full lg:grid-cols-2 gap-8 items-center max-w-5xl">
          {/* Left Column - Auth Forms */}
          <div className="w-full">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="login" className="font-cinzel">Login</TabsTrigger>
                <TabsTrigger value="register" className="font-cinzel">Register</TabsTrigger>
              </TabsList>
              
              {/* Login Form */}
              <TabsContent value="login">
                <Card className="glass">
                  <CardHeader>
                    <CardTitle className="font-cinzel text-2xl text-primary">Return</CardTitle>
                    <CardDescription>Enter your credentials to access your royal domain</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...loginForm}>
                      <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-6">
                        <FormField
                          control={loginForm.control}
                          name="username"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-cinzel">Username</FormLabel>
                              <FormControl>
                                <Input 
                                  className="bg-background/50" 
                                  placeholder="Enter your username" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={loginForm.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-cinzel">Password</FormLabel>
                              <FormControl>
                                <Input 
                                  className="bg-background/50" 
                                  type="password" 
                                  placeholder="Enter your password" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button 
                          type="submit" 
                          className="w-full font-cinzel bg-primary" 
                          disabled={loginMutation.isPending}
                        >
                          {loginMutation.isPending ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Authenticating...
                            </>
                          ) : (
                            "Enter"
                          )}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Register Form */}
              <TabsContent value="register">
                <Card className="glass">
                  <CardHeader>
                    <CardTitle className="font-cinzel text-2xl text-primary">Claim Your Title</CardTitle>
                    <CardDescription>Create an account to establish your royal presence</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...registerForm}>
                      <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-6">
                        <FormField
                          control={registerForm.control}
                          name="username"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-cinzel">Choose a Username</FormLabel>
                              <FormControl>
                                <Input 
                                  className="bg-background/50" 
                                  placeholder="Your desired username" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={registerForm.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-cinzel">Create a Password</FormLabel>
                              <FormControl>
                                <Input 
                                  className="bg-background/50" 
                                  type="password" 
                                  placeholder="Your secret password" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button 
                          type="submit" 
                          className="w-full font-cinzel bg-primary" 
                          disabled={registerMutation.isPending}
                        >
                          {registerMutation.isPending ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Creating account...
                            </>
                          ) : (
                            "Establish Royalty"
                          )}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Right Column - Hero Section */}
          <div className="hidden lg:flex flex-col items-center justify-center text-center p-6">
            <CrownIcon className="h-20 w-20 text-primary mb-6 animate-pulse-slow" />
            <h1 className="font-cinzel text-4xl text-primary mb-4">Berlinnad's Domain</h1>
            <p className="text-lg mb-8">"Quiet face, loud mind."</p>
            <div className="glass p-6 rounded-lg max-w-sm">
              <h2 className="font-cinzel text-xl mb-4">Enter</h2>
              <p className="text-sm mb-4">
                Access the royal chamber, view exclusive content, and interact with the kingdom's services. 
                Anonymous messages can be sent without authentication.
              </p>
              <p className="text-xs text-muted-foreground">
                Login with the royal credentials or establish your presence by creating a new account.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
