import { AppShell, Navbar, Header, Loader, Center } from "@mantine/core";
import React from "react";
import CategoryCarousel from "../components/CategoryCarousel";
import ShoppingNavBar from "../components/ShoppingNavBar";
import { ProductType } from "../types/product";
import { getData } from "../util/getProductData";

const data: ProductType[] = [
  {
    imageUrl: "item.jpeg",
    name: "bread",
    priceString: "$5.00",
    size: "1lb",
    id: "asdf",
    brandId: "string",
    brandName: "string",
  },
  {
    imageUrl: "item.jpeg",
    name: "bread",
    priceString: "$5.00",
    size: "1lb",
    id: "asdf",
    brandId: "string",
    brandName: "string",
  },
  {
    imageUrl: "item.jpeg",
    name: "bread",
    priceString: "$5.00",
    size: "1lb",
    id: "asdf",
    brandId: "string",
    brandName: "string",
  },
  {
    imageUrl: "item.jpeg",
    name: "bread",
    priceString: "$5.00",
    size: "1lb",
    id: "asdf",
    brandId: "string",
    brandName: "string",
  },
];

export default () => {
  const [products, setProducts] = React.useState<ProductType[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    getData().then((data: ProductType[]) => {
      setProducts(data as ProductType[]);
      setLoading(false);
    });
  }, []);

  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar width={{ base: 300 }} height={500} p="xs">
          <ShoppingNavBar />
        </Navbar>
      }
      header={<></>}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      {loading ? (
        <Center sx={{ height: "100%" }}>
          <Loader color="yellow" size="xl" />
        </Center>
      ) : (
        <>
          <CategoryCarousel data={products} />
          <br />
          {/* <CategoryCarousel data={products} />
          <br />
          <CategoryCarousel data={products} /> */}
        </>
      )}
    </AppShell>
  );
};
