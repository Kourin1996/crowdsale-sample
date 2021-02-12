import { ethers } from "hardhat";

const CROWDSALE_CONTRACT_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const AMOUNT = ethers.utils.parseEther("1");

const main = async () => {
  const [signer] = await ethers.getSigners();

  console.log(`Send ${AMOUNT.toString()} to ${CROWDSALE_CONTRACT_ADDRESS}`);

  await signer.sendTransaction({
    to: CROWDSALE_CONTRACT_ADDRESS,
    value: AMOUNT,
  });

  console.log("DONE");
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
