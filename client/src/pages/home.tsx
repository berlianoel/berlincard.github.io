import { Link } from "wouter";
import { Mountain, MapPin, Tent, ChevronRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CardHover, 
  CardHoverImage, 
  CardHoverContent, 
  CardHoverTitle, 
  CardHoverDescription,
  CardHoverFooter
} from "@/components/ui/card-hover";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero-bg h-screen flex items-center justify-center">
        <div className="text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 text-shadow">Discover Your Next Adventure</h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto text-shadow">Explore breathtaking destinations with our guided adventure tours.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/adventures">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-lg transition duration-300 shadow-lg">
                Explore Adventures
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="bg-white hover:bg-gray-100 text-primary font-medium py-3 px-6 rounded-lg transition duration-300 shadow-lg">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose Crimson Adventure?</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">Experience the best adventure trips with our expert guides and carefully crafted experiences.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition duration-300">
              <div className="text-primary mb-4">
                <Mountain className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert Guides</h3>
              <p className="text-gray-600">Our experienced guides ensure your safety while sharing their knowledge of each destination.</p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition duration-300">
              <div className="text-primary mb-4">
                <MapPin className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Unique Destinations</h3>
              <p className="text-gray-600">Explore off-the-beaten-path locations that most tourists never get to experience.</p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition duration-300">
              <div className="text-primary mb-4">
                <Tent className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">All-Inclusive Packages</h3>
              <p className="text-gray-600">From equipment to meals, our packages include everything you need for an unforgettable adventure.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Adventures Section */}
      <section id="adventures" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Popular Adventures</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">Choose from our most sought-after adventure packages.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Adventure 1 */}
            <CardHover>
              <CardHoverImage 
                src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                alt="Hiking in the mountains" 
              />
              <CardHoverContent>
                <div className="flex justify-between items-start mb-2">
                  <CardHoverTitle>Mountain Trekking</CardHoverTitle>
                  <Badge variant="outline" className="bg-accent-100 text-accent-800 text-sm font-semibold px-3 py-1 rounded-full">3 Days</Badge>
                </div>
                <CardHoverDescription className="mb-4">An exciting journey through scenic mountain trails with breathtaking views.</CardHoverDescription>
                <CardHoverFooter>
                  <span className="text-primary font-bold">$299</span>
                  <Link href="/adventures" className="text-primary hover:text-primary/90 font-medium flex items-center">
                    View Details
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </CardHoverFooter>
              </CardHoverContent>
            </CardHover>
            
            {/* Adventure 2 */}
            <CardHover>
              <CardHoverImage 
                src="https://images.unsplash.com/photo-1516398810565-0cb4310bb8ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                alt="Rock climbing" 
              />
              <CardHoverContent>
                <div className="flex justify-between items-start mb-2">
                  <CardHoverTitle>Rock Climbing</CardHoverTitle>
                  <Badge variant="outline" className="bg-accent-100 text-accent-800 text-sm font-semibold px-3 py-1 rounded-full">2 Days</Badge>
                </div>
                <CardHoverDescription className="mb-4">Challenge yourself with professional rock climbing sessions for all skill levels.</CardHoverDescription>
                <CardHoverFooter>
                  <span className="text-primary font-bold">$199</span>
                  <Link href="/adventures" className="text-primary hover:text-primary/90 font-medium flex items-center">
                    View Details
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </CardHoverFooter>
              </CardHoverContent>
            </CardHover>
            
            {/* Adventure 3 */}
            <CardHover>
              <CardHoverImage 
                src="https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                alt="Kayaking" 
              />
              <CardHoverContent>
                <div className="flex justify-between items-start mb-2">
                  <CardHoverTitle>River Kayaking</CardHoverTitle>
                  <Badge variant="outline" className="bg-accent-100 text-accent-800 text-sm font-semibold px-3 py-1 rounded-full">1 Day</Badge>
                </div>
                <CardHoverDescription className="mb-4">Navigate through exciting rapids and serene waters with expert instruction.</CardHoverDescription>
                <CardHoverFooter>
                  <span className="text-primary font-bold">$149</span>
                  <Link href="/adventures" className="text-primary hover:text-primary/90 font-medium flex items-center">
                    View Details
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </CardHoverFooter>
              </CardHoverContent>
            </CardHover>
          </div>
          
          <div className="mt-12 text-center">
            <Link href="/adventures">
              <Button className="inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-lg transition duration-300 shadow-md">
                View All Adventures
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Destinations Section */}
      <section id="destinations" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Top Destinations</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">Explore our most popular adventure destinations around the world.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Destination 1 */}
            <div className="relative rounded-xl overflow-hidden shadow-lg group">
              <img 
                src="https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Mountain ranges" 
                className="w-full h-80 object-cover transition duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-2xl font-bold text-white mb-2">Rocky Mountains</h3>
                <p className="text-gray-200 mb-4">Experience the majesty of North America's iconic mountain range.</p>
                <Link href="/destinations">
                  <Button className="inline-flex items-center text-white bg-primary hover:bg-primary/90 px-4 py-2 rounded-lg transition duration-300">
                    Explore
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Destination 2 */}
            <div className="relative rounded-xl overflow-hidden shadow-lg group">
              <img 
                src="https://images.unsplash.com/photo-1502082553048-f009c37129b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Amazon rainforest" 
                className="w-full h-80 object-cover transition duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-2xl font-bold text-white mb-2">Amazon Rainforest</h3>
                <p className="text-gray-200 mb-4">Discover the incredible biodiversity of the world's largest rainforest.</p>
                <Link href="/destinations">
                  <Button className="inline-flex items-center text-white bg-primary hover:bg-primary/90 px-4 py-2 rounded-lg transition duration-300">
                    Explore
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Destination 3 */}
            <div className="relative rounded-xl overflow-hidden shadow-lg group">
              <img 
                src="https://images.unsplash.com/photo-1493558103817-58b2aa4f0051?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Norwegian fjords" 
                className="w-full h-80 object-cover transition duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-2xl font-bold text-white mb-2">Norwegian Fjords</h3>
                <p className="text-gray-200 mb-4">Navigate through the stunning coastal waterways of Norway.</p>
                <Link href="/destinations">
                  <Button className="inline-flex items-center text-white bg-primary hover:bg-primary/90 px-4 py-2 rounded-lg transition duration-300">
                    Explore
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Destination 4 */}
            <div className="relative rounded-xl overflow-hidden shadow-lg group">
              <img 
                src="https://images.unsplash.com/photo-1496614932623-0a3a9743552e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="New Zealand landscapes" 
                className="w-full h-80 object-cover transition duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-2xl font-bold text-white mb-2">New Zealand Wilderness</h3>
                <p className="text-gray-200 mb-4">Trek through the diverse and breathtaking landscapes of New Zealand.</p>
                <Link href="/destinations">
                  <Button className="inline-flex items-center text-white bg-primary hover:bg-primary/90 px-4 py-2 rounded-lg transition duration-300">
                    Explore
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">What Our Adventurers Say</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">Don't just take our word for it - hear from those who have experienced our adventures firsthand.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-4 text-accent-500">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-6 italic">"The mountain trekking experience was incredible! Our guide was knowledgeable and made sure we were safe while still having an amazing time."</p>
              <div className="flex items-center">
                <img src="https://randomuser.me/api/portraits/women/32.jpg" alt="Sarah Johnson" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h4 className="font-semibold text-gray-900">Sarah Johnson</h4>
                  <p className="text-gray-500 text-sm">Mountain Trekking, 2023</p>
                </div>
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-4 text-accent-500">
                {[...Array(4)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                  </svg>
                ))}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-accent-500">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-gray-600 mb-6 italic">"As a beginner at rock climbing, I was a bit nervous, but the team at Crimson Adventure made me feel comfortable and confident. By the end of day one, I was scaling walls I never thought I could!"</p>
              <div className="flex items-center">
                <img src="https://randomuser.me/api/portraits/men/46.jpg" alt="Michael Chen" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h4 className="font-semibold text-gray-900">Michael Chen</h4>
                  <p className="text-gray-500 text-sm">Rock Climbing, 2023</p>
                </div>
              </div>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-4 text-accent-500">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-6 italic">"The river kayaking adventure was the highlight of our family vacation. The kids loved it, and the guides were fantastic with them. We'll definitely be booking with Crimson Adventure again!"</p>
              <div className="flex items-center">
                <img src="https://randomuser.me/api/portraits/women/65.jpg" alt="Emily Rodriguez" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h4 className="font-semibold text-gray-900">Emily Rodriguez</h4>
                  <p className="text-gray-500 text-sm">River Kayaking, 2022</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready for Your Next Adventure?</h2>
          <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">Join thousands of satisfied adventurers who have experienced the thrill of exploring with Crimson Adventure.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/adventures">
              <Button variant="secondary" size="lg" className="bg-white hover:bg-gray-100 text-primary-700 font-medium py-3 px-6 rounded-lg transition duration-300 shadow-lg">
                Browse Adventures
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-white font-medium py-3 px-6 rounded-lg transition duration-300 shadow-lg">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
