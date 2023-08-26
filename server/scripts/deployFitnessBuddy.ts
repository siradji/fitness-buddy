import { ethers } from "hardhat";
async function main() {
  const contract = await ethers.deployContract('FitnessBuddy');
  await contract.waitForDeployment();
  console.log(`Fitness Buddy contract deployed to ${contract.target}`);
}
void main().catch(e => {
  console.error(e)
})
