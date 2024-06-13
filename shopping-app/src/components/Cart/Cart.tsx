import { Product } from "../../interfaces/Product";
import { ProductCart } from "../App";
import CartViewDetails from "./CartViewDetails";

export type CartProps = {
  cartProducts: ProductCart[];
  viewTotal: boolean;
  handleRemoveAllItemsCart: (value: number) => void;
  handleAddProductToCart: (product: Product, amount: number) => void;
  handleRemoveProductFromCart: (productId: number) => void;
};

const Cart = ({
  cartProducts,
  viewTotal,
  handleRemoveAllItemsCart,
  handleAddProductToCart,
  handleRemoveProductFromCart,
}: CartProps) => {
  return (
    <CartViewDetails
      viewTotal={viewTotal}
      cartProducts={cartProducts}
      handleRemoveAllItemsCart={handleRemoveAllItemsCart}
      handleAddProductToCart={handleAddProductToCart}
      handleRemoveProductFromCart={handleRemoveProductFromCart}
    />
  );
};

export default Cart;
