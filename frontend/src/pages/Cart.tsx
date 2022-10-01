import { useCart } from "react-use-cart";
import CartItem from "../components/CartItem";

export default function Cart() {
  const { isEmpty, items, totalUniqueItems, updateItemQuantity, removeItem } =
    useCart();

  if (isEmpty) return <p>Your cart is empty</p>;

  return (
    <>
      <h1>Cart ({totalUniqueItems})</h1>

      <ul>
        {items.map((item) => {
          if (!item) return null;

          return <CartItem id={item.id} />;
        })}
      </ul>
    </>
  );
}
