import { useState, useEffect } from 'react';
import { Search, Filter, SlidersHorizontal, X, ShoppingBag, Tag, DollarSign } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductGrid from '@/components/products/ProductGrid';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { api } from '@/lib/api';

const Products = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    // Fetch categories from products
    const fetchCategories = async () => {
      try {
        const products = await api.getProducts();
        const uniqueCategories = Array.from(new Set(products.map((p: any) => p.category))) as string[];
        setCategories(['all', ...uniqueCategories]);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setPriceRange([0, 1000]);
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-foreground">Search Products</span>
        </div>
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Type to search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 rounded-xl border-2 bg-white/70 backdrop-blur-sm transition-all duration-200 focus:bg-white focus:border-primary/30 focus:ring-2 focus:ring-primary/20"
          />
          {searchQuery && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setSearchQuery('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 rounded-lg hover:bg-red-100"
            >
              <X className="h-4 w-4 text-muted-foreground hover:text-red-500" />
            </Button>
          )}
        </form>
      </div>

      {/* Category Filter */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Tag className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-foreground">Category</span>
          {selectedCategory !== 'all' && (
            <Badge variant="secondary" className="text-xs">
              {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
            </Badge>
          )}
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="h-12 rounded-xl border-2 bg-white/70 backdrop-blur-sm transition-all duration-200 hover:bg-white focus:bg-white focus:border-primary/30">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
              <SelectValue placeholder="Choose a category" />
            </div>
          </SelectTrigger>
          <SelectContent className="rounded-xl border-2 bg-white/95 backdrop-blur-md">
            {categories.map((category) => (
              <SelectItem 
                key={category} 
                value={category}
                className="rounded-lg margin-1 hover:bg-primary/10 focus:bg-primary/10"
              >
                {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price Range */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Price Range</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs font-medium">
              ${priceRange[0]}
            </Badge>
            <span className="text-muted-foreground">-</span>
            <Badge variant="outline" className="text-xs font-medium">
              ${priceRange[1]}
            </Badge>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-white/20">
          <Slider
            value={priceRange}
            onValueChange={(value) => setPriceRange(value as [number, number])}
            max={1000}
            min={0}
            step={10}
            className="w-full"
          />
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>$0</span>
            <span>$1000</span>
          </div>
        </div>
      </div>

      {/* Active Filters & Actions */}
      <div className="space-y-4 pt-4 border-t border-border">
        {(searchQuery || selectedCategory !== 'all' || priceRange[0] > 0 || priceRange[1] < 1000) && (
          <div className="space-y-2">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            <div className="flex flex-wrap gap-1">
              {searchQuery && (
                <Badge variant="secondary" className="text-xs">
                  Search: {searchQuery.slice(0, 15)}{searchQuery.length > 15 ? '...' : ''}
                </Badge>
              )}
              {selectedCategory !== 'all' && (
                <Badge variant="secondary" className="text-xs">
                  {selectedCategory}
                </Badge>
              )}
              {(priceRange[0] > 0 || priceRange[1] < 1000) && (
                <Badge variant="secondary" className="text-xs">
                  ${priceRange[0]} - ${priceRange[1]}
                </Badge>
              )}
            </div>
          </div>
        )}
        
        <Button 
          variant="outline" 
          size="sm"
          onClick={clearFilters}
          className="w-full rounded-xl bg-white/50 hover:bg-white border-white/20 hover:border-red-200 hover:text-red-600 transition-all duration-200"
        >
          <X className="h-4 w-4 mr-1" />
          Clear All Filters
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">All Products</h1>
          <p className="text-xl text-muted-foreground">
            Discover our complete collection of premium products.
          </p>
        </div>

        <div className="flex gap-0">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0 pr-6">
            <div className="sticky top-8 rounded-3xl bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 backdrop-blur-sm border border-primary/10 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-xl bg-primary/10">
                  <Filter className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">Smart Filters</h2>
                  <p className="text-sm text-muted-foreground">Find exactly what you're looking for</p>
                </div>
              </div>
              <FilterContent />
            </div>
          </div>

          {/* Mobile Filter Button & Sheet */}
          <div className="lg:hidden">
            <Sheet open={showMobileFilters} onOpenChange={setShowMobileFilters}>
              <SheetTrigger asChild>
                <Button 
                  size="icon"
                  className="fixed bottom-24 right-6 z-50 w-14 h-14 rounded-full shadow-2xl bg-primary hover:bg-primary/90 hover:scale-110 transition-all duration-300"
                >
                  <SlidersHorizontal className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full sm:w-80">
                <SheetHeader className="mb-6">
                  <SheetTitle className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-primary/10">
                      <Filter className="h-5 w-5 text-primary" />
                    </div>
                    Smart Filters
                  </SheetTitle>
                </SheetHeader>
                <FilterContent />
              </SheetContent>
            </Sheet>
          </div>

          {/* Products Grid */}
          <div className="flex-1 w-full">
            <ProductGrid 
              category={selectedCategory === 'all' ? undefined : selectedCategory}
              searchQuery={searchQuery}
              priceRange={priceRange}
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Products;