import { ethers, artifacts } from "hardhat";
import fs from "fs";
import path from "path";

async function main() {
  const ContractFactory = await ethers.getContractFactory("ScholarshipVerification");

  // PASTIKAN menggunakan `await` saat deploy
  const contract = await ContractFactory.deploy();

  // Tunggu sampai deployment selesai
  await contract.waitForDeployment();

  const address = await contract.getAddress();
  console.log("Contract deployed to:", address);

  // Simpan ABI
  const artifact = await artifacts.readArtifact("ScholarshipVerification");

  const abiDir = path.join(__dirname, "../oracle-api/abi");
  if(!fs.existsSync(abiDir)){
    fs.mkdirSync(abiDir, {recursive : true});
  }

  const abiPath = path.join(__dirname, "../oracle-api/abi/ScholarshipVerification.json");
  fs.writeFileSync(abiPath, JSON.stringify(artifact.abi, null, 2));

  // Optional: simpan alamat juga
  fs.writeFileSync(path.join(__dirname, "../oracle-api/contract-address.txt"), address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
