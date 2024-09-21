export const formatLink = (text: string) => {
	if(!text) return text;
	return encodeURIComponent(text.toLowerCase().trim())
    .replace(/%20/g, '-')              // Replace spaces with hyphens
    .replace(/[!'()*]/g, '')            // Remove special characters
    .replace(/%/g, '')                  // Remove any remaining encoded characters
    .replace(/--+/g, '-')               // Replace multiple hyphens with a single hyphen
    .replace(/^-+|-+$/g, ''); ;
};