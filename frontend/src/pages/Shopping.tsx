import { AppShell, Navbar, Header } from "@mantine/core";
import CategoryCarousel from "../components/CategoryCarousel";
import ShoppingNavBar from "../components/ShoppingNavBar";

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
      <CategoryCarousel />
      <br />
      <CategoryCarousel />
      <br />
      <CategoryCarousel />
    </AppShell>
  );
};
