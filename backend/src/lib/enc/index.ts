import * as crypto from "crypto";

const algorithm = "aes-256-cbc";
const ivLength = 16;

export const encrypt = (text: string, password: string) => {
	const iv = crypto.randomBytes(ivLength);
	const key = crypto.scryptSync(password, "salt", 32);
	const cipher = crypto.createCipheriv(algorithm, key, iv);
	let encrypted = cipher.update(text, "utf8", "hex");
	encrypted += cipher.final("hex");
	return iv.toString("hex") + ":" + encrypted;
};

export const decrypt = (encryptedText: string, password: string) => {
	const [iv, encrypted] = encryptedText.split(":");
	const key = crypto.scryptSync(password, "salt", 32);
	const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(iv, "hex"));
	let decrypted = decipher.update(encrypted, "hex", "utf8");
	decrypted += decipher.final("utf8");
	return decrypted;
};
