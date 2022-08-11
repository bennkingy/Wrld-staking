const hre = require("hardhat");

async function main() {
  const StakingContract = await hre.ethers.getContractFactory("WRLDStaking");
  const RewardTokenContract = await hre.ethers.getContractFactory("WRLDhorses");
  const CollectionContract = await hre.ethers.getContractFactory("WorldHorses");
  const tokenContract = await RewardTokenContract.deploy();
  const collectionContract = await CollectionContract.deploy();

  await tokenContract.deployed();
  await collectionContract.deployed();
  console.log(`RewardsToken deployed to \n ${tokenContract?.address}`);
  const stakingContract = await StakingContract.deploy(
    // "0xf4DEd30B6ca5a6A40f56D9Fe066A9951571C6E3C", //here is the collection contract address on the main net 
    collectionContract.address,
    tokenContract.address
  );
  await stakingContract.deployed();
  console.log(`staking deployed to \n ${stakingContract?.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
