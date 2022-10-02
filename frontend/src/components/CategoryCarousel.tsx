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
  Tooltip,
  Box,
} from "@mantine/core";
import { useCart } from "react-use-cart";
import { ProductType } from "../types/product";
import { truncate, willTruncate } from "../util/util";
import Card from "./ItemCard";

interface CategoryCarouselProps {
  category: string,
  data: ProductType[];
}
export default function CardsCarousel(props: CategoryCarouselProps) {
  const { category, data } = props;
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
        {category}
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
