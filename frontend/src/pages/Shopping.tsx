import { AppShell, Navbar, Header, Loader, Center } from "@mantine/core";
import React from "react";
import CategoryCarousel from "../components/CategoryCarousel";
import ShoppingNavBar from "../components/ShoppingNavBar";
import { ProductType } from "../types/product";
import { getData } from "../util/getProductData";
import { Outlet } from "react-router-dom";

export default () => {
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
      <Outlet />
    </AppShell>
  );
};
