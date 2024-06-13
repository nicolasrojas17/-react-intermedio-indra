import { createContext, useCallback, useMemo, useState } from "react";
import { ProductCart } from "../components/App";
import { Product } from "../interfaces/Product";

export interface ShoppingCartValue {
  shoppingCart: ProductCart[];
  amountProductsToAddCart: number;
  setShoppingCart: React.Dispatch<React.SetStateAction<ProductCart[]>>;
  handleAddToCart: (product: Product) => void;
  handleRemoveAllItemsCart: (productId: number) => void;
  handleAddProductToCart: (product: Product, amount: number) => void;
  handleRemoveProductFromCart: (productId: number) => void;
  handleRemoveProductsAmount: () => void;
  handleAddProductsAmount: () => void;
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

  const [amountProductsToAddCart, setAmountProductsToAddCart] = useState<number>(1);

  const handleResetAmountProducts = useCallback(() => {
    setAmountProductsToAddCart(1);
  }, []);

  const handleAddToCart = useCallback(
    (product: Product) => {
      if (shoppingCart && setShoppingCart && product.id) {
        const productFind = shoppingCart.find((item) => item.product.id === product.id);
        if (!productFind) {
          setShoppingCart([...shoppingCart, { product, amount: amountProductsToAddCart }]);
          handleResetAmountProducts();
          return;
        }
        setShoppingCart(
          shoppingCart.map((item) => {
            return item.product.id === product.id
              ? { ...item, amount: productFind.amount ? productFind.amount + amountProductsToAddCart : amountProductsToAddCart }
              : item;
          })
        );
        handleResetAmountProducts();
      }
    },
    [shoppingCart, amountProductsToAddCart, setShoppingCart, handleResetAmountProducts]
  );

  const handleRemoveProductsAmount = useCallback(() => {
    if (amountProductsToAddCart === 1) return;
    setAmountProductsToAddCart(amountProductsToAddCart - 1);
  }, [amountProductsToAddCart]);

  const handleAddProductsAmount = useCallback(() => {
    setAmountProductsToAddCart(amountProductsToAddCart + 1);
  }, [amountProductsToAddCart]);

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
      amountProductsToAddCart,
      setShoppingCart,
      handleAddToCart,
      handleRemoveAllItemsCart,
      handleAddProductToCart,
      handleRemoveProductFromCart,
      handleRemoveProductsAmount,
      handleAddProductsAmount,
    }),
    [
      shoppingCart,
      amountProductsToAddCart,
      setShoppingCart,
      handleAddToCart,
      handleRemoveAllItemsCart,
      handleAddProductToCart,
      handleRemoveProductFromCart,
      handleRemoveProductsAmount,
      handleAddProductsAmount,
    ]
  );

  return <ShoppingCartContext.Provider value={objShoppingCart}>{children}</ShoppingCartContext.Provider>;
};

export default ShoppingCartContextProvider;
