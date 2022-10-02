import { Carousel } from "@mantine/carousel";
import {
  useMantineTheme,
  Box,
  Title,
  SimpleGrid,
  Center,
  Loader,
} from "@mantine/core";
import Card from "../components/ItemCard";
import { useMediaQuery } from "@mantine/hooks";
import { ProductType } from "../types/product";
import { useParams } from "react-router-dom";
import React from "react";
import { getData } from "../util/getProductData";

export default function CardsCarousel() {
  let params = useParams();
  const category = params.category;
  const [products, setProducts] = React.useState<ProductType[]>([]);
  const [loading, setLoading] = React.useState(true);
  const theme = useMantineTheme();
  const slides = products.map((item, index) => <Card {...item} />);

  React.useEffect(() => {
    getData().then((data: ProductType[]) => {
      setProducts(data as ProductType[]);
      setLoading(false);
    });
  }, []);

  return (
    <>
      {loading ? (
        <Center sx={{ height: "100%" }}>
          <Loader color="yellow" size="xl" />
        </Center>
      ) : (
        <Box>
          <Title
            sx={{ fontFamily: `Greycliff CF, ${theme.fontFamily}` }}
            mb={"md"}
            size="25px"
          >
            Items under {category}
          </Title>
          <SimpleGrid cols={6}>{slides}</SimpleGrid>
        </Box>
      )}
    </>
  );
}
