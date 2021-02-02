import { config as dotenvConfig } from "dotenv";
import { resolve } from "path";
dotenvConfig({ path: resolve(__dirname, "./.env") });

import { HardhatUserConfig, NetworkUserConfig } from "hardhat/types";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-web3";
import "hardhat-typechain";
import "@nomiclabs/hardhat-etherscan";
import "solidity-coverage";
import "hardhat-gas-reporter";

const chainIds = {
  ganache: 1337,
  goerli: 5,
  hardhat: 31337,
  kovan: 42,
  mainnet: 1,
  rinkeby: 4,
  ropsten: 3,
};

//todo: change to mnemonic
function createTestnetConfig(
  network: keyof typeof chainIds,
  infuraApiKey: string,
  privateKey: string
): NetworkUserConfig {
  const url: string = "https://" + network + ".infura.io/v3/" + infuraApiKey;
  return {
    accounts: [`0x${privateKey}`],
    chainId: chainIds[network],
    url,
  };
}

let infuraApiKey: string;
if (!process.env.INFURA_API_KEY) {
  throw new Error("Please set your INFURA_API_KEY in a .env file");
} else {
  infuraApiKey = process.env.INFURA_API_KEY;
}

let privateKey: string;
if (!process.env.PRIVATE_KEY) {
  throw new Error("Please set your privateKey in a .env file");
} else {
  privateKey = process.env.PRIVATE_KEY;
}

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  solidity: {
    compilers: [{ version: "0.6.10", settings: {} }],
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {},
    goerli: createTestnetConfig("goerli", infuraApiKey, privateKey),
    kovan: createTestnetConfig("kovan", infuraApiKey, privateKey),
    rinkeby: createTestnetConfig("rinkeby", infuraApiKey, privateKey),
    ropsten: createTestnetConfig("ropsten", infuraApiKey, privateKey),
  },
};

export default config;
