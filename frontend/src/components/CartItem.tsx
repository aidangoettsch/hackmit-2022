/**
 *
 * React component that shows item image, description, and price, and handles item quantity
 */

// import { useCart } from "react-use-cart";

// interface CartItemProps {
//   id: string;
// }

// const CartItem = ({ id }: CartItemProps) => {
//   const { isEmpty, totalUniqueItems, updateItemQuantity, removeItem, getItem } =
//     useCart();

//   const item = getItem(id);

//   return (
//     <div className="cart-item">
//       <div className="image-container">
//         <img src={item.imageUrl} alt={item.name + "image"} />
//       </div>
//       <div className="item-details">
//         <span className="name">{item.name}</span>
//         <span className="price">
//           {item.quantity} x ${item.name}
//         </span>
//         <span className="remove-button" onClick={() => removeItem(id)}>
//           &#10005;
//         </span>
//       </div>
//       <div className="quantity">
//         <div
//           className="arrow"
//           onClick={() => updateItemQuantity(id, item.quantity! - 1)}
//         >
//           &#10094;
//         </div>
//         <span className="value">{item.quantity!}</span>
//         <div
//           className="arrow"
//           onClick={() => updateItemQuantity(id, item.quantity! + 1)}
//         >
//           &#10095;
//         </div>
//         <button onClick={() => removeItem(item.id)}>&times;</button>
//       </div>
//     </div>
//   );
// };

// export default CartItem;

import {
  Paper,
  Box,
  Avatar,
  Button,
  Tooltip,
  createStyles,
  Text,
} from "@mantine/core";
import { useCart } from "react-use-cart";
import { willTruncate, truncate } from "../util/util";

const useStyles = createStyles((theme) => ({
  card: {
    height: 160,
    marginBottom: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    color: theme.white,
    lineHeight: 1.2,
    fontSize: 32,
    marginTop: theme.spacing.xs,
  },

  category: {
    color: theme.white,
    opacity: 0.7,
    fontWeight: 700,
    textTransform: "uppercase",
  },
}));

export interface CardProps {
  id: string;
}
export default function Card({ id }: CardProps) {
  const { classes } = useStyles();

  const {
    isEmpty,
    items,
    totalUniqueItems,
    updateItemQuantity,
    removeItem,
    getItem,
    addItem,
  } = useCart();

  const item = getItem(id);
  const { name, price, imageUrl, description, size, priceString } = item;

  const itemQuantity = getItem(id)?.quantity || 0;

  const handleQuantityAdd = () => {
    updateItemQuantity(id, itemQuantity + 1);
  };

  const handleQuantityRemove = () => {
    if (itemQuantity == 1) {
      removeItem(id);
    } else {
      updateItemQuantity(id, itemQuantity - 1);
    }
  };

  return (
    <Paper shadow="md" p="xl" radius="md" className={classes.card}>
      <Box sx={{ display: "flex" }}>
        <Avatar radius="lg" size={120} src={imageUrl} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: "300px",
            marginTop: "15px",
            marginLeft: "15px",
          }}
        >
          <Tooltip label={willTruncate(name) ? name : ""} openDelay={300}>
            <Text size={"md"}>{name}</Text>
          </Tooltip>

          <Text color="dimmed" size={"sm"}>
            {size}
          </Text>
          <Text weight={"500"} mr={"md"}>
            {priceString}
          </Text>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "space-between",
          width: "95px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexGrow: 1,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {itemQuantity != 0 ? (
            <>
              <Button
                color={"red"}
                p="0"
                sx={{ height: "30px", width: "30px" }}
                onClick={() => {
                  handleQuantityRemove();
                }}
              >
                <Text size="xl">-</Text>
              </Button>
              <Text size="md">{itemQuantity}</Text>
            </>
          ) : (
            <>
              {" "}
              <span></span>
            </>
          )}

          <Button
            color={"yellow"}
            p="0"
            sx={{ height: "30px", width: "30px" }}
            onClick={() => {
              handleQuantityAdd();
            }}
          >
            <Text size="xl">+</Text>
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
