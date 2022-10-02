import { Carousel } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";
import {
  createStyles,
  Paper,
  Text,
  Title,
  Button,
  useMantineTheme,
  Avatar,
  Container,
  Box,
} from "@mantine/core";
import { useCart } from "react-use-cart";
import { ProductType } from "../types/product";
import { truncate } from "../util/util";

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

interface CardProps {
  imageUrl: string;
  priceString: string;
  name: string;
  size: string;
  id: string;
  [key: string]: any;
}

function Card({ imageUrl, priceString, name, size, id }: CardProps) {
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
          <Text size={"sm"}>{truncate(name)}</Text>
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

interface CategoryCarouselProps {
  data: ProductType[];
}
export default function CardsCarousel(props: CategoryCarouselProps) {
  const { data } = props;
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
  const slides = data.map((item, index) => (
    <Carousel.Slide key={index}>
      <Card {...item} />
    </Carousel.Slide>
  ));

  return (
    <Box>
      <Title
        sx={{ fontFamily: `Greycliff CF, ${theme.fontFamily}` }}
        mb={"md"}
        size="25px"
      >
        Carbohydrate
      </Title>
      <Carousel
        slideSize="15%"
        breakpoints={[{ maxWidth: "sm", slideSize: "100%", slideGap: 2 }]}
        slideGap="md"
        align="start"
        slidesToScroll={mobile ? 1 : 2}
      >
        {slides}
      </Carousel>
    </Box>
  );
}
