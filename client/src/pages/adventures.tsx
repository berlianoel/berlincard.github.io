import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  CardHover, 
  CardHoverImage, 
  CardHoverContent, 
  CardHoverTitle, 
  CardHoverDescription,
  CardHoverFooter
} from "@/components/ui/card-hover";

const adventures = [
  {
    id: 1,
    title: "Mountain Trekking",
    description: "An exciting journey through scenic mountain trails with breathtaking views.",
    image: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    duration: "3 Days",
    price: "$299"
  },
  {
    id: 2,
    title: "Rock Climbing",
    description: "Challenge yourself with professional rock climbing sessions for all skill levels.",
    image: "https://images.unsplash.com/photo-1516398810565-0cb4310bb8ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    duration: "2 Days",
    price: "$199"
  },
  {
    id: 3,
    title: "River Kayaking",
    description: "Navigate through exciting rapids and serene waters with expert instruction.",
    image: "https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    duration: "1 Day",
    price: "$149"
  },
  {
    id: 4,
    title: "Camping Expedition",
    description: "Experience the wilderness with our fully-equipped camping adventures.",
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    duration: "3 Days",
    price: "$249"
  },
  {
    id: 5,
    title: "Wildlife Safari",
    description: "Observe and photograph wild animals in their natural habitats.",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    duration: "2 Days",
    price: "$279"
  },
  {
    id: 6,
    title: "Desert Expedition",
    description: "Explore beautiful desert landscapes and experience unique ecosystems.",
    image: "https://images.unsplash.com/photo-1547235001-d703406d3f17?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    duration: "4 Days",
    price: "$349"
  },
];

export default function Adventures() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary-700 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Our Adventure Packages</h1>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto mb-8">
            Choose from a variety of exciting adventures led by our experienced guides.
            All packages include necessary equipment, meals, and safety training.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {adventures.map((adventure) => (
              <CardHover key={adventure.id}>
                <CardHoverImage 
                  src={adventure.image} 
                  alt={adventure.title} 
                />
                <CardHoverContent>
                  <div className="flex justify-between items-start mb-2">
                    <CardHoverTitle>{adventure.title}</CardHoverTitle>
                    <Badge variant="outline" className="bg-accent-100 text-accent-800 text-sm font-semibold px-3 py-1 rounded-full">{adventure.duration}</Badge>
                  </div>
                  <CardHoverDescription className="mb-4">{adventure.description}</CardHoverDescription>
                  <CardHoverFooter>
                    <span className="text-primary font-bold">{adventure.price}</span>
                    <Button variant="link" className="text-primary hover:text-primary/90 font-medium flex items-center p-0">
                      View Details
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardHoverFooter>
                </CardHoverContent>
              </CardHover>
            ))}
          </div>
        </div>
      </section>

      {/* Adventure Levels */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Adventure Levels</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              We offer adventures for every experience level, from beginners to experts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Beginner</h3>
              <ul className="space-y-2 text-gray-600 mb-6">
                <li>• No prior experience needed</li>
                <li>• Full instruction provided</li>
                <li>• Easy-paced activities</li>
                <li>• Perfect for first-time adventurers</li>
              </ul>
              <p className="text-primary font-semibold">Suitable for ages 10+</p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Intermediate</h3>
              <ul className="space-y-2 text-gray-600 mb-6">
                <li>• Some experience recommended</li>
                <li>• Moderate physical activity</li>
                <li>• More challenging terrain</li>
                <li>• Some technical skills required</li>
              </ul>
              <p className="text-primary font-semibold">Suitable for ages 14+</p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Advanced</h3>
              <ul className="space-y-2 text-gray-600 mb-6">
                <li>• Previous experience required</li>
                <li>• High level of physical fitness needed</li>
                <li>• Challenging and technical terrain</li>
                <li>• Extended trips in remote areas</li>
              </ul>
              <p className="text-primary font-semibold">Suitable for ages 16+</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Need Help Choosing the Right Adventure?</h2>
          <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">Our team is ready to help you select the perfect adventure based on your interests, skill level, and preferences.</p>
          <Link href="/contact">
            <Button size="lg" className="bg-white hover:bg-gray-100 text-primary-700 font-medium py-3 px-6 rounded-lg transition duration-300 shadow-lg">
              Contact Our Adventure Experts
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
