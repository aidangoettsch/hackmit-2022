import {
  AppShell,
  createStyles,
  Paper,
  Text,
  TextInput,
  Button,
  Stepper,
  Group,
  Stack,
  Divider,
  Title,
  useMantineTheme,
  Autocomplete,
  Box,
} from "@mantine/core";
import { FC, useState, FocusEvent } from "react";
import axios from "axios";
import {
  IconCreditCard,
  IconMapPin,
  IconClock,
  IconCurrencyDollar,
  IconPlus,
  IconArrowLeft,
  IconUser,
  IconMail,
} from "@tabler/icons";
import { DatePicker, TimeRangeInput } from "@mantine/dates";
import { useNavigate } from "react-router-dom";
import Map, { Marker } from "react-map-gl";
import "../remove.css";
import React from "react";
import { useCart } from "react-use-cart";
import { pushNewOrder } from "../util/getProductData";
import { OrderItem } from "../types/product";

interface Order {
  orderDay?: Date | null;
  windowStart?: Date | null;
  windowEnd?: Date | null;
  fee: number;
}

const useLocationStyles = createStyles((theme) => ({
  map: {
    position: "relative",
  },
}));

const LocationStep: FC<{
  active: boolean;
  location: [number, number];
  locationString: string;
  setLocationString: (location: string) => void;
  nextStep: () => void;
  setName: (name: string) => void;
  name: string;
  setEmail: (email: string) => void;
  email: string;
  autocompletes: string[];
}> = ({
  active,
  location,
  locationString,
  setLocationString,
  nextStep,
  email,
  setEmail,
  name,
  setName,
  autocompletes,
}) => {
  const { classes } = useLocationStyles();

  const [viewState, setViewState] = React.useState({
    longitude: location[1],
    latitude: location[0],
    zoom: 15,
  });

  React.useEffect(() => {
    console.log(location);

    setViewState({
      longitude: location[1],
      latitude: location[0],
      zoom: 15,
    });
  }, [location]);

  if (!active) {
    return (
      <Group position={"left"}>
        <IconMail
          style={{
            marginRight: "-8px",
          }}
        />
        <Text
          sx={{
            margin: 0,
          }}
        >
          {email}
        </Text>
        <IconUser
          style={{
            marginRight: "-8px",
          }}
        />
        <Text
          sx={{
            margin: 0,
          }}
        >
          {name}
        </Text>
        <IconMapPin
          style={{
            marginRight: "-8px",
          }}
        />
        <Text
          sx={{
            margin: 0,
          }}
        >
          {locationString.length > 23
            ? locationString.slice(20) + "..."
            : locationString}
        </Text>
      </Group>
    );
  }

  return (
    <Stack sx={{}}>
      <TextInput
        label="E-Mail"
        placeholder="me@example.com"
        required
        withAsterisk
        p={2}
        onChange={(e: FocusEvent<HTMLInputElement>) => setEmail(e.target.value)}
        autoComplete="off"
        value={email}
      />
      <TextInput
        label="Name"
        placeholder="John Doe"
        required
        withAsterisk
        p={2}
        onChange={(e: FocusEvent<HTMLInputElement>) => setName(e.target.value)}
        autoComplete="off"
        value={name}
      />
      <Autocomplete
        label="Address"
        placeholder="1234 Main St"
        required
        withAsterisk
        p={2}
        onChange={setLocationString}
        autoComplete="off"
        value={locationString}
        data={autocompletes}
      />

      <Map
        {...viewState}
        style={{ width: 400, height: 400 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken="pk.eyJ1Ijoicm9iZXJ0YmFvIiwiYSI6ImNrbmJ4b2EyazB3a2kyb29vdmI4NnFhdHkifQ.eWUrs0-n2fF0u1XZhNbE4w"
      >
        {" "}
        <Marker
          longitude={viewState.longitude}
          latitude={viewState.latitude}
          key={"loc"}
        >
          <img src="/pin.png" height={"20px"} width={"15px"} />
        </Marker>
      </Map>
      {/* <Map
        initialViewState={{
          longitude: -100,
          latitude: 40,
          zoom: 3.5,
        }}
        mapboxAccessToken="pk.eyJ1Ijoicm9iZXJ0YmFvIiwiYSI6ImNrbmJ4b2EyazB3a2kyb29vdmI4NnFhdHkifQ.eWUrs0-n2fF0u1XZhNbE4w"
        mapStyle="mapbox://styles/mapbox/streets-v9"
        style={{ width: 400, height: 400 }}
      >
        <Marker longitude={-100} latitude={40} offset={[0, 0]}>
          <img
            style={{ display: "block" }}
            src="/pin.png"
            height={"20px"}
            width={"15px"}
          />
        </Marker>
      </Map> */}
      <Group position="right">
        <Button onClick={nextStep} disabled={locationString.length === 0}>
          Next
        </Button>
      </Group>
    </Stack>
  );
};

const useOrderStyles = createStyles((theme) => ({
  orderCard: {
    margin: "auto",
    padding: "0.5rem",
    width: "100%",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "solid",
    borderRadius: theme.radius.md,
    justifyContent: "start",
    display: "flex",
    flexDirection: "column",
    cursor: "pointer",
  },
  orderActive: {
    borderColor: theme.primaryColor,
  },
}));

const OrderStep: FC<{
  active: boolean;
  orderIdx: number;
  setOrderIdx: (idx: number) => void;
  order: Order;
  setOrder: (order: Order) => void;
  nextStep: () => void;
}> = ({ active, orderIdx, setOrderIdx, order, setOrder, nextStep }) => {
  const { classes } = useOrderStyles();
  if (!active) {
    const dayString =
      order.orderDay?.toLocaleDateString("en-US", {
        dateStyle: "full",
      }) || "";
    const startTime = order.windowStart?.toLocaleTimeString() || "";
    const endTime = order.windowEnd?.toLocaleTimeString() || "";

    return (
      <Group position={"left"} align={"start"}>
        <IconClock
          style={{
            marginRight: "-8px",
          }}
        />
        <Stack justify={"start"} spacing={0}>
          <Text size={"md"}>{dayString}</Text>
          <Text size={"md"}>
            {startTime} to {endTime}
          </Text>
        </Stack>
      </Group>
    );
  }

  return (
    <Stack>
      <Paper
        className={
          classes.orderCard + ` ${orderIdx === 0 ? classes.orderActive : ""}`
        }
        onClick={() => {
          setOrderIdx(0);
          setOrder({
            ...order,
            fee: 0.99,
          });
        }}
      >
        <Text size={"sm"} italic={true}>
          Cheapest, closest, lowest emissions
        </Text>
        <Group align={"start"}>
          <IconClock
            style={{
              marginRight: "-8px",
            }}
          />
          <Stack justify={"start"} spacing={0}>
            <Text size={"md"}>Sunday, October 2, 2022</Text>
            <Text size={"md"}>12 PM to 2 PM</Text>
          </Stack>
        </Group>
        <Group>
          <IconMapPin
            style={{
              marginRight: "-8px",
            }}
          />
          <Text size={"md"}>1 minute walk</Text>
        </Group>
        <Group>
          <IconCurrencyDollar
            style={{
              marginRight: "-8px",
            }}
          />
          <Text size={"md"}>$0.99 or less</Text>
        </Group>
      </Paper>
      <Paper
        className={
          classes.orderCard + ` ${orderIdx === 1 ? classes.orderActive : ""}`
        }
        onClick={() => {
          setOrderIdx(1);
          setOrder({
            ...order,
            fee: 2.99,
          });
        }}
      >
        <Text size={"sm"} italic={true}>
          Fastest delivery
        </Text>
        <Group align={"start"}>
          <IconClock
            style={{
              marginRight: "-8px",
            }}
          />
          <Stack justify={"start"} spacing={0}>
            <Text size={"md"}>Sunday, October 2, 2022</Text>
            <Text size={"md"}>5 AM to 12 PM</Text>
          </Stack>
        </Group>
        <Group>
          <IconMapPin
            style={{
              marginRight: "-8px",
            }}
          />
          <Text size={"md"}>5 minute walk</Text>
        </Group>
        <Group>
          <IconCurrencyDollar
            style={{
              marginRight: "-8px",
            }}
          />
          <Text size={"md"}>$2.99 or less</Text>
        </Group>
      </Paper>
      <Paper
        className={
          classes.orderCard + ` ${orderIdx === -1 ? classes.orderActive : ""}`
        }
        onClick={() => {
          setOrderIdx(-1);
          setOrder({
            ...order,
            fee: 3.99,
          });
        }}
      >
        <Text size={"sm"} italic={true}>
          None of these times work?
        </Text>
        <Group>
          <IconPlus
            style={{
              marginRight: "-8px",
            }}
          />
          <Text size={"md"}>
            Add availability to get matched automatically!
          </Text>
        </Group>
        <Group>
          <IconCurrencyDollar
            style={{
              marginRight: "-8px",
            }}
          />
          <Text size={"md"}>$3.99 or less</Text>
        </Group>
      </Paper>

      {orderIdx === -1 && (
        <Stack>
          <DatePicker
            placeholder="Pick date"
            label="Order time"
            value={order.orderDay}
            onChange={(d) => {
              setOrder({
                ...order,
                orderDay: d,
              });
            }}
          />
          <TimeRangeInput
            format="12"
            value={[order.windowStart || null, order.windowEnd || null]}
            onChange={([start, end]) => {
              setOrder({
                ...order,
                windowStart: start,
                windowEnd: end,
              });
            }}
            clearable
          />
        </Stack>
      )}

      <Group position="right">
        <Button
          onClick={() => {
            if (orderIdx === 0) {
              const start = new Date("2022-10-02T12:00-04:00");
              const end = new Date("2022-10-02T16:00-04:00");
              setOrder({
                ...order,
                orderDay: start,
                windowStart: start,
                windowEnd: end,
              });
            } else if (orderIdx === 1) {
              const start = new Date("2022-10-02T05:00-04:00");
              const end = new Date("2022-10-02T12:00-04:00");
              setOrder({
                ...order,
                orderDay: start,
                windowStart: start,
                windowEnd: end,
              });
            }
            nextStep();
          }}
          disabled={orderIdx === -1 && (!order.windowStart || !order.windowEnd)}
        >
          Checkout
        </Button>
      </Group>
    </Stack>
  );
};

export default () => {
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const [active, setActive] = useState(1);
  const [location, setLocation] = useState<[number, number]>([0, 0]);
  const [locationString, setLocationString] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [autocompletes, setAutocompletes] = useState<string[]>([""]);
  const [orderIdx, setOrderIdx] = useState(-1);
  const [order, setOrder] = useState<Order>({
    orderDay: new Date(),
    fee: 2.99,
  });

  const updateLocation = async (newLocation: string) => {
    setLocationString(newLocation);
    if (newLocation === "") {
      setLocation([0, 0]);
      return;
    }
    try {
      if (newLocation.length < 10) {
        return;
      }
      var geo = {
        method: "get",
        url: `https://api.geoapify.com/v1/geocode/search?text=${newLocation}&apiKey=968ddaceb6d741669f5c59de6b1cd9fb`,
        headers: {},
      };
      var config = {
        method: "get",
        url: `https://api.geoapify.com/v1/geocode/autocomplete?text=${newLocation}&apiKey=968ddaceb6d741669f5c59de6b1cd9fb`,
        headers: {},
      };

      const resp = await axios(config);
      const geoResp = await axios(geo);

      // const resp = await axios.get(
      //   `https://nominatim.openstreetmap.org/search?q=${newLocation}&format=json`
      // );
      console.log(geoResp, "location response");
      let auto = resp.data.features.map((element: any) => {
        return (
          element.properties.address_line1 +
          " " +
          element.properties.address_line2
        );
      });
      console.log(auto);
      setAutocompletes(auto);
      // const { lat, lon } = resp.data[0];
      setLocation([
        geoResp.data.features[0].properties.lat,
        geoResp.data.features[0].properties.lon,
      ]);
    } catch (e) {}
  };
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));

  const orderSubtotal = 26.75;
  const orderTax = orderSubtotal * 0.06;
  const total = orderSubtotal + orderTax + order.fee;

  const { isEmpty, items, totalUniqueItems, updateItemQuantity, removeItem } =
    useCart();

  const genOrderFromCart = (): OrderItem[] => {
    return items.map((i) => {
      return {
        id: i.id,
        quantity: i.quantity!,
      };
    });
  };

  React.useEffect(() => {
    if (active == 3) {
      console.log("done");
      pushNewOrder(
        order.windowEnd!.toLocaleTimeString(),
        name,
        locationString,
        genOrderFromCart()
      );
    }
  }, [active]);

  const renderMap = () => {
    if (orderIdx === 0) {
      return (
        <>
          {" "}
          <Title
            sx={{
              fontFamily: `Greycliff CF, ${theme.fontFamily}`,
              fontWeight: 900,
              color: theme.white,
              lineHeight: 1.2,
              fontSize: 22,
              marginTop: theme.spacing.xs,
            }}
          >
            Where Your Order Is Located
          </Title>
          <Map
            zoom={14.5}
            latitude={42.35}
            longitude={-71.09}
            style={{ width: 250, height: 250, marginTop: "20px" }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            mapboxAccessToken="pk.eyJ1Ijoicm9iZXJ0YmFvIiwiYSI6ImNrbmJ4b2EyazB3a2kyb29vdmI4NnFhdHkifQ.eWUrs0-n2fF0u1XZhNbE4w"
          >
            {" "}
            <Marker latitude={42.35} longitude={-71.09} key={"loc1"}>
              <img src="/pin.png" height={"20px"} width={"15px"} />
            </Marker>
          </Map>
        </>
      );
    }

    if (orderIdx === 1) {
      return (
        <>
          {" "}
          <Title
            sx={{
              fontFamily: `Greycliff CF, ${theme.fontFamily}`,
              fontWeight: 900,
              color: theme.white,
              lineHeight: 1.2,
              fontSize: 22,
              marginTop: theme.spacing.xs,
            }}
          >
            Where Your Order Is Located
          </Title>
          <Map
            zoom={14.5}
            latitude={42.36}
            longitude={-71.09}
            style={{ width: 250, height: 250, marginTop: "20px" }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            mapboxAccessToken="pk.eyJ1Ijoicm9iZXJ0YmFvIiwiYSI6ImNrbmJ4b2EyazB3a2kyb29vdmI4NnFhdHkifQ.eWUrs0-n2fF0u1XZhNbE4w"
          >
            {" "}
            <Marker latitude={42.36} longitude={-71.09} key={"loc1"}>
              <img src="/pin.png" height={"20px"} width={"15px"} />
            </Marker>
          </Map>
        </>
      );
    }

    if (orderIdx === 2) {
      return (
        <>
          {" "}
          <Title
            sx={{
              fontFamily: `Greycliff CF, ${theme.fontFamily}`,
              fontWeight: 900,
              color: theme.white,
              lineHeight: 1.2,
              fontSize: 22,
              marginTop: theme.spacing.xs,
            }}
          >
            Where Your Order Is Located
          </Title>
          <Map
            zoom={14.5}
            latitude={42.36}
            longitude={-71.09}
            style={{ width: 250, height: 250, marginTop: "20px" }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            mapboxAccessToken="pk.eyJ1Ijoicm9iZXJ0YmFvIiwiYSI6ImNrbmJ4b2EyazB3a2kyb29vdmI4NnFhdHkifQ.eWUrs0-n2fF0u1XZhNbE4w"
          >
            {" "}
            <Marker latitude={42.36} longitude={-71.09} key={"loc1"}>
              <img src="/pin.png" height={"20px"} width={"15px"} />
            </Marker>
          </Map>
        </>
      );
    }

    return <></>;
  };
  const convertPrice = (price: string) => {
    return parseFloat(price.replace("$", ""));
  };

  const calcPrice = () => {
    let pr = items.reduce((acc, item) => {
      return acc + convertPrice(item.priceString) * item.quantity!;
    }, 0.0);
    console.log(pr);
    return pr;
  };

  return (
    <AppShell>
      <Title
        sx={{
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          display: "flex",
          alignItems: "center",
        }}
        mb={"md"}
        size="25px"
      >
        {" "}
        <IconArrowLeft
          onClick={() => {
            navigate("/cart");
          }}
          style={{ cursor: "pointer", marginRight: "10px", fontSize: "50px" }}
          size={50}
        />{" "}
        Checkout
      </Title>
      <Group position="center" mt="xl" spacing={64} align={"start"}>
        <Stack>
          <Stepper
            active={active}
            orientation={"vertical"}
            onStepClick={setActive}
            breakpoint="md"
            styles={(theme) => ({
              root: {
                width: "500px",
              },
              step: {
                width: "500px",
              },
              stepBody: {
                width: "100%",
              },
              stepDescription: {
                width: "100%",
              },
            })}
          >
            <Stepper.Step
              label="Payment"
              description={
                active !== 0 ? (
                  <Group position={"left"}>
                    <IconCreditCard
                      style={{
                        marginRight: "-8px",
                      }}
                    />
                    <Text
                      sx={{
                        margin: 0,
                      }}
                    >
                      •••• 9999
                    </Text>
                  </Group>
                ) : null
              }
              allowStepSelect={false}
            />
            <Stepper.Step
              label="Information"
              description={
                <LocationStep
                  active={active === 1}
                  location={location}
                  locationString={locationString}
                  email={email}
                  setEmail={setEmail}
                  name={name}
                  setName={setName}
                  setLocationString={updateLocation}
                  nextStep={nextStep}
                  autocompletes={autocompletes}
                />
              }
              allowStepSelect={active === 2}
            />
            <Stepper.Step
              label="Order"
              description={
                active < 2 ? (
                  "Find shared orders near you, or start a new group"
                ) : (
                  <OrderStep
                    active={active === 2}
                    orderIdx={orderIdx}
                    setOrderIdx={setOrderIdx}
                    order={order}
                    setOrder={setOrder}
                    nextStep={nextStep}
                  />
                )
              }
              allowStepSelect={false}
            />
            <Stepper.Completed>
              <Text size={"lg"}>
                Order complete! We'll let you know when it's time to meet up
                with your group!
              </Text>
            </Stepper.Completed>
          </Stepper>
        </Stack>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Paper
            sx={(theme) => ({
              padding: "0.5rem",
              width: "300px",
              borderWidth: "1px",
              borderStyle: "solid",
              borderColor: "solid",
              borderRadius: theme.radius.md,
              mb: "lg",
            })}
          >
            <Stack spacing={2}>
              <Group position={"apart"}>
                <Text weight={"bold"}>Subtotal</Text>
                <Text weight={"bold"}>${calcPrice().toFixed(2)}</Text>
              </Group>
              <Group position={"apart"}>
                <Text>Taxes</Text>
                <Text>${orderTax.toFixed(2)}</Text>
              </Group>
              <Group position={"apart"}>
                <Text weight={"bold"}>Delivery Fee</Text>
                <Text weight={"bold"}>${order.fee.toFixed(2)}</Text>
              </Group>
              <Divider my="sm" color={"light"} />
              <Group position={"apart"}>
                <Text weight={"bold"}>Total</Text>
                <Text weight={"bold"}>
                  ${(calcPrice() + order.fee + orderTax).toFixed(2)}
                </Text>
              </Group>
            </Stack>
          </Paper>
          {renderMap()}
        </Box>
      </Group>
    </AppShell>
  );
};
