import { Link } from "wouter";
import { CheckCircle } from "lucide-react";

export default function About() {
  return (
    <>
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900">About Crimson Adventure</h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">Our journey, mission, and commitment to your unforgettable experiences.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 mb-4">Founded in 2010, Crimson Adventure started with a simple mission: to help people experience the natural world in exciting, challenging, and sustainable ways.</p>
              <p className="text-lg text-gray-600 mb-4">Our team of experienced adventure guides and outdoor enthusiasts are passionate about creating unforgettable experiences that connect people with nature while ensuring their safety and comfort.</p>
              <p className="text-lg text-gray-600 mb-8">We believe that adventure is for everyone, which is why we offer a range of experiences suitable for different fitness levels and age groups.</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <div className="text-primary mr-3">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <span className="text-gray-700">Certified Guides</span>
                </div>
                <div className="flex items-center">
                  <div className="text-primary mr-3">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <span className="text-gray-700">Top-Quality Equipment</span>
                </div>
                <div className="flex items-center">
                  <div className="text-primary mr-3">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <span className="text-gray-700">Small Group Sizes</span>
                </div>
                <div className="flex items-center">
                  <div className="text-primary mr-3">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <span className="text-gray-700">Eco-Friendly Practices</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <img src="https://images.unsplash.com/photo-1528184039930-bd03972bd974?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="Team adventure" className="rounded-lg shadow-md" />
              <img src="https://images.unsplash.com/photo-1496275068113-fff8c90750d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="Adventure guide" className="rounded-lg shadow-md mt-8" />
              <img src="https://images.unsplash.com/photo-1486901346041-2a56400ee287?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="Group camping" className="rounded-lg shadow-md" />
              <img src="https://images.unsplash.com/photo-1592845393006-3e9d3b56dd81?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="Hiking group" className="rounded-lg shadow-md mt-8" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img src="https://images.unsplash.com/photo-1516939884455-1445c8652f83?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Our mission" className="rounded-lg shadow-md w-full" />
            </div>
            
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-4">At Crimson Adventure, we are dedicated to providing extraordinary outdoor experiences that inspire, challenge, and connect people with the natural world.</p>
              <p className="text-lg text-gray-600 mb-4">We strive to:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-600">
                <li>Create safe yet exciting adventures for all skill levels</li>
                <li>Promote environmental stewardship and sustainable tourism</li>
                <li>Support local communities in our destination areas</li>
                <li>Inspire a lifelong love of adventure and exploration</li>
              </ul>
              <p className="text-lg text-gray-600">Every trip we design is carefully balanced to provide the right mix of adventure, education, and relaxation.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Meet Our Leadership Team</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">The passionate individuals behind Crimson Adventure's success.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="John Doe" className="w-40 h-40 rounded-full mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900">John Doe</h3>
              <p className="text-primary-600 font-medium mb-2">CEO & Founder</p>
              <p className="text-gray-600">Former wilderness guide with over 20 years of experience in outdoor adventure leadership.</p>
            </div>
            
            <div className="text-center">
              <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Jane Smith" className="w-40 h-40 rounded-full mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900">Jane Smith</h3>
              <p className="text-primary-600 font-medium mb-2">Head of Operations</p>
              <p className="text-gray-600">Certified mountaineering instructor who has led expeditions on six continents.</p>
            </div>
            
            <div className="text-center">
              <img src="https://randomuser.me/api/portraits/men/67.jpg" alt="David Chen" className="w-40 h-40 rounded-full mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900">David Chen</h3>
              <p className="text-primary-600 font-medium mb-2">Chief Adventure Officer</p>
              <p className="text-gray-600">Environmental scientist and experienced adventure guide specializing in eco-friendly expeditions.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Adventure Community</h2>
          <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">Become part of our growing family of adventure enthusiasts and explorers.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contact">
              <button className="bg-white hover:bg-gray-100 text-primary-700 font-medium py-3 px-6 rounded-lg transition duration-300 shadow-lg">
                Contact Us
              </button>
            </Link>
            <Link href="/adventures">
              <button className="bg-accent-500 hover:bg-accent-600 text-white font-medium py-3 px-6 rounded-lg transition duration-300 shadow-lg">
                Explore Adventures
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
