import { Users, Target, Award, Globe } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description: "To provide customers with the highest quality products at competitive prices, backed by exceptional customer service and a seamless shopping experience."
    },
    {
      icon: Users,
      title: "Customer First",
      description: "We believe in putting our customers at the heart of everything we do, ensuring their satisfaction and building long-lasting relationships."
    },
    {
      icon: Award,
      title: "Quality Promise",
      description: "Every product in our store is carefully selected and tested to meet our high standards of quality and reliability."
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "We're committed to serving customers worldwide with fast, reliable shipping and excellent support across all regions."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.2s_forwards]">
          <h1 className="text-5xl font-bold mb-6">About Hamza Store</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We're more than just an online store – we're your trusted partner in finding quality products 
            that enhance your lifestyle. Since our founding, we've been committed to excellence in every 
            aspect of our business.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.4s_forwards]">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Our Story</h2>
            <p className="text-muted-foreground leading-relaxed">
              Hamza Store was born from a simple idea: everyone deserves access to high-quality products 
              without compromising on service or value. What started as a small venture has grown into a 
              trusted platform serving customers across the region.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our founder, Hamza, recognized the need for a reliable e-commerce platform that prioritizes 
              customer satisfaction above all else. Today, we continue that mission with a carefully curated 
              selection of products and a team dedicated to providing exceptional service.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We believe that shopping should be enjoyable, convenient, and trustworthy. That's why we've 
              invested in creating a platform that not only showcases amazing products but also ensures 
              a smooth and secure shopping experience from browse to delivery.
            </p>
          </div>
          
          <div className="relative opacity-0 animate-[fadeInUp_0.8s_ease-out_0.6s_forwards]">
            <div className="card-premium p-8 text-center">
              <div className="text-4xl font-bold text-accent mb-2">1000+</div>
              <p className="text-muted-foreground mb-4">Happy Customers</p>
              
              <div className="text-4xl font-bold text-accent mb-2">500+</div>
              <p className="text-muted-foreground mb-4">Products Available</p>
              
              <div className="text-4xl font-bold text-accent mb-2">24/7</div>
              <p className="text-muted-foreground">Customer Support</p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.8s_forwards]">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              These core values guide everything we do and shape the experience we provide to our customers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div 
                key={index} 
                className="card-premium p-8 text-center group hover:scale-105 transition-all duration-500 opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards] hover:shadow-2xl"
                style={{ animationDelay: `${1.0 + index * 0.2}s` }}
              >
                <div className="w-16 h-16 bg-gradient-accent rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="h-8 w-8 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center card-premium p-12 opacity-0 animate-[fadeInUp_0.8s_ease-out_1.8s_forwards]">
          <h2 className="text-3xl font-bold mb-6">Meet Our Team</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Behind Hamza Store is a passionate team of professionals dedicated to making your shopping 
            experience exceptional. We're here to help you find exactly what you're looking for.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-accent rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-accent-foreground">H</span>
              </div>
              <h3 className="text-lg font-semibold">Hamza</h3>
              <p className="text-muted-foreground">Founder & CEO</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary-foreground">CS</span>
              </div>
              <h3 className="text-lg font-semibold">Customer Service Team</h3>
              <p className="text-muted-foreground">Support Specialists</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-accent rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-accent-foreground">LT</span>
              </div>
              <h3 className="text-lg font-semibold">Logistics Team</h3>
              <p className="text-muted-foreground">Delivery Experts</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;