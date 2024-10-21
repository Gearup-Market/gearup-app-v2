/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		domains: ["images.wedio.com", "images.unsplash.com", "plus.unsplash.com", "placehold.it", "via.placeholder.com", "res.cloudinary.com", "example.com"],
	},
};

module.exports = nextConfig;
