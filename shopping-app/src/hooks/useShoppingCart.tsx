import { useState } from "react";
import { ProductCart } from "../components/App";
import { Product } from "../interfaces/Product";

const useShoppingCart = () => {
  const [shoppingCart, setShoppingCart] = useState<ProductCart[]>([]);

  const handleRemoveAllItemsCart = (productId: number) => {
    setShoppingCart(shoppingCart.filter((item) => item.product.id !== productId));
    return;
  };

  const handleAddProductToCart = (product: Product, amount: number) => {
    const productFind = shoppingCart.find((item) => item.product.id === product.id);
    if (!productFind) {
      setShoppingCart([...shoppingCart, { product, amount }]);
      return;
    }
    setShoppingCart(
      shoppingCart.map((item) => {
        return item.product.id === product.id
          ? { ...item, amount: productFind.amount ? productFind.amount + amount : amount }
          : item;
      })
    );
  };

  const handleRemoveProductFromCart = (productId: number) => {
    const productFind = shoppingCart.find((item) => item.product.id === productId);
    if (!productFind) {
      return;
    }
    if (productFind.amount === 1) {
      setShoppingCart(shoppingCart.filter((item) => item.product.id !== productId));
      return;
    }
    setShoppingCart(
      shoppingCart.map((item) => {
        return item.product.id === productId ? { ...item, amount: productFind.amount ? productFind.amount - 1 : 0 } : item;
      })
    );
  };

  return [shoppingCart, setShoppingCart, handleRemoveAllItemsCart, handleAddProductToCart, handleRemoveProductFromCart] as const;
};

export default useShoppingCart;
