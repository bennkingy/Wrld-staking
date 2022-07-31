const { expect } = require("chai");
const { ethers } = require("hardhat");

// @Todo
//   1 - deploy all contracts token, collection, staking  and check owners v
//   2 - get approves -
//    NFTRewards- add controller - staking
//    setApproveforall - staking - true
//   3 - collection mint function
// by Owner
// by other user

let owner;
let addr1;
let addr2;
let addrs;

let rewardContractAddress;
let collectionContractAddress;
let stakingContractaddress;

let worldHorses;
let reward;
let nftStaking;

//deploy contracts and get data and addresses

describe("Deployment", function () {
  it("Rewards token deployment", async () => {
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    const Rewards = await ethers.getContractFactory("WRLDhorses");
    reward = await Rewards.deploy();
    await reward.deployed();
    console.log(`Rewards deployedto \n ${reward?.address}`);
    rewardContractAddress = reward.address;
  });
  it("collection contract deployment", async () => {
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    const WorldHorses = await ethers.getContractFactory("WorldHorses");
    worldHorses = await WorldHorses.deploy(
      "WorldHorses",
      "WRLDhorses",
      0,
      10000000,
      100000,
      "https://www.worldhorses.com/"
    );
    await worldHorses.deployed();
    console.log(`worldHorses deployedto \n ${worldHorses?.address}`);
    collectionContractAddress = worldHorses.address;
  });
  it("staking contract deployment", async () => {
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    const NFTStaking = await ethers.getContractFactory("WRLDStaking");
    nftStaking = await NFTStaking.deploy(
      collectionContractAddress,
      rewardContractAddress
    );
    await nftStaking.deployed();
    console.log(`worldHorses deployedto \n ${nftStaking?.address}`);
    stakingContractaddress = nftStaking.address;
  });
});

//collection config and mint NFTs
describe("Collection", function () {
  it("should set the right owner", async () => {
    expect(await worldHorses?.owner()).to.equal(owner.address);
  }).timeout(10000);
  it("unpause", async () => {
    await worldHorses?.setPaused(false);
    expect(await worldHorses?.paused()).to.equal(false);
  });
  it("mint", async () => {
    expect(await worldHorses?.mint(100));
  });
  it("balanceOf", async () => {
    expect(await worldHorses?.balanceOf(owner.address)).to.equal(100);
  }).timeout(10000);
  it("set Approve", async () => {
    await worldHorses?.setApprovalForAll(stakingContractaddress, true);
    expect(
      await worldHorses?.isApprovedForAll(owner.address, stakingContractaddress)
    ).to.equal(true);
  });
});

//rewards config

describe("Rewards", function () {
  it("should set the right owner", async () => {
    expect(await reward?.owner()).to.equal(owner.address);
  }).timeout(10000);
  it("add controller", async () => {
    await reward?.addController(stakingContractaddress);
    expect(await reward?.controllers(stakingContractaddress)).to.equal(true);
  }).timeout(10000);
});

//staking config and stake , unstake , claim

describe("Stake Contract", function () {
  it("should set the right owner", async () => {
    expect(await nftStaking?.owner()).to.equal(owner.address);
  }).timeout(10000);
  it("stake", async () => {
    await nftStaking?.stake([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  }).timeout(10000);

  it("unstake", async () => {
    await nftStaking?.connect(owner)._unstakeMany(owner.address, [1]);
  }).timeout(10000);
  it("claim", async () => {
    await nftStaking?.claim([2]);
  }).timeout(10000);
});
