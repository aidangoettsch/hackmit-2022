import {
  createStyles,
  Title,
  Text,
  Button,
  Container,
  Image,
  Badge,
} from "@mantine/core";
import Particles from "react-particles";
import type { Engine } from "tsparticles-engine";
import { loadStarsPreset } from "tsparticles-preset-stars";
import React from "react";
import { Link } from "react-router-dom";
import { Dots } from "../components/Dots";
import Tilt from "react-parallax-tilt";

import { name } from "../util/constants";

import "../floating.scss";

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    paddingTop: 120,
    paddingBottom: 80,
    height: "100vh",

    "@media (max-width: 755px)": {
      paddingTop: 80,
      paddingBottom: 60,
    },
  },

  inner: {
    zIndex: 99,
  },

  dots: {
    position: "absolute",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[5]
        : theme.colors.gray[1],

    "@media (max-width: 755px)": {
      display: "none",
    },
  },

  dotsLeft: {
    left: 0,
    top: 0,
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

  highlight: {
    color:
      theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 4 : 6],
  },

  green: {
    color: theme.colors.green[theme.colorScheme === "dark" ? 4 : 6],
  },

  description: {
    textAlign: "center",

    "@media (max-width: 520px)": {
      textAlign: "left",
      fontSize: theme.fontSizes.md,
    },
  },

  controls: {
    marginTop: theme.spacing.lg,
    display: "flex",
    justifyContent: "center",

    "@media (max-width: 520px)": {
      flexDirection: "column",
    },
  },

  control: {
    "&:not(:first-of-type)": {
      marginLeft: theme.spacing.md,
    },

    "@media (max-width: 520px)": {
      height: 42,
      fontSize: theme.fontSizes.md,

      "&:not(:first-of-type)": {
        marginTop: theme.spacing.md,
        marginLeft: 0,
      },
    },
  },
}));

export default function HeroText() {
  const { classes } = useStyles();

  return (
    <>
      <ParticlesContainer />
      {/* <Tilt> */}
      <Container className={classes.wrapper} size={1400}>
        <Image
          src="/splash.png"
          alt="splash"
          sx={{
            position: "absolute",
            zIndex: 1,
            right: "-13%",
            top: "20%",
          }}
          fit={"contain"}
          height={"520px"}
          className={"floating"}
        />
        <Container
          size="xs"
          px="xs"
          sx={{
            zIndex: 99,
          }}
        >
          <div className={classes.inner}>
            <Title
              className={classes.title}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                marginLeft: "-215px",
                fontSize: "50px",
              }}
            >
              <Text sx={{ textDecoration: "underline lime" }} inherit>
                {name}
              </Text>{" "}
              <Badge color="green" variant="outline">
                BETA
              </Badge>
            </Title>
            <Title
              className={classes.title}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
            >
              <Text
                component="span"
                className={classes.highlight}
                inherit
                sx={{
                  textShadow: "0px 0px 14px rgba(224,255,46,0.75)",
                  flex: 1,
                  marginLeft: "-180px",
                }}
              >
                cheaper.
              </Text>
              <Text
                component="span"
                color={"rgb(0,255,0)"}
                inherit
                sx={{
                  marginLeft: "-145px",
                  textShadow: "0px 0px 18px rgb(8 189 38 / 85%)",
                  flex: 1,
                }}
              >
                healthier.
              </Text>
              <Text inherit sx={{ marginLeft: "-125px" }}>
                groceries.
              </Text>
            </Title>

            <div className={classes.controls}>
              <Link to={"/shopping"}>
                <Button
                  className={classes.control}
                  size="lg"
                  sx={{
                    WebkitBoxShadow: "0px 0px 116px 15px rgba(56,255,46,0.9)",
                    MozBoxShadow: "0px 0px 116px 15px rgba(56,255,46,0.9)",
                    boxShadow: "0px 0px 186px 1px rgba(224,255,46,0.55)",
                    flex: 1,
                  }}
                >
                  Order now
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Container>
      {/* </Tilt> */}
    </>
  );
}

export class ParticlesContainer extends React.PureComponent<any> {
  // this customizes the component tsParticles installation
  async customInit(engine: Engine): Promise<void> {
    // this adds the preset to tsParticles, you can safely use the
    await loadStarsPreset(engine);
  }

  render() {
    const options = {
      preset: "stars",
    };

    return <Particles options={options} init={this.customInit} />;
  }
}
