import {
  AppShell,
  Navbar,
  Header,
  Loader,
  Center,
  Text,
  Badge,
  Title,
  createStyles,
  Group,
  Container,
} from "@mantine/core";
import React from "react";
import CategoryCarousel from "../components/CategoryCarousel";
import ShoppingNavBar from "../components/ShoppingNavBar";
import { ProductType } from "../types/product";
import { getData } from "../util/getProductData";
import { Link, Outlet } from "react-router-dom";
import { name } from "../util/constants";

export default () => {
  return (
    <AppShell
      padding="md"
      navbar={<></>}
      header={
        <>
          <HeaderAction />
        </>
      }
    >
      <Container>
        <Outlet />
      </Container>
    </AppShell>
  );
};

const HEADER_HEIGHT = 80;

const useStyles = createStyles((theme) => ({
  inner: {
    height: HEADER_HEIGHT,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },
  title: {
    textAlign: "center",
    paddingLeft: "25px",
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

  linkLabel: {
    marginRight: 5,
  },
}));

export function HeaderAction() {
  const { classes } = useStyles();

  return (
    <Header height={HEADER_HEIGHT} sx={{ borderBottom: 0 }} mb={120}>
      <Container className={classes.inner} fluid>
        <Group>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Title className={classes.title}>
              <Text
                component="span"
                inherit
                style={{ textDecoration: "underline lime" }}
              >
                {name}
              </Text>{" "}
              <Badge
                color="green"
                variant="outline"
                sx={{ textDecoration: "none !important" }}
              >
                BETA
              </Badge>
            </Title>
          </Link>
        </Group>

        <span></span>
      </Container>
    </Header>
  );
}
