import { HardhatUserConfig } from "hardhat/config";
import {config as dotenvConfig} from "dotenv";
import "@nomicfoundation/hardhat-toolbox";

dotenvConfig();

const {RPC_URL, PRIVATE_KEY} = process.env

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  defaultNetwork : "sepolia",
  networks : {
    hardhat : {},
    sepolia : {
      url : RPC_URL,
      accounts : [`0x${PRIVATE_KEY}`]
    }
  }
};

export default config;
