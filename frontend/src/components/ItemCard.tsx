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
    height: 340,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
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
  imageUrl: string;
  priceString: string;
  name: string;
  size: string;
  id: string;
  [key: string]: any;
}
export default function Card({
  imageUrl,
  priceString,
  name,
  size,
  id,
}: CardProps) {
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

  const itemQuantity = getItem(id)?.quantity || 0;

  const handleQuantityAdd = () => {
    if (itemQuantity == 0) {
      addItem({
        id,
        priceString,
        name,
        size,
        imageUrl,
        price: -1,
        quantity: 1,
      });
    } else {
      updateItemQuantity(id, itemQuantity + 1);
    }
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
      <Box>
        <Avatar radius="lg" size={160} src={imageUrl} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginTop: "15px",
          }}
        >
          <Tooltip label={willTruncate(name) ? name : ""} openDelay={300}>
            <Text size={"sm"}>{truncate(name)}</Text>
          </Tooltip>

          <Text color="dimmed" size={"xs"}>
            {size}
          </Text>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Text weight={"500"} mr={"md"}>
          {priceString}
        </Text>

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
