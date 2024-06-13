import CartViewDetails from "./CartViewDetails";

export type CartProps = {
  viewTotal: boolean;
};

const Cart = ({ viewTotal }: CartProps) => {
  return <CartViewDetails viewTotal={viewTotal} />;
};

export default Cart;
