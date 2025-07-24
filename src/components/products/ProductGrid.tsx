import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import ProductCard from './ProductCard';
import { Loader2 } from 'lucide-react';

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

interface ProductGridProps {
  limit?: number;
  category?: string;
  searchQuery?: string;
  priceRange?: [number, number];
}

const ProductGrid = ({ limit, category, searchQuery, priceRange }: ProductGridProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let data;
        
        if (category && category !== 'all') {
          data = await api.getProductsByCategory(category);
        } else {
          data = await api.getProducts();
        }

        // Apply filters
        let filteredProducts = data;

        if (searchQuery) {
          filteredProducts = filteredProducts.filter((product: Product) =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }

        if (priceRange) {
          filteredProducts = filteredProducts.filter((product: Product) =>
            product.price >= priceRange[0] && product.price <= priceRange[1]
          );
        }

        if (limit) {
          filteredProducts = filteredProducts.slice(0, limit);
        }

        setProducts(filteredProducts);
      } catch (err) {
        setError('Failed to load products');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [limit, category, searchQuery, priceRange]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive text-lg">{error}</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">No products found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <div key={product.id} className="animate-fade-in">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;