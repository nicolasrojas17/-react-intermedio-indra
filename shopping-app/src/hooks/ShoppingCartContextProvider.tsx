import { createContext, useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductCart } from "../components/App";
import { Product } from "../interfaces/Product";

export interface ShoppingCartValue {
  shoppingCart: ProductCart[];
  orders: any[];
  setShoppingCart: React.Dispatch<React.SetStateAction<ProductCart[]>>;
  handleAddToCart: (product: Product, amount: number, handleResetAmountProducts: () => void) => void;
  handleRemoveAllItemsCart: (productId: number) => void;
  handleAddProductToCart: (product: Product, amount: number) => void;
  handleRemoveProductFromCart: (productId: number) => void;
  handleCheckout: () => void;
}

export const ShoppingCartContext = createContext<ShoppingCartValue>(null as any);

const ShoppingCartContextProvider = ({ children }: any) => {
  const navigate = useNavigate();

  const handleModifyShoppingCart = useCallback((newShoppingCart: any) => {
    const shoppingCartStorage = localStorage.getItem("shoppingCart");
    const shoppingCartInfo = shoppingCartStorage ? JSON.parse(shoppingCartStorage) : [];
    const userStorage = localStorage.getItem("userLocalData");
    const user = userStorage ? JSON.parse(userStorage) : null;

    if (!user) return;

    const shoppingCartUser = shoppingCartInfo.find((item: any) => item.user === user.username);

    if (shoppingCartUser) {
      const newShoppingStorage = shoppingCartInfo.map((item: any) => {
        if (item.user === user.username) item.cart = newShoppingCart;
        return item;
      });
      localStorage.setItem("shoppingCart", JSON.stringify(newShoppingStorage));
      return;
    }
    localStorage.setItem("shoppingCart", JSON.stringify([{ user: user.username, cart: newShoppingCart }]));
  }, []);

  const [shoppingCart, setShoppingCart] = useState<ProductCart[]>(() => {
    const shoppingCartStorage = localStorage.getItem("shoppingCart");
    const shoppingCartInfo = shoppingCartStorage ? JSON.parse(shoppingCartStorage) : [];
    const userStorage = localStorage.getItem("userLocalData");
    const user = userStorage ? JSON.parse(userStorage) : null;
    if (user) return shoppingCartInfo.find((item: any) => item.user === user.username)?.cart || [];
    return [];
  });

  const [orders, setOrders] = useState<any[]>(() => {
    const ordersStorage = localStorage.getItem("orders");
    const ordersStorageInfo = ordersStorage ? JSON.parse(ordersStorage) : [];
    const userStorage = localStorage.getItem("userLocalData");
    const user = userStorage ? JSON.parse(userStorage) : null;
    if (user) {
      return user.role === "ADMIN" ? ordersStorageInfo : ordersStorageInfo.filter((item: any) => item.user === user.username);
    }
    return [];
  });

  const handleRemoveAllItemsCart = useCallback(
    (productId: number) => {
      const newShoppingCart = shoppingCart.filter((item) => item.product.id !== productId);
      setShoppingCart(newShoppingCart);
      handleModifyShoppingCart(newShoppingCart);
    },
    [shoppingCart, handleModifyShoppingCart]
  );

  const handleAddToCart = useCallback(
    (product: Product, amount: number, handleResetAmountProducts: () => void) => {
      if (shoppingCart && setShoppingCart && product.id) {
        const productFind = shoppingCart.find((item) => item.product.id === product.id);
        if (!productFind) {
          const newShoppingCart = [...shoppingCart, { product, amount: amount }];
          setShoppingCart(newShoppingCart);
          handleModifyShoppingCart(newShoppingCart);
          handleResetAmountProducts();
          return;
        }
        const newShoppingCart = shoppingCart.map((item) => {
          return item.product.id === product.id
            ? { ...item, amount: productFind.amount ? productFind.amount + amount : amount }
            : item;
        });

        setShoppingCart(newShoppingCart);
        handleModifyShoppingCart(newShoppingCart);
        handleResetAmountProducts();
      }
    },
    [shoppingCart, setShoppingCart, handleModifyShoppingCart]
  );

  const handleAddProductToCart = useCallback(
    (product: Product, amount: number) => {
      const productFind = shoppingCart.find((item) => item.product.id === product.id);
      if (!productFind) {
        const newShoppingCart = [...shoppingCart, { product, amount }];
        setShoppingCart(newShoppingCart);
        handleModifyShoppingCart(newShoppingCart);
        return;
      }
      const newShoppingCart = shoppingCart.map((item) => {
        return item.product.id === product.id
          ? { ...item, amount: productFind.amount ? productFind.amount + amount : amount }
          : item;
      });
      setShoppingCart(newShoppingCart);
      handleModifyShoppingCart(newShoppingCart);
    },
    [shoppingCart, handleModifyShoppingCart]
  );

  const handleRemoveProductFromCart = useCallback(
    (productId: number) => {
      const productFind = shoppingCart.find((item) => item.product.id === productId);
      if (!productFind) {
        return;
      }
      if (productFind.amount === 1) {
        const newShoppingCart = shoppingCart.filter((item) => item.product.id !== productId);
        setShoppingCart(newShoppingCart);
        handleModifyShoppingCart(newShoppingCart);
        return;
      }
      const newShoppingCart = shoppingCart.map((item) => {
        return item.product.id === productId ? { ...item, amount: productFind.amount ? productFind.amount - 1 : 0 } : item;
      });

      setShoppingCart(newShoppingCart);
      handleModifyShoppingCart(newShoppingCart);
    },
    [shoppingCart, handleModifyShoppingCart]
  );

  const handleCheckout = useCallback(() => {
    const ordersStorage = localStorage.getItem("orders");
    const ordersStorageInfo = ordersStorage ? JSON.parse(ordersStorage) : [];
    const shoppingCartStorage = localStorage.getItem("shoppingCart");
    const shoppingCartInfo = shoppingCartStorage ? JSON.parse(shoppingCartStorage) : [];
    const userStorage = localStorage.getItem("userLocalData");
    const user = userStorage ? JSON.parse(userStorage) : null;

    if (!user) return;

    const shoppingCartUser = shoppingCartInfo.find((item: any) => item.user === user.username);

    const newItemOrder = { id :Math.random().toString(16).slice(2), user: user.username, cart: shoppingCartUser.cart };
    if (ordersStorageInfo.length === 0) {
      localStorage.setItem("orders", JSON.stringify([newItemOrder]));
    } else {
      const newOrdersStorage = [...ordersStorageInfo, newItemOrder];
      localStorage.setItem("orders", JSON.stringify(newOrdersStorage));
    }
    setOrders([newItemOrder]);
    setShoppingCart([]);
    navigate("/user/orders");
  }, [setShoppingCart, navigate, setOrders]);

  const objShoppingCart = useMemo(
    () => ({
      shoppingCart,
      orders,
      setShoppingCart,
      handleAddToCart,
      handleRemoveAllItemsCart,
      handleAddProductToCart,
      handleRemoveProductFromCart,
      handleCheckout,
    }),
    [
      shoppingCart,
      orders,
      setShoppingCart,
      handleAddToCart,
      handleRemoveAllItemsCart,
      handleAddProductToCart,
      handleRemoveProductFromCart,
      handleCheckout,
    ]
  );

  return <ShoppingCartContext.Provider value={objShoppingCart}>{children}</ShoppingCartContext.Provider>;
};

export default ShoppingCartContextProvider;
