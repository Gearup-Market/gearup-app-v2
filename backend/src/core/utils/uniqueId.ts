import { randomBytes } from "crypto";

export function randomId(size: number = 8){
    const buffer = randomBytes(size);
    return buffer.toString('hex');
}