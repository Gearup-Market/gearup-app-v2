"use client";
import React, { useState, useCallback, useEffect } from "react";
import styles from "./Map.module.scss";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const containerStyle = {
	width: "100%",
	height: "100%"
};
import { Location } from "@/app/api/hooks/users/types";

const Map = ({
	location,
	showTitle = true,
	showAddress = true,
	setLocation
}: {
	location?: Location;
	showTitle?: boolean;
	showAddress?: boolean;
	setLocation?: React.Dispatch<React.SetStateAction<Location | undefined>>;
}) => {
	const [map, setMap] = useState<google.maps.Map | null>(null);
	const [loc, setLoc] = useState({
		lat: 0,
		lng: 0
	});
	const [address, setAddress] = useState("");

	useEffect(() => {
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition(
				position => {
					// const { latitude, longitude } = position.coords;
					setLoc({
						lat: location?.coords?.latitude as number,
						lng: location?.coords?.longitude as number
					});
					// Call function to get address
					getAddress(
						location?.coords?.latitude as number,
						location?.coords?.longitude as number
					);
				},
				error => {
					console.error(`Error: ${error.message}`);
				}
			);
		} else {
			console.log("Geolocation is not supported by this browser.");
		}
	}, []);

	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string
	});

	const onLoad = useCallback(function callback(map: google.maps.Map) {
		setMap(map);
	}, []);

	const onUnmount = React.useCallback(function callback(map: google.maps.Map) {
		setMap(null);
	}, []);

	// Fetch the human-readable address, city, state, and country using Google Maps Geocoding API
	const getAddress = async (lat: number, lng: number) => {
		const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;

		try {
			const response = await fetch(geocodeUrl);
			const data = await response.json();

			if (data.status === "OK" && data.results.length > 0) {
				let formattedAddress = data.results[0].formatted_address;

				// Check if the formatted address starts with a Plus Code and remove it
				const plusCodeRegex = /^[A-Z0-9\+]+\s+/; // Regex to detect Plus Code at the start
				if (plusCodeRegex.test(formattedAddress)) {
					formattedAddress = formattedAddress.replace(plusCodeRegex, ""); // Remove the Plus Code
				}

				setAddress(formattedAddress);

				// Extract the city, state, and country
				const addressComponents = data.results[0].address_components;
				let city = "";
				let state = "";
				let country = "";

				addressComponents.forEach((component: any) => {
					const types = component.types;
					if (types.includes("locality")) {
						city = component.long_name;
					}
					if (types.includes("administrative_area_level_1")) {
						state = component.long_name;
					}
					if (types.includes("country")) {
						country = component.long_name;
					}
				});

				// Update location in parent component
				if (setLocation) {
					setLocation({
						coords: {
							latitude: lat,
							longitude: lng
						},
						address: removePlusCode(formattedAddress),
						city,
						state,
						country
					});
				}
			} else {
				console.log("No address found for this location.");
			}
		} catch (error) {
			console.error("Error fetching address: ", error);
		}
	};

	// Update location when marker is dragged
	const handleMarkerDragEnd = (event: google.maps.MapMouseEvent) => {
		if (event.latLng) {
			const newLat = event.latLng.lat();
			const newLng = event.latLng.lng();
			setLoc({ lat: newLat, lng: newLng });
			getAddress(newLat, newLng);
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				{showTitle && (
					<div className={styles.text}>
						<h3>LOCATION</h3>
					</div>
				)}
				<p>Drag the location icon to set your location</p>
			</div>
			<div className={styles.image}>
				{isLoaded ? (
					<GoogleMap
						mapContainerStyle={containerStyle}
						center={loc}
						zoom={10}
						onLoad={onLoad}
						onUnmount={onUnmount}
					>
						<Marker
							position={loc}
							icon={{
								url: "/svgs/map-location-svgrepo-com.svg",
								scaledSize: new google.maps.Size(40, 40)
							}}
							draggable={true}
							onDragEnd={handleMarkerDragEnd}
						/>
					</GoogleMap>
				) : (
					<></>
				)}
			</div>
			{showAddress && (
				<div className={styles.text}>
					<p>{address}</p>
				</div>
			)}
		</div>
	);
};

export default Map;

function removePlusCode(address: string): string {
	return address?.replace(/\s*[A-Z0-9]+\+[A-Z0-9]+\s*,?\s*/, " ")?.trim();
}
