import { CartItem, Product } from "@/types";
import { randomUUID } from "expo-crypto";
import { createContext, useContext, useState } from "react";

type Props = {
  children: React.ReactNode;
};

type CartType = {
  items: CartItem[];
  onAddItem: (product: Product, size: CartItem["size"]) => void;
  onUpdateQuantity: (itemId: String, amount: -1 | 1) => void;
  onRemoveItem: (item: CartItem) => void;
};

const CartContext = createContext<CartType>({} as CartType);

const CartProvider = ({ children }: Props) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const onAddItem = (product: Product, size: CartItem["size"]) => {
    const existingItem = items.find(
      (item) => item.product === product && item.size === size
    );

    if (existingItem) {
      onUpdateQuantity(existingItem.id, 1);
      return;
    }

    const newCartItem: CartItem = {
      id: randomUUID(),
      product: product,
      product_id: product.id,
      size: size,
      quantity: 1,
    };

    setItems((prevItems) => [...prevItems, newCartItem]);
  };

  const onUpdateQuantity = (itemId: String, amount: -1 | 1) => {
    const updatedItems = items
      .map((item) =>
        item.id !== itemId
          ? item
          : { ...item, quantity: item.quantity + amount }
      )
      .filter((item) => item.quantity > 0);
    setItems(updatedItems);
  };

  return (
    <CartContext.Provider
      value={{
        items: items,
        onAddItem: onAddItem,
        onUpdateQuantity: onUpdateQuantity,
        onRemoveItem: () => {},
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () => useContext(CartContext);
