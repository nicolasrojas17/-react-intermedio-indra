import { createContext, useCallback, useMemo, useState } from "react";
import { ProductCart } from "../components/App";
import { Product } from "../interfaces/Product";

export interface ShoppingCartValue {
  shoppingCart: ProductCart[];
  setShoppingCart: React.Dispatch<React.SetStateAction<ProductCart[]>>;
  handleAddToCart: (product: Product, amount: number, handleResetAmountProducts: () => void) => void;
  handleRemoveAllItemsCart: (productId: number) => void;
  handleAddProductToCart: (product: Product, amount: number) => void;
  handleRemoveProductFromCart: (productId: number) => void;
}

export const ShoppingCartContext = createContext<ShoppingCartValue>(null as any);

const ShoppingCartContextProvider = ({ children }: any) => {
  const [shoppingCart, setShoppingCart] = useState<ProductCart[]>([]);

  const handleRemoveAllItemsCart = useCallback(
    (productId: number) => {
      setShoppingCart(shoppingCart.filter((item) => item.product.id !== productId));
    },
    [shoppingCart]
  );

  const handleAddToCart = useCallback(
    (product: Product, amount: number, handleResetAmountProducts: () => void) => {
      if (shoppingCart && setShoppingCart && product.id) {
        const productFind = shoppingCart.find((item) => item.product.id === product.id);
        if (!productFind) {
          setShoppingCart([...shoppingCart, { product, amount: amount }]);
          handleResetAmountProducts();
          return;
        }
        setShoppingCart(
          shoppingCart.map((item) => {
            return item.product.id === product.id
              ? { ...item, amount: productFind.amount ? productFind.amount + amount : amount }
              : item;
          })
        );
        handleResetAmountProducts();
      }
    },
    [shoppingCart, setShoppingCart]
  );

  const handleAddProductToCart = useCallback(
    (product: Product, amount: number) => {
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
    },
    [shoppingCart]
  );

  const handleRemoveProductFromCart = useCallback(
    (productId: number) => {
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
    },
    [shoppingCart]
  );

  const objShoppingCart = useMemo(
    () => ({
      shoppingCart,

      setShoppingCart,
      handleAddToCart,
      handleRemoveAllItemsCart,
      handleAddProductToCart,
      handleRemoveProductFromCart,
    }),
    [
      shoppingCart,

      setShoppingCart,
      handleAddToCart,
      handleRemoveAllItemsCart,
      handleAddProductToCart,
      handleRemoveProductFromCart,
    ]
  );

  return <ShoppingCartContext.Provider value={objShoppingCart}>{children}</ShoppingCartContext.Provider>;
};

export default ShoppingCartContextProvider;
