'use client';
import React, { useState, useCallback, useEffect } from "react";
import styles from "./Map.module.scss";
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
	width: '100%',
	height: '100%'
};

const Map = () => {
	const [map, setMap] = useState<google.maps.Map | null>(null)
	const [location, setLocation] = useState({
		lat: 0,
		lng: 0
	});
	const [address, setAddress] = useState('');
	useEffect(() => {
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const { latitude, longitude } = position.coords;
					setLocation({ lat: latitude, lng: longitude });
					// Call function to get address
					getAddress(latitude, longitude);
				},
				(error) => {
					console.error(`Error: ${error.message}`);
				}
			);
		} else {
			console.log("Geolocation is not supported by this browser.");
		}
	}, []);

	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string
	})


	const onLoad = useCallback(function callback(map: google.maps.Map) {
		setMap(map);
		// No need to use fitBounds
	}, []);

	const onUnmount = React.useCallback(function callback(map: google.maps.Map) {
		setMap(null)
	}, [])

	// Fetch the human-readable address using Google Maps Geocoding API
	const getAddress = async (lat: number, lng: number) => {
		const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;

		try {
			const response = await fetch(geocodeUrl);
			const data = await response.json();

			if (data.status === 'OK' && data.results.length > 0) {
				const formattedAddress = data.results[0].formatted_address;
				setAddress(formattedAddress);
			} else {
				console.log("No address found for this location.");
			}
		} catch (error) {
			console.error("Error fetching address: ", error);
		}
	};

	console.log(address, "address");

	return (
		<div className={styles.container}>
			<div className={styles.text}>
				<h3>LOCATION</h3>
			</div>
			<div className={styles.image}>
				{
					isLoaded ? (
						<GoogleMap
							mapContainerStyle={containerStyle}
							center={location}
							zoom={10}
							onLoad={onLoad}
							onUnmount={onUnmount}


						>
							<Marker
								position={location}
								icon={{
									url: '/svgs/map-location-svgrepo-com.svg',
									scaledSize: new google.maps.Size(40, 40),
								}}
							/>
						</GoogleMap>
					) : <></>
				}
			</div>
			<div className={styles.text}>
				<p>{address}</p>
			</div>
		</div>
	);
};

export default React.memo(Map);
