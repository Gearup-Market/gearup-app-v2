export const stringShortner = (
	text?: string,
	length: number = 18,
	defaultText: string = "Input a string!"
) => {
	if (text !== undefined) {
		const first: string = text.substring(0, 6);
		const end: string = text.substring(text.length, text.length - length);
		return `${first}...${end}`;
	}
	return defaultText;
};

export const shortenTitle = (title: string, length: number = 10) => {
	if (!title) return;
	if (title.length > length) {
		return `${title.substring(0, length + 1)}...`;
	}
	return title;
};

export const getIdFromSlug = (productSlug: string): string => {
	if(!productSlug) return '';
	const strArray = productSlug.split('-');
	return strArray.at(-1) || '';
}


export const base64ToBlob = (base64: string): Blob => {
    const byteString = atob(base64.split(',')[1]); // Decode base64
    const mimeString = base64.split(',')[0].split(':')[1].split(';')[0]; // Extract MIME type

    const byteArray = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
        byteArray[i] = byteString.charCodeAt(i);
    }

    return new Blob([byteArray], { type: mimeString });
};
