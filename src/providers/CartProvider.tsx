import { CartItem, Product } from "@/types";
import { createContext, useContext, useState } from "react";

type Props = {
  children: React.ReactNode;
};

type CartType = {
  items: CartItem[];
  onAddItem: (product: Product, size: CartItem["size"]) => void;
  onRemoveItem: (item: CartItem) => void;
};

const CartContext = createContext<CartType>({} as CartType);

const CartProvider = ({ children }: Props) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const onAddItem = (product: Product, size: CartItem["size"]) => {
    const newCartItem: CartItem = {
      id: product.id.toString(),
      product: product,
      product_id: product.id,
      size: size,
      quantity: 1,
    };

    setItems((prevItems) => [...prevItems, newCartItem]);
    console.log(items);
  };

  return (
    <CartContext.Provider
      value={{
        items: items,
        onAddItem: onAddItem,
        onRemoveItem: () => {},
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () => useContext(CartContext);
