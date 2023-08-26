import {ethers} from "hardhat";
import {FitnessBuddy} from '../../generated'
export async function deployedContracts (): Promise<FitnessBuddyDeploymentResult> {
    const FitnessBuddy = await ethers.getContractFactory('FitnessBuddy');

    const fitnessBuddyContract = await FitnessBuddy.deploy();

    await fitnessBuddyContract.waitForDeployment();

    return {
        fitnessBuddyContract
    }
}

interface FitnessBuddyDeploymentResult {
    fitnessBuddyContract: FitnessBuddy
}
