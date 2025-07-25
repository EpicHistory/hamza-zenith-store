import { Link } from 'react-router-dom';
import { ArrowRight, Star, Shield, Truck, Headphones } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroCarousel from '@/components/home/HeroCarousel';
import ProductGrid from '@/components/products/ProductGrid';
import { Button } from '@/components/ui/button';

const Index = () => {
  const features = [
    {
      icon: Star,
      title: "Premium Quality",
      description: "Carefully curated products that meet the highest standards of quality and craftsmanship."
    },
    {
      icon: Shield,
      title: "Secure Shopping",
      description: "Your data and transactions are protected with industry-leading security measures."
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Quick and reliable delivery service to get your products to you as soon as possible."
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Our dedicated customer support team is here to help you whenever you need assistance."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-8">
        <HeroCarousel />
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Hamza Store?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We're committed to providing you with the best shopping experience possible.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="card-premium text-center p-8 animate-fade-in group hover:scale-105"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-gradient-accent rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-8 w-8 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
              <p className="text-xl text-muted-foreground">
                Discover our most popular and trending items.
              </p>
            </div>
            <Link to="/products">
              <Button className="btn-outline group">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
          
          <ProductGrid limit={8} />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
