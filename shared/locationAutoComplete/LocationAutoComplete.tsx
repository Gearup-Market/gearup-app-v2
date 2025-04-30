// "use client";

// import { useLoadScript } from "@react-google-maps/api";
// import React, { InputHTMLAttributes, ReactNode, useEffect } from "react";
// import usePlacesAutocomplete, {
// 	getGeocode,
// 	GeocodeResult
// } from "use-places-autocomplete";
// import { InputField } from "..";
// import styles from "./LocationAutoComplete.module.scss";

// type Library =
// 	| "core"
// 	| "maps"
// 	| "places"
// 	| "geocoding"
// 	| "routes"
// 	| "marker"
// 	| "geometry"
// 	| "elevation"
// 	| "streetView"
// 	| "journeySharing"
// 	| "drawing"
// 	| "visualization";

// const libraries: Library[] = ["places"];

// interface Props extends InputHTMLAttributes<HTMLInputElement> {
// 	icon?: string;
// 	name?: string;
// 	label?: string;
// 	className?: string;
// 	error?: string | ReactNode;
// 	placeholderValue?: string;
// 	onAddressSelect?: (_address: any) => void;
// 	register?: any;
// }

// const LocationAutoComplete = ({
// 	onAddressSelect,
// 	placeholder,
// 	label,
// 	placeholderValue,
// 	error,
// 	className,
// 	register,
// 	...options
// }: Props) => {
// 	const {
// 		ready,
// 		value,
// 		suggestions: { status, data },
// 		setValue,
// 		clearSuggestions
// 	} = usePlacesAutocomplete({
// 		requestOptions: { componentRestrictions: { country: "ng" } },
// 		debounce: 300,
// 		cache: 86400
// 	});

// 	const { isLoaded } = useLoadScript({
// 		libraries,
// 		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string
// 	});

// 	const renderSuggestions = () => {
// 		return data.map(suggestion => {
// 			const {
// 				place_id,
// 				structured_formatting: { main_text, secondary_text },
// 				description
// 			} = suggestion;

// 			return (
// 				<li
// 					key={place_id}
// 					onClick={() => {
// 						getGeocode({ address: description }).then(
// 							(r: GeocodeResult[]) => {
// 								const formatted_address = {
// 									city: r[0].address_components.find(address =>
// 										address.types.includes("locality")
// 									)?.long_name,
// 									state: r[0].address_components.find(address =>
// 										address.types.includes(
// 											"administrative_area_level_1"
// 										)
// 									)?.long_name,
// 									country: r[0].address_components.find(address =>
// 										address.types.includes("country")
// 									)?.long_name,
// 									coords: {
// 										latitude: r[0]?.geometry?.location?.lat(),
// 										longitude: r[0]?.geometry?.location?.lng()
// 									},
// 									address: r[0].formatted_address
// 								};
// 								return (
// 									onAddressSelect && onAddressSelect(formatted_address)
// 								);
// 							}
// 						);
// 						setValue(description, false);
// 						clearSuggestions();
// 						// onAddressSelect && onAddressSelect(suggestion);
// 					}}
// 					className={styles.listItem}
// 				>
// 					{main_text}, {secondary_text}
// 				</li>
// 			);
// 		});
// 	};

// 	useEffect(() => {
// 		if (isLoaded) {
// 			getGeocode({ address: placeholderValue }).then((r: GeocodeResult[]) => {
// 				const formatted_address = {
// 					city: r[0].address_components.find(address =>
// 						address.types.includes("locality")
// 					)?.long_name,
// 					state: r[0].address_components.find(address =>
// 						address.types.includes("administrative_area_level_1")
// 					)?.long_name,
// 					country: r[0].address_components.find(address =>
// 						address.types.includes("country")
// 					)?.long_name,
// 					coords: {
// 						latitude: r[0]?.geometry?.location?.lat(),
// 						longitude: r[0]?.geometry?.location?.lng()
// 					},
// 					address: r[0].formatted_address
// 				};
// 				onAddressSelect && onAddressSelect(formatted_address);
// 				setValue(placeholderValue as string);
// 			});
// 		}
// 	}, [isLoaded, onAddressSelect, placeholderValue, ready, setValue]);

// 	return (
// 		<div className={`${styles.container} ${className}`}>
// 			<InputField
// 				value={value}
// 				onChange={e => setValue(e.target.value)}
// 				placeholder={placeholder ?? "Enter Address"}
// 				label={label}
// 				error={error}
// 				autoComplete="off"
// 				{...register}
// 				{...options}
// 			/>

// 			{status === "OK" && isLoaded && (
// 				<ul className={styles.body}>{renderSuggestions()}</ul>
// 			)}
// 		</div>
// 	);
// };

// export default LocationAutoComplete;

// components/MyGoogleMap.tsx
// components/LocationAutocomplete.tsx

"use client";
import React, { InputHTMLAttributes, ReactNode, useRef, useState } from "react";
import { useLoadScript, Autocomplete } from "@react-google-maps/api";
import InputField from "../inputField/InputField";
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

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	icon?: string;
	name?: string;
	label?: string;
	className?: string;
	error?: string | ReactNode;
	placeholderValue?: string;
	onAddressSelect?: (_address: any) => void;
	register?: any;
}

const LocationAutocomplete = ({
	onAddressSelect,
	placeholder,
	label,
	placeholderValue,
	error,
	className,
	register,
	...options
}: Props) => {
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
		libraries,
		region: "ng"
	});

	const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

	const onPlaceChanged = () => {
		if (autocompleteRef.current) {
			const place = autocompleteRef.current.getPlace();
			const formatted_address = {
				city: place.address_components?.find(address =>
					address.types.includes("locality")
				)?.long_name,
				state: place.address_components?.find(address =>
					address.types.includes("administrative_area_level_1")
				)?.long_name,
				country: place.address_components?.find(address =>
					address.types.includes("country")
				)?.long_name,
				coords: {
					latitude: place.geometry?.location?.lat(),
					longitude: place.geometry?.location?.lng()
				},
				address: place.formatted_address
			};
			onAddressSelect && onAddressSelect(formatted_address);
		}
	};

	if (loadError) return <div>Error loading maps</div>;
	if (!isLoaded) return <div>Loading...</div>;

	return (
		<div className={`${styles.container} ${className}`}>
			<Autocomplete
				onLoad={autocomplete => (autocompleteRef.current = autocomplete)}
				onPlaceChanged={onPlaceChanged}
			>
				<InputField
					placeholder={placeholder ?? "Enter Address"}
					label={label}
					error={error}
					autoComplete="off"
					{...register}
					{...options}
				/>
			</Autocomplete>
		</div>
	);
};

export default LocationAutocomplete;
