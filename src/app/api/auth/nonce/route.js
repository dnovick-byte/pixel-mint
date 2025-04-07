import { randomBytes } from "crypto";

export async function GET() {
    const nonce = randomBytes(16).toString("hex"); // Generate a random nonce
    return Response.json({ nonce });
}