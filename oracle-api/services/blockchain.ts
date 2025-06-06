import { JsonRpcProvider, Wallet, Contract } from "ethers";
import * as dotenv from "dotenv";
import abi from "../abi/ScholarshipVerification.json";

dotenv.config();

const provider = new JsonRpcProvider(process.env.RPC_URL);
const wallet = new Wallet(process.env.PRIVATE_KEY!, provider);
const contract = new Contract(process.env.CONTRACT_ADDRESS!, abi, wallet);

export interface Student {
  studentId: string;
  gpa: number;
  isActive: boolean;
}

export async function registerStudent(address: string, studentId: string) {
  const tx = await contract.registerStudent(address, studentId);
  await tx.wait();
  return tx.hash;
}

export async function updateAcademicStatus(address: string, gpa: number, isActive: boolean) {
  const tx = await contract.updateAcademicStatus(address, Math.floor(gpa * 100), isActive);
  await tx.wait();
  return tx.hash;
}

export async function getStudent(address: string): Promise<Student> {
  const [studentId, gpa, isActive] = await contract.getStudent(address);
  return {
    studentId,
    gpa: Number(gpa) / 100,
    isActive,
  };
}

export function getOracleAddress(): string {
  return wallet.address;
}
