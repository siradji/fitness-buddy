import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import {expect} from 'chai';
import {deployedContracts} from "./test_utils/deployment";
import {ethers} from "hardhat";
import {FitnessBuddy} from "../generated";
import {HardhatEthersSigner} from "@nomicfoundation/hardhat-ethers/signers";

describe('Fitness Buddy - User',  () => {
    let fitnessBuddyContract: FitnessBuddy;
    let owner: HardhatEthersSigner;
    let user1: HardhatEthersSigner;

    beforeEach(async () => {
        fitnessBuddyContract =  (await loadFixture(deployedContracts)).fitnessBuddyContract;

        const accounts = await ethers.getSigners()
         user1 = accounts[1];
        owner = accounts[0];
    })

    it('should successfully create user', async ()  => {
        await fitnessBuddyContract.connect(user1).addUser()
        expect(await fitnessBuddyContract.checkUserExist(user1.address)).equals(true); // check if user is added
    });

    it('should fail when user does not exist', async () => {
        expect(await fitnessBuddyContract.checkUserExist(user1.address)).equals(false);
    });

    it('should revert when changing calories threshold limit', async ()  => {
        const UNAUTHORIZED_ACCESS = 'UNAUTHORIZED_ACCESS';
        await expect(
            fitnessBuddyContract.connect(user1).changeUserCaloriesThreshold(user1.address, 4000)
        ).to.revertedWithCustomError(fitnessBuddyContract, UNAUTHORIZED_ACCESS);
    });
})
