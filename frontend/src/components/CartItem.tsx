/**
 *
 * React component that shows item image, description, and price, and handles item quantity
 */

import { useCart } from "react-use-cart";

interface CartItemProps {
  id: string;
}

const CartItem = ({ id }: CartItemProps) => {
  const { isEmpty, totalUniqueItems, updateItemQuantity, removeItem, getItem } =
    useCart();

  const item = getItem(id);

  return (
    <div className="cart-item">
      <div className="image-container">
        <img src={item.image} alt={item.name + "image"} />
      </div>
      <div className="item-details">
        <span className="name">{item.name}</span>
        <span className="price">
          {item.quantity} x ${item.name}
        </span>
        <span className="remove-button" onClick={() => removeItem(id)}>
          &#10005;
        </span>
      </div>
      <div className="quantity">
        <div
          className="arrow"
          onClick={() => updateItemQuantity(id, item.quantity! - 1)}
        >
          &#10094;
        </div>
        <span className="value">{item.quantity!}</span>
        <div
          className="arrow"
          onClick={() => updateItemQuantity(id, item.quantity! + 1)}
        >
          &#10095;
        </div>
        <button onClick={() => removeItem(item.id)}>&times;</button>
      </div>
    </div>
  );
};

export default CartItem;

// import { CartProvider, useCart } from "react-use-cart";

// function Page() {
//   const { addItem } = useCart();

//   const products = [
//     {
//       id: 1,
//       name: "Malm",
//       price: 9900,
//       quantity: 1
//     },
//     {
//       id: 2,
//       name: "Nordli",
//       price: 16500,
//       quantity: 5
//     },
//     {
//       id: 3,
//       name: "Kullen",
//       price: 4500,
//       quantity: 1
//     },
//   ];

//   return (
//     <div>
//       {products.map((p) => (
//         <div key={p.id}>
//           <button onClick={() => addItem(p)}>Add to cart</button>
//         </div>
//       ))}
//     </div>
//   );
// }
