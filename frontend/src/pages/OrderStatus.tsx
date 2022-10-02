import {useNavigate, useParams} from "react-router-dom";
import {AppShell, Center, Group, Loader, Stepper, Title, Text, Stack, Avatar} from "@mantine/core";
import {useEffect, useState} from "react";
import {ExistingOrderType} from "../types/product";
import {IconArrowLeft, IconClock, IconCurrencyDollar} from "@tabler/icons";
import {getOrderStatus} from "../util/getProductData";

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

    const interval = setInterval(async () => {
      setOrderStatus(await getOrderStatus(order))
    }, 10000)

    return () => {
      clearInterval(interval)
    }
  }, [order])

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
      <Stack align={"start"} sx={{
        width: "100%",
      }}>
        <>
        <Text size={"xl"} weight={"bold"} mt={"lg"}>Your order group</Text>
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
    </Stack>
      : <Center sx={{
      height: "100%",
      width: "100%",
    }}><Loader/></Center>}
  </AppShell>
}
