import { Link } from 'react-router-dom';
import { Store, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-accent rounded-xl">
                <Store className="h-6 w-6 text-accent-foreground" />
              </div>
              <span className="text-xl font-bold">Hamza Store</span>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Your premium destination for quality products. We offer the best selection of items at competitive prices with excellent customer service.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-primary-foreground/80 hover:text-accent transition-colors text-sm">
                Home
              </Link>
              <Link to="/products" className="block text-primary-foreground/80 hover:text-accent transition-colors text-sm">
                Products
              </Link>
              <Link to="/about" className="block text-primary-foreground/80 hover:text-accent transition-colors text-sm">
                About Us
              </Link>
            </div>
          </div>

          {/* Policies */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Policies</h3>
            <div className="space-y-2">
              <Link to="/terms" className="block text-primary-foreground/80 hover:text-accent transition-colors text-sm">
                Terms & Conditions
              </Link>
              <Link to="/privacy" className="block text-primary-foreground/80 hover:text-accent transition-colors text-sm">
                Privacy Policy
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-accent" />
                <span className="text-primary-foreground/80 text-sm">+92 370 0823338</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-accent" />
                <span className="text-primary-foreground/80 text-sm">Multan, Pakistan</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-primary-foreground/60 text-sm">
            © {new Date().getFullYear()} Hamza Store. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;