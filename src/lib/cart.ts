export interface CartItem {
  productId: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

class CartManager {
  private items: CartItem[] = [];
  private listeners: (() => void)[] = [];

  constructor() {
    // Load cart from localStorage on initialization
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.items = JSON.parse(savedCart);
    }
  }

  subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach(listener => listener());
    localStorage.setItem('cart', JSON.stringify(this.items));
  }

  addItem(product: { id: string; title: string; price: number; image: string }, quantity = 1) {
    const existingItem = this.items.find(item => item.productId === product.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push({
        productId: product.id,
        title: product.title,
        price: product.price,
        quantity,
        image: product.image,
      });
    }
    
    this.notify();
  }

  removeItem(productId: string) {
    this.items = this.items.filter(item => item.productId !== productId);
    this.notify();
  }

  updateQuantity(productId: string, quantity: number) {
    if (quantity <= 0) {
      this.removeItem(productId);
      return;
    }

    const item = this.items.find(item => item.productId === productId);
    if (item) {
      item.quantity = quantity;
      this.notify();
    }
  }

  getItems(): CartItem[] {
    return [...this.items];
  }

  getItemCount(): number {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  getTotal(): number {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  clear() {
    this.items = [];
    this.notify();
  }
}

export const cart = new CartManager();