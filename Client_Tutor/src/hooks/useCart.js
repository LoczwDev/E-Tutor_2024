import { useSelector } from "react-redux";

const useCart = () => {
  const cartState = useSelector((state) => state.cart);

  return cartState?.items || [];
};

export default useCart;
