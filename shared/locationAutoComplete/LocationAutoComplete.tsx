"use client";

import { useLoadScript } from "@react-google-maps/api";
import React, { useEffect } from "react";
import usePlacesAutocomplete, {
	getGeocode,
	GeocodeResult
} from "use-places-autocomplete";
import { InputField } from "..";
import styles from "./LocationAutoComplete.module.scss";

type Library =
	| "core"
	| "maps"
	| "places"
	| "geocoding"
	| "routes"
	| "marker"
	| "geometry"
	| "elevation"
	| "streetView"
	| "journeySharing"
	| "drawing"
	| "visualization";

const libraries: Library[] = ["places"];

const LocationAutoComplete = ({
	onAddressSelect,
	placeholder,
	label,
	placeholderValue,
	error,
	className
}: {
	onAddressSelect?: (_address: any) => void;
	label?: string;
	placeholder?: string;
	placeholderValue?: string;
	error?: string;
	className?: string;
}) => {
	const {
		ready,
		value,
		suggestions: { status, data },
		setValue,
		clearSuggestions
	} = usePlacesAutocomplete({
		requestOptions: { componentRestrictions: { country: "ng" } },
		debounce: 300,
		cache: 86400
	});

	const { isLoaded } = useLoadScript({
		libraries,
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string
	});

	const renderSuggestions = () => {
		return data.map(suggestion => {
			const {
				place_id,
				structured_formatting: { main_text, secondary_text },
				description
			} = suggestion;

			return (
				<li
					key={place_id}
					onClick={() => {
						getGeocode({ address: description }).then(
							(r: GeocodeResult[]) => {
								const formatted_address = {
									city: r[0].address_components.find(address =>
										address.types.includes("locality")
									)?.long_name,
									state: r[0].address_components.find(address =>
										address.types.includes(
											"administrative_area_level_1"
										)
									)?.long_name,
									country: r[0].address_components.find(address =>
										address.types.includes("country")
									)?.long_name,
									coords: {
										latitude: r[0]?.geometry?.location?.lat(),
										longitude: r[0]?.geometry?.location?.lng()
									},
									address: r[0].formatted_address
								};
								return (
									onAddressSelect && onAddressSelect(formatted_address)
								);
							}
						);
						setValue(description, false);
						clearSuggestions();
						// onAddressSelect && onAddressSelect(suggestion);
					}}
					className={styles.listItem}
				>
					{main_text}, {secondary_text}
				</li>
			);
		});
	};

	useEffect(() => {
		if (isLoaded) {
			getGeocode({ address: placeholderValue }).then((r: GeocodeResult[]) => {
				const formatted_address = {
					city: r[0].address_components.find(address =>
						address.types.includes("locality")
					)?.long_name,
					state: r[0].address_components.find(address =>
						address.types.includes("administrative_area_level_1")
					)?.long_name,
					country: r[0].address_components.find(address =>
						address.types.includes("country")
					)?.long_name,
					coords: {
						latitude: r[0]?.geometry?.location?.lat(),
						longitude: r[0]?.geometry?.location?.lng()
					},
					address: r[0].formatted_address
				};
				onAddressSelect && onAddressSelect(formatted_address);
				setValue(placeholderValue as string);
			});
		}
	}, [isLoaded, onAddressSelect, placeholderValue, ready, setValue]);

	return (
		<div className={`${styles.container} ${className}`}>
			<InputField
				value={value}
				onChange={e => setValue(e.target.value)}
				placeholder={placeholder ?? "Enter Address"}
				label={label}
				error={error}
				autoComplete="off"
			/>

			{status === "OK" && isLoaded && (
				<ul className={styles.body}>{renderSuggestions()}</ul>
			)}
		</div>
	);
};

export default LocationAutoComplete;
