import React from "react";
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";

interface Props {
	listings: any[];
}

const ListingsMap = ({ listings }: Props) => {
	const mapContainerStyle = {
		width: "100%",
		height: "100%",
	};

	const center = { lat: 0, lng: 0 }; // Set your initial center

	return (
		<LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
			<GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={10}>
				{listings.map(listing => (
					<Marker
						key={listing.id}
						position={{ lat: listing.latitude, lng: listing.longitude }}
						title={listing.productName}
					/>
				))}
			</GoogleMap>
		</LoadScript>
	);
};

export default ListingsMap;
