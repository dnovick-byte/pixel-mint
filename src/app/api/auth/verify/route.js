import { ethers } from "ethers";

export async function POST(req) {
  const { address, signature, nonce } = await req.json();

  // Reconstruct message
  const message = `Sign this message to log in: ${nonce}`;

  try {
    const recoveredAddress = ethers.utils.verifyMessage(message, signature);
    if (recoveredAddress.toLowerCase() !== address.toLowerCase()) {
      return Response.json({ error: "Invalid signature" }, { status: 400 });
    }

    return Response.json({ success: true, address });
  } catch (error) {
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}