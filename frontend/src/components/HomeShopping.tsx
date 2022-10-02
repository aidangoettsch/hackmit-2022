import { AppShell, Navbar, Header, Loader, Center } from "@mantine/core";
import React from "react";
import CategoryCarousel from "../components/CategoryCarousel";
import ShoppingNavBar from "../components/ShoppingNavBar";
import { ProductType } from "../types/product";
import {getCategoryItemsByCategoryName, getCategoryNames, getData} from "../util/getProductData";
import { Outlet } from "react-router-dom";

export default () => {
  const [products, setProducts] = React.useState<{
    category: string,
    products: ProductType[]
  }[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      const res = []
      for (const category of getCategoryNames().slice(0, 5)) {
        res.push({
          category,
          products: await getCategoryItemsByCategoryName(category, 20)
        })
      }
      return res
    })().then((data: {
      category: string,
      products: ProductType[]
    }[]) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  return (
    <>
      {loading ? (
        <Center sx={{ height: "100%" }}>
          <Loader color="yellow" size="xl" />
        </Center>
      ) : products.map(({category, products}) =>
        <React.Fragment key={category}>
          <CategoryCarousel category={category} data={products} />
          <br />
        </React.Fragment>
      )}
    </>
  );
};
