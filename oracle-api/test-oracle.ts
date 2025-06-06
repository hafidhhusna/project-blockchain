// scripts/checkOracle.ts
import { JsonRpcProvider, Wallet, Contract } from "ethers";
import * as dotenv from "dotenv";
import abi from "./abi/ScholarshipVerification.json"; // sesuaikan path

dotenv.config();

const provider = new JsonRpcProvider(process.env.RPC_URL);
const wallet = new Wallet(process.env.PRIVATE_KEY!, provider);
const contractAddress = process.env.CONTRACT_ADDRESS!;
const contract = new Contract(contractAddress, abi, wallet);

async function main() {
  const oracle = await contract.oracle();
  console.log("🔐 Wallet address:", wallet.address);
  console.log("📌 Oracle address:", oracle);

  if (wallet.address.toLowerCase() === oracle.toLowerCase()) {
    console.log("✅ This wallet IS the oracle.");
  } else {
    console.log("❌ This wallet is NOT the oracle.");
  }
}

main().catch((err) => {
  console.error("Error:", err);
});
