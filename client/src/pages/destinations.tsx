import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const destinations = [
  {
    id: 1,
    name: "Rocky Mountains",
    description: "Experience the majesty of North America's iconic mountain range.",
    image: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    location: "United States & Canada"
  },
  {
    id: 2,
    name: "Amazon Rainforest",
    description: "Discover the incredible biodiversity of the world's largest rainforest.",
    image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    location: "Brazil, Peru & Colombia"
  },
  {
    id: 3,
    name: "Norwegian Fjords",
    description: "Navigate through the stunning coastal waterways of Norway.",
    image: "https://images.unsplash.com/photo-1493558103817-58b2aa4f0051?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    location: "Norway"
  },
  {
    id: 4,
    name: "New Zealand Wilderness",
    description: "Trek through the diverse and breathtaking landscapes of New Zealand.",
    image: "https://images.unsplash.com/photo-1496614932623-0a3a9743552e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    location: "New Zealand"
  },
  {
    id: 5,
    name: "Icelandic Highlands",
    description: "Explore volcanic landscapes, geysers, and hot springs in Iceland's interior.",
    image: "https://images.unsplash.com/photo-1529963183134-61a90db47eaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    location: "Iceland"
  },
  {
    id: 6,
    name: "Patagonia",
    description: "Trek through some of the most stunning mountain landscapes on earth.",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    location: "Argentina & Chile"
  }
];

export default function Destinations() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary-700 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Explore Amazing Destinations</h1>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto mb-8">
            Discover breathtaking landscapes and unforgettable adventures in some of the world's most inspiring locations.
          </p>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {destinations.map((destination) => (
              <div key={destination.id} className="relative rounded-xl overflow-hidden shadow-lg group">
                <img 
                  src={destination.image} 
                  alt={destination.name} 
                  className="w-full h-80 object-cover transition duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-1">{destination.name}</h3>
                  <p className="text-sm text-gray-300 mb-2">{destination.location}</p>
                  <p className="text-gray-200 mb-4">{destination.description}</p>
                  <Button className="inline-flex items-center text-white bg-primary hover:bg-primary/90 px-4 py-2 rounded-lg transition duration-300">
                    Explore
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Our Global Destinations</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              We offer adventure experiences across 6 continents and 25+ countries.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg overflow-hidden">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d30632279.13555188!2d-15.952910449999998!3d36.3380024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1654531384346!5m2!1sen!2sus" 
                width="100%" 
                height="450" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Adventure locations map"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Season Information */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Best Times to Visit</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Plan your adventure during the optimal season for your chosen destination.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-green-500 rounded-full mr-3 flex items-center justify-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.5 17a4.5 4.5 0 01-1.44-8.765 4.5 4.5 0 018.302-3.046 3.5 3.5 0 014.504 4.272A4 4 0 0115 17H5.5zm3.75-2.75a.75.75 0 001.5 0V9.66l1.95 2.1a.75.75 0 101.1-1.02l-3.25-3.5a.75.75 0 00-1.1 0l-3.25 3.5a.75.75 0 101.1 1.02l1.95-2.1v4.59z" clipRule="evenodd" />
                  </svg>
                </span>
                Spring (Mar-May)
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Rocky Mountains (for wildflowers)</li>
                <li>• New Zealand (autumn there)</li>
                <li>• Patagonia (autumn there)</li>
                <li>• Amazon Rainforest (less rain)</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-yellow-500 rounded-full mr-3 flex items-center justify-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                </span>
                Summer (Jun-Aug)
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Norwegian Fjords</li>
                <li>• Rocky Mountains</li>
                <li>• Icelandic Highlands</li>
                <li>• Alaska (peak season)</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-orange-500 rounded-full mr-3 flex items-center justify-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                  </svg>
                </span>
                Fall (Sep-Nov)
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Rocky Mountains (fall colors)</li>
                <li>• New Zealand (spring there)</li>
                <li>• Amazon Rainforest (dry season)</li>
                <li>• Patagonia (spring there)</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-blue-500 rounded-full mr-3 flex items-center justify-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.105 4.72a.75.75 0 01.826 0l5 4a.75.75 0 01-.001 1.164l-5 4a.75.75 0 01-1.207-.59l.207-3.068H4.561a.75.75 0 01-.75-.763l.02-2.78a.75.75 0 01.75-.737h8.569l-.207-3.068a.75.75 0 01.381-.59l.002-.002z" />
                  </svg>
                </span>
                Winter (Dec-Feb)
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• New Zealand (summer there)</li>
                <li>• Patagonia (summer there)</li>
                <li>• Amazon Rainforest (wet season)</li>
                <li>• Icelandic Highlands (northern lights)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Explore?</h2>
          <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">Start planning your next adventure to one of our incredible destinations today.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/adventures">
              <Button size="lg" className="bg-white hover:bg-gray-100 text-primary-700 font-medium py-3 px-6 rounded-lg transition duration-300 shadow-lg">
                View Adventures
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
