import { useState, useEffect } from 'react';
import { cart, CartItem } from '@/lib/cart';

export const useCart = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [itemCount, setItemCount] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const updateCart = () => {
      setItems(cart.getItems());
      setItemCount(cart.getItemCount());
      setTotal(cart.getTotal());
    };

    // Initial load
    updateCart();

    // Subscribe to changes
    const unsubscribe = cart.subscribe(updateCart);

    return unsubscribe;
  }, []);

  return {
    items,
    itemCount,
    total,
    addItem: cart.addItem.bind(cart),
    removeItem: cart.removeItem.bind(cart),
    updateQuantity: cart.updateQuantity.bind(cart),
    clear: cart.clear.bind(cart),
  };
};