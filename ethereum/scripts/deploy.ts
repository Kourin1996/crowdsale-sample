import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { BigNumber } from "ethers";

// 1000 Token
const TOKEN_INITIAL_AMOUNT = BigNumber.from(10).mul(18 + 3);

const OPEN_IN = 60 * 5; // in 5 min [sec]
const CLOSE_IN = 60 * 60 * 24 * 7; // in 7 days [sec]

const PERIODS = [1 * 60 * 60 * 24, 2 * 60 * 60 * 24, 4 * 60 * 60 * 24];

const RATES = [2000, 1000, 500];

const deployToken = async (
  deployer: SignerWithAddress,
  initialAmount: BigNumber
) => {
  const tokenFactory = await (
    await ethers.getContractFactory("KourinToken")
  ).connect(deployer);
  const token = await tokenFactory.deploy(initialAmount);
  await token.deployed();
  return token.address;
};

const deployCrowdsale = async (
  deployer: SignerWithAddress,
  tokenAddress: string,
  walletAddress: string,
  initialRate: number,
  openingTime: number,
  closingTime: number,
  periods: number[],
  rates: number[]
) => {
  const crowdsaleFactory = await (
    await ethers.getContractFactory("KourinTokenCrowdsale")
  ).connect(deployer);
  const crowdsale = await crowdsaleFactory.deploy(
    tokenAddress,
    walletAddress,
    initialRate,
    openingTime,
    closingTime,
    periods,
    rates
  );
  await crowdsale.deployed();
  return crowdsale.address;
};

const main = async () => {
  const [deployer] = await ethers.getSigners();
  const deployerBalance = (await deployer.getBalance()).toString();
  console.log(`Deployer: ${deployer.address} (${deployerBalance})`);

  const tokenAddress = await deployToken(deployer, TOKEN_INITIAL_AMOUNT);
  console.log(`Deployed Token: ${tokenAddress}`);

  const now = Math.floor(new Date().getTime() / 1000);

  const crowdsaleAddress = await deployCrowdsale(
    deployer,
    tokenAddress,
    deployer.address,
    1,
    now + OPEN_IN,
    now + CLOSE_IN,
    PERIODS,
    RATES
  );
  console.log(`Deployed Crowdsale: ${crowdsaleAddress}`);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
