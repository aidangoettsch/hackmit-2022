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
import {
  getCategoryItemsByCategoryName,
  getData,
  getItemsBySearchTerm,
} from "../util/getProductData";

export default function CardsCarousel() {
  let params = useParams();
  const item = params.item;
  const [products, setProducts] = React.useState<ProductType[]>([]);
  const [loading, setLoading] = React.useState(true);
  const theme = useMantineTheme();
  const slides = products.map((item, index) => (
    <Box key={item.id}>
      <Card {...item} />
    </Box>
  ));

  React.useEffect(() => {
    getItemsBySearchTerm(item!, 50).then((data: ProductType[]) => {
      console.log("grabbed data");
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
            Search results for "{item}"
          </Title>
          <SimpleGrid cols={6}>{slides}</SimpleGrid>
        </Box>
      )}
    </>
  );
}
