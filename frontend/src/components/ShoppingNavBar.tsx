import {
  createStyles,
  Navbar,
  TextInput,
  Code,
  UnstyledButton,
  Badge,
  Text,
  Group,
  ActionIcon,
  Tooltip,
  Title,
  Avatar,
  Box,
} from "@mantine/core";
import {
  IconBulb,
  IconUser,
  IconCheckbox,
  IconSearch,
  IconPlus,
  IconSelector,
  IconShoppingCart,
  IconTags,
  IconLeaf,
  IconMedal,
} from "@tabler/icons";
import { Link } from "react-router-dom";
import { useCart } from "react-use-cart";
// import { UserButton } from '../UserButton/UserButton';
import { name } from "../util/constants";

const useStyles = createStyles((theme) => ({
  navbar: {
    paddingTop: 0,
  },
  title: {
    textAlign: "center",
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

  section: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    marginBottom: theme.spacing.md,

    "&:not(:last-of-type)": {
      borderBottom: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[3]
      }`,
    },
  },

  searchCode: {
    fontWeight: 700,
    fontSize: 10,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[2]
    }`,
  },

  mainLinks: {
    paddingLeft: theme.spacing.md - theme.spacing.xs,
    paddingRight: theme.spacing.md - theme.spacing.xs,
    paddingBottom: theme.spacing.md,
  },

  mainLink: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    fontSize: theme.fontSizes.md,
    padding: `8px ${theme.spacing.xs}px`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },

  mainLinkInner: {
    display: "flex",
    fontSize: theme.fontSizes.md,
    alignItems: "center",
    flex: 1,
  },

  mainDescInner: {
    display: "flex",
    fontSize: theme.fontSizes.sm,
    alignItems: "center",
    flex: 1,
  },

  mainLinkIcon: {
    marginRight: theme.spacing.sm,

    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[6],
  },

  mainLinkBadge: {
    padding: 0,
    width: 20,
    height: 20,
    pointerEvents: "none",
  },

  collections: {
    paddingLeft: theme.spacing.md - 6,
    paddingRight: theme.spacing.md - 6,
    paddingBottom: theme.spacing.md,
  },

  collectionsHeader: {
    paddingLeft: theme.spacing.md + 2,
    paddingRight: theme.spacing.md,
    marginBottom: 5,
  },

  collectionLink: {
    display: "block",
    padding: `8px ${theme.spacing.xs}px`,
    textDecoration: "none",
    borderRadius: theme.radius.sm,
    fontSize: theme.fontSizes.md,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    lineHeight: 1,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },
}));

const collections = [
  { emoji: "👍", label: "Produce" },
  { emoji: "🚚", label: "Dairy" },
  { emoji: "💸", label: "Beverage" },
];

export default function NavbarSearch() {
  const { classes } = useStyles();
  const { totalItems } = useCart();

  const links = [
    { icon: IconShoppingCart, label: "Cart", notifications: totalItems },
  ];
  const mainLinks = links.map((link) => (
    <Link to="/cart" style={{ textDecoration: "none" }}>
      <UnstyledButton key={link.label} className={classes.mainLink}>
        <div className={classes.mainLinkInner}>
          <link.icon size={20} className={classes.mainLinkIcon} stroke={1.5} />
          <span>{link.label}</span>
        </div>
        {link.notifications > 0 && (
          <Badge size="sm" variant="filled" className={classes.mainLinkBadge}>
            {link.notifications}
          </Badge>
        )}
      </UnstyledButton>
    </Link>
  ));

  const collectionLinks = collections.map((collection) => (
    <a
      href="/"
      onClick={(event) => event.preventDefault()}
      key={collection.label}
      className={classes.collectionLink}
    >
      {/* <span style={{ marginRight: 9, fontSize: 16 }}>{collection.emoji}</span>{" "} */}
      {collection.label}
    </a>
  ));

  return (
    <Navbar width={{ sm: 300 }} p="md" className={classes.navbar}>
      <Navbar.Section className={classes.section}>
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
      </Navbar.Section>

      <Navbar.Section className={classes.section}>
        <Avatar
          src={"wegmans.png"}
          size={120}
          radius={1250}
          mx="auto"
          // sx={{ ".mantine-Avatar-image": { objectFit: "none" } }}
        />
        <Text align="center" size="lg" weight={500} mt="md">
          Wegmans{" "}
          <Tooltip label="This store is committed to creating a more sustainable future!">
            <Text component="span">
              <IconLeaf
                size={20}
                className={classes.mainLinkIcon}
                stroke={1.5}
                style={{ stroke: "lime" }}
              />
            </Text>
          </Tooltip>
        </Text>
        <Text
          size="xs"
          weight={500}
          color="blue"
          sx={{
            verticalAlign: "baseline",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          px={"md"}
          mr={"sm"}
        >
          <IconMedal size={15} stroke={1.5} /> 100% satisfaction guarantee
        </Text>
      </Navbar.Section>

      <TextInput
        placeholder="Search"
        size="md"
        icon={<IconSearch size={12} stroke={1.5} />}
        rightSectionWidth={70}
        styles={{ rightSection: { pointerEvents: "none" } }}
        mb="sm"
      />

      <Navbar.Section className={classes.section}>
        <div className={classes.mainLinks}>{mainLinks}</div>
      </Navbar.Section>

      <Navbar.Section className={classes.section}>
        {/* <Group className={classes.collectionsHeader} position="apart">
          <Text
            size="lg"
            weight={500}
            color="dimmed"
            sx={{
              verticalAlign: "baseline",
            }}
            className={classes.mainLinkInner}
          >
            <IconTags size={20} className={classes.mainLinkIcon} stroke={1.5} />{" "}
            Categories
          </Text>
        </Group> */}
        <div className={classes.collections}>{collectionLinks}</div>
      </Navbar.Section>
    </Navbar>
  );
}
