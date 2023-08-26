import { HardhatUserConfig } from "hardhat/config";
import dotenv from 'dotenv';
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-chai-matchers";


dotenv.config({
  path: '.env',
})

const  DEFAULT_CHAINID = 1337;

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: '0.8.19',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  networks: {
    hardhat: {
      // url: 'http://127.0.0.1:8545/',
      chainId: DEFAULT_CHAINID,
    },

    development: {
      url: 'http://127.0.0.1:8545/',
      chainId: DEFAULT_CHAINID,
      allowUnlimitedContractSize: true,
    },
    goerli: {
      url: process.env.GOERLI_URL || '',
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
      gasPrice: 30000000000, // this is 30 Gwei
      chainId: 5,
    },
  },
  paths: {
    sources: './contracts',
    tests: './test',
    artifacts: './artifacts',
    cache: './cache',
  },
  typechain: {
    outDir: './generated',
    target: 'ethers-v6',
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};


export default config;
