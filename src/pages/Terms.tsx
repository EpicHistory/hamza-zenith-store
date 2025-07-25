import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Terms & Conditions</h1>
          
          <div className="card-premium p-8 space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using Hamza Store, you accept and agree to be bound by the terms and provision of this agreement. 
                If you do not agree to abide by the above, please do not use this service.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">2. Product Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                We strive to provide accurate product descriptions, images, and pricing information. However, we do not warrant that 
                product descriptions or other content is accurate, complete, reliable, current, or error-free. Colors may vary due to 
                monitor settings and photography conditions.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">3. Pricing and Payment</h2>
              <p className="text-muted-foreground leading-relaxed">
                All prices are subject to change without notice. We reserve the right to modify prices at any time. Payment is due at 
                the time of order placement. We currently accept Cash on Delivery (COD) as our primary payment method.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">4. Order Processing and Delivery</h2>
              <p className="text-muted-foreground leading-relaxed">
                Orders are processed within 1-2 business days. Delivery times may vary depending on your location. We are not 
                responsible for delays caused by circumstances beyond our control, including but not limited to weather conditions, 
                carrier delays, or incorrect delivery addresses provided by customers.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">5. Returns and Exchanges</h2>
              <p className="text-muted-foreground leading-relaxed">
                We want you to be completely satisfied with your purchase. If you're not happy with your order, please contact us 
                within 7 days of delivery. Items must be in original condition with tags attached. Return shipping costs may apply 
                unless the return is due to our error.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">6. Privacy and Data Protection</h2>
              <p className="text-muted-foreground leading-relaxed">
                We are committed to protecting your privacy. Personal information collected during the ordering process is used solely 
                for order fulfillment and customer service. We do not share, sell, or distribute your personal information to third 
                parties without your consent.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                Hamza Store shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including 
                without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of our 
                service.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">8. Governing Law</h2>
              <p className="text-muted-foreground leading-relaxed">
                These terms and conditions are governed by and construed in accordance with the laws of Pakistan. Any disputes 
                arising from these terms will be subject to the exclusive jurisdiction of the courts of Pakistan.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">9. Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about these Terms & Conditions, please contact us at support@hamzastore.com or 
                +92 370 0823338.
              </p>
            </div>

            <div className="text-center pt-8 border-t border-border">
              <p className="text-muted-foreground">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Terms;