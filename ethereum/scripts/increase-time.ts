import { ethers } from "hardhat";

const main = async () => {
  await ethers.provider.send("evm_increaseTime", [60 * 10]); // add 60 seconds
  await ethers.provider.send("evm_mine", []);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
