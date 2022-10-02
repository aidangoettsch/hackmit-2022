import { AppShell, Navbar, Header, Loader, Center } from "@mantine/core";
import React from "react";
import CategoryCarousel from "../components/CategoryCarousel";
import ShoppingNavBar from "../components/ShoppingNavBar";
import { ProductType } from "../types/product";
import { getData } from "../util/getProductData";
import { Outlet } from "react-router-dom";

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
    <>
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
    </>
  );
};
