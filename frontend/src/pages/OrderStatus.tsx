import {useNavigate, useParams} from "react-router-dom";
import {AppShell, Center, Group, Loader, Stepper, Title, Text, Stack, Avatar, useMantineTheme} from "@mantine/core";
import React, {useEffect, useState} from "react";
import {ExistingOrderType} from "../types/product";
import {IconArrowLeft, IconClock, IconCurrencyDollar} from "@tabler/icons";
import {getOrderStatus} from "../util/getProductData";
import Map, {Marker} from "react-map-gl";

const OrderMap = () => {
  const theme = useMantineTheme()

  return (
    <Stack>
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
        style={{width: 250, height: 250, marginTop: "20px"}}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken="pk.eyJ1Ijoicm9iZXJ0YmFvIiwiYSI6ImNrbmJ4b2EyazB3a2kyb29vdmI4NnFhdHkifQ.eWUrs0-n2fF0u1XZhNbE4w"
      >
        {" "}
        <Marker latitude={42.35} longitude={-71.09} key={"loc1"}>
          <img src="/pin.png" height={"20px"} width={"15px"}/>
        </Marker>
      </Map>
    </Stack>
  );
}
export default () => {
  const {order, uid} = useParams()
  const navigate = useNavigate();
  const [orderStatus, setOrderStatus] = useState<ExistingOrderType | null>(null)

  const uIdx: number | undefined = uid ? parseInt(uid) : undefined

  const host = orderStatus && orderStatus.users.find(u => u.host)
  const isHost = orderStatus && orderStatus.users[uIdx!!].host

  useEffect(() => {
    if (!order) return;
    getOrderStatus(order).then(status => {
      setOrderStatus(status)
    })
  }, [order])

  useEffect(() => {
    const interval = setInterval(() => {
      setOrderStatus({
        ...orderStatus!!,
        status: orderStatus!!.status + 1
      })
    }, 10000)

    return () => {
      clearInterval(interval)
    }
  }, [orderStatus])

  return <AppShell>
    <Title
      sx={theme => ({
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        display: "flex",
        alignItems: "center",
      })}
      mb={"md"}
      size="25px"
    >
      {" "}
      <IconArrowLeft
        onClick={() => {
          navigate("/");
        }}
        style={{ cursor: "pointer", marginRight: "10px", fontSize: "50px" }}
        size={50}
      />{" "}
      Order Status
    </Title>
    {orderStatus && host ?
    <Stack align={"center"} sx={{
      width: "605px",
      margin: "auto",
    }}>
      <Group position="center" mt="xl" spacing={64} align={"start"}>
        <Stepper active={orderStatus.status} breakpoint="sm">
          <Stepper.Step label="Matched">
          </Stepper.Step>
          <Stepper.Step label="Ordered">
            <Text size={"xl"}>We're waiting for more people to join your order!</Text>
            <Text size={"lg"}>Currently, we expect the following time and cost. Remember, your cost
              goes down the more people join the order!</Text>
            <Group>
              <IconClock style={{
                marginRight: "-8px",
              }} />
              <Text size={"lg"}>{orderStatus.time}</Text>
            </Group>
            <Group>
              <IconCurrencyDollar style={{
                marginRight: "-8px",
              }} />
              <Text size={"lg"}>${orderStatus.price}</Text>
            </Group>
          </Stepper.Step>
          <Stepper.Step label="On the way">
            <Text size={"xl"}>We've placed your order!</Text>
            <Text size={"lg"}>Your order is being prepared and will be delivered soon</Text>
          </Stepper.Step>
          <Stepper.Step label="Delivered">
            <Text size={"xl"}>Your order is on the way!</Text>
            <Text size={"lg"}>Your order is being prepared and will be delivered soon</Text>
            {isHost ? <Text size={"lg"}>Get ready for your group to come pick up their order!</Text>
              : <Text size={"lg"}>Meet {host.name} at {host.location} for pick up!</Text>}
          </Stepper.Step>
          <Stepper.Completed>
            <Text size={"xl"}>Your order has been delivered!</Text>
            {isHost ? <Text size={"lg"}>Get ready for your group to come pick up their order!</Text>
              : <Text size={"lg"}>Meet {host.name} at {host.location} for pick up!</Text>}
          </Stepper.Completed>
        </Stepper>
      </Group>
      <Group align={"start"} position={"apart"} sx={{
        width: "100%",
      }}>
        <Stack align={"start"}>
          <>
            <Title
              sx={theme => ({
                fontFamily: `Greycliff CF, ${theme.fontFamily}`,
                fontWeight: 900,
                color: theme.white,
                lineHeight: 1.2,
                fontSize: 22,
                marginTop: theme.spacing.xs,
              })}
            >
              Your order group
            </Title>
          {orderStatus.users.map((u, idx) =>
            <Group key={u.name}>
              <Avatar radius="xl"/>
              <Stack spacing={2}>
                <Text size={"lg"}>{u.name}{u.host ? " (host)" : ""}{idx === uIdx ? " (you)" : ""}</Text>
                {(u.host || idx === uIdx) && <Text size={"xs"}>{u.location}</Text>}
              </Stack>
            </Group>
          )}
          </>
        </Stack>
        <OrderMap/>
      </Group>
    </Stack>
      : <Center sx={{
      height: "100%",
      width: "100%",
    }}><Loader/></Center>}
  </AppShell>
}
