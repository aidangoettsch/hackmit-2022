// @ts-nocheck

import {AppShell, createStyles, Paper, Text, NumberInput, TextInput, Button} from "@mantine/core";
import {useEffect, useState} from "react";
import {MapContainer, TileLayer, useMap} from "react-leaflet";
import axios from "axios";

const useStyles = createStyles((theme) => ({
	card: {
		margin: "auto",
		padding: "1rem",
		width: "400px",
		justifyContent: "center",
		display: "flex",
		flexDirection: "column",
	},
	cardItem: {
		margin: "1rem",
	},
	button: {
		margin: "1rem",
	},
	map: {
		position: "relative",
	},
	mapContainer: {
		zIndex: 10,
	}
}));

const ChangeMapView = ({location}) => {
	const map = useMap()

	useEffect(() => {
		map.flyTo(location)
	}, [location])

	return null
}

export default () => {
	const {classes} = useStyles();
	const [location, setLocation] = useState(null);

	const updateLocation = async e => {
		const locationAddress = e.target.value
		if (locationAddress === "") {
			setLocation([])
			return
		}
		try {
			const resp = await axios.get(`https://nominatim.openstreetmap.org/search?q=${locationAddress}&format=json`)
			const {lat, lon} = resp.data[0]
			setLocation([lat, lon])
		} catch (e) {

		}
	}

	return <AppShell>
		<Paper radius="md" m="auto" shadow="md" className={classes.card}>
			<Text size="xl" className={classes.cardItem}>Checkout</Text>
			<NumberInput label="Credit Card Information" placeholder="0000000000000000" maxLength={16} required withAsterisk
									 className={classes.cardItem}/>
			<TextInput label="Address" placeholder="1234 Main St" required withAsterisk p={2} className={classes.cardItem} onBlur={updateLocation}/>
			<Button className={classes.button}>View Location</Button>
			{
				location === null ?
					<></> :
					<div className={classes.mapContainer}>
						<MapContainer
							center={location}
							zoom={15}
							scrollWheelZoom={false}
							className={classes.map}
						>
							<ChangeMapView location={location}/>
							<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'/>
						</MapContainer>
					</div>
			}
			<Button className={classes.button}>
				Submit
			</Button>
		</Paper>
	</AppShell>;
}
