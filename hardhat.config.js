require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");

require("dotenv").config();

module.exports = {
  networks: {
    rinkeby: {
      url: `${process.env.ALCHEMY_RINKEBY_URL}`, //infura.io
      accounts: [`${process.env.RINKEBY_PRIVATE_KEY}`], // your wallet private key
    },
    // mainnet: {
    //   url: `${process.env.INFURA_MAINNET_URL}`, //infura.io
    //   accounts: [`${process.env.MAINNET_PRIVATE_KEY}`], // your wallet private key
    // },
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: "UPSVZUZG2F2YQI1RJ8UTZ3BC7578SS2VBJ", //ether scan api key
  },
  solidity: "0.8.4",
};

// npx hardhat run scripts/deploy.js --network rinkeby (for the rinkeby network)
// npx hardhat run scripts/deploy.js --network mainnet (for the main network)

//npx harhat verify --network rinkeby contractDeplyedADDRESS (for the rinkeby network)
//npx harhat verify --network mainnet contractDeplyedADDRESS (for the main network)
