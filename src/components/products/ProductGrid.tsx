import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import ProductCard from './ProductCard';
import { Loader2 } from 'lucide-react';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';

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
  const [currentPage, setCurrentPage] = useState(1);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  
  const productsPerPage = 8;

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

        setAllProducts(filteredProducts);
        setCurrentPage(1);
        
        // Apply pagination
        const startIndex = 0;
        const endIndex = limit || productsPerPage;
        setProducts(filteredProducts.slice(startIndex, endIndex));
      } catch (err) {
        setError('Failed to load products');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [limit, category, searchQuery, priceRange]);

  // Update products when page changes
  useEffect(() => {
    if (!limit && allProducts.length > 0) {
      const startIndex = (currentPage - 1) * productsPerPage;
      const endIndex = startIndex + productsPerPage;
      setProducts(allProducts.slice(startIndex, endIndex));
    }
  }, [currentPage, allProducts, limit]);

  const totalPages = limit ? 1 : Math.ceil(allProducts.length / productsPerPage);

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
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="animate-fade-in">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
      
      {/* Pagination */}
      {!limit && totalPages > 1 && (
        <div className="flex justify-center mt-12">
          <Pagination>
            <PaginationContent className="gap-2">
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer hover:bg-primary/10"}
                />
              </PaginationItem>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    onClick={() => setCurrentPage(page)}
                    isActive={currentPage === page}
                    className="cursor-pointer w-10 h-10 rounded-xl border-2 transition-all duration-200 hover:bg-primary/10 data-[active]:bg-primary data-[active]:text-primary-foreground data-[active]:border-primary"
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer hover:bg-primary/10"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;