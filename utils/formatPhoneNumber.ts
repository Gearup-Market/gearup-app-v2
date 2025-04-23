export function formatPhoneNumber(
	phoneNumber: string,
	defaultCountryCode: number
): string {
	if (!phoneNumber) return "";

	// Check if the phone number already starts with a plus sign
	if (phoneNumber.startsWith("+")) {
		// Remove all non-digit characters after the plus sign
		const cleanedPhoneNumber = "+" + phoneNumber.substring(1).replace(/\D+/g, "");

		// Check if there's a leading zero after country code
		const parts = cleanedPhoneNumber.substring(1).match(/^(\d+)(0?)(.*)$/);
		if (parts && parts[2] === "0" && parts[1] === String(defaultCountryCode)) {
			// Remove the zero after country code
			return "+" + parts[1] + parts[3];
		}

		return cleanedPhoneNumber;
	} else {
		// For numbers without plus sign, remove all non-digits
		const cleaned = phoneNumber.replace(/\D+/g, "");

		// Remove leading zero if present
		const formattedPhoneNumber = cleaned.startsWith("0")
			? cleaned.substring(1)
			: cleaned;

		// Add default country code
		return `+${defaultCountryCode}${formattedPhoneNumber}`;
	}
}
