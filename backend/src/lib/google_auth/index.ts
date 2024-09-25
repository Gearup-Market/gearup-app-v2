import { HttpException } from "@/core/exceptions/HttpException";
import client from "./config";

export default async function googleAuth(idToken: string) {
  try {
    const { tokens } = await client.getToken(idToken);

    console.log(tokens, "tokens received\n");
    
    const id_token = tokens.id_token;
    const ticket = await client.verifyIdToken({
      idToken: id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) throw new HttpException(400, "Unable to verify token");

    return payload;
  } catch (error) {
    console.log(error, "error occure");
    
    throw new HttpException(error.status || 500, error.message);
  }
}
