import { Center, Text, Title, createStyles, Button, Box } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useCart } from "react-use-cart";
import CartItem from "../components/CartItem";

import { IconArrowLeft } from "@tabler/icons";

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    paddingTop: 120,
    paddingBottom: 80,
    height: "100vh",

    "@media (max-width: 755px)": {
      paddingTop: 80,
      paddingBottom: 60,
    },
  },

  inner: {
    zIndex: 99,
  },

  dots: {
    position: "absolute",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[5]
        : theme.colors.gray[1],

    "@media (max-width: 755px)": {
      display: "none",
    },
  },

  dotsLeft: {
    left: 0,
    top: 0,
  },

  title: {
    textAlign: "center",
    fontWeight: 800,
    fontSize: 40,
    letterSpacing: -1,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    marginBottom: theme.spacing.xs,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    "@media (max-width: 520px)": {
      fontSize: 28,
      textAlign: "left",
    },
  },

  highlight: {
    color:
      theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 4 : 6],
  },

  green: {
    color: theme.colors.green[theme.colorScheme === "dark" ? 4 : 6],
  },

  description: {
    textAlign: "center",

    "@media (max-width: 520px)": {
      textAlign: "left",
      fontSize: theme.fontSizes.md,
    },
  },

  controls: {
    marginTop: theme.spacing.lg,
    display: "flex",
    justifyContent: "center",

    "@media (max-width: 520px)": {
      flexDirection: "column",
    },
  },

  control: {
    "&:not(:first-of-type)": {
      marginLeft: theme.spacing.md,
    },

    "@media (max-width: 520px)": {
      height: 42,
      fontSize: theme.fontSizes.md,

      "&:not(:first-of-type)": {
        marginTop: theme.spacing.md,
        marginLeft: 0,
      },
    },
  },
}));

export default function Cart() {
  const { classes } = useStyles();

  const navigate = useNavigate();
  const { isEmpty, items, totalUniqueItems, updateItemQuantity, removeItem } =
    useCart();

  if (isEmpty)
    return (
      <Center
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "75vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Title className={classes.title} size={"lg"} mb={"xl"}>
          Your cart is empty
        </Title>
        <Box>
          <Button
            className={classes.control}
            size="lg"
            sx={{
              WebkitBoxShadow: "0px 0px 116px 15px rgba(56,255,46,0.9)",
              MozBoxShadow: "0px 0px 116px 15px rgba(56,255,46,0.9)",
              boxShadow: "0px 0px 186px 1px rgba(224,255,46,0.55)",
              flex: 1,
            }}
            onClick={() => {
              navigate("/shopping");
            }}
          >
            Go to shopping
          </Button>
        </Box>
      </Center>
    );

  return (
    <>
      <h1>
        <IconArrowLeft
          onClick={() => {
            navigate("/shopping");
          }}
          style={{ cursor: "pointer", marginRight: "10px" }}
        />{" "}
        Cart ({totalUniqueItems})
      </h1>

      <ul>
        {items.map((item) => {
          if (!item) return null;

          return <CartItem id={item.id} />;
        })}
      </ul>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "space-between",
        }}
      >
        <span></span>
        <Button
          color={"green"}
          variant="light"
          sx={{
            WebkitBoxShadow: "0px 0px 116px 15px rgba(8, 189, 38,0.9)",
            MozBoxShadow: "0px 0px 116px 15px rgba(8, 189, 38,0.9)",
            boxShadow: "0px 0px 186px 1px rgba(8, 189, 38,0.35)",
          }}
          m={5}
          mt={30}
          mr={-45}
          size={"md"}
          onClick={() => navigate("checkout")}
        >
          Checkout
        </Button>
      </Box>
    </>
  );
}
