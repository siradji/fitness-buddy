import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import {expect} from 'chai';
import {deployedContracts} from "./test_utils/deployment";
import {ethers} from "hardhat";
import {FitnessBuddy} from "../generated";
import {HardhatEthersSigner} from "@nomicfoundation/hardhat-ethers/signers";
import {FoodEntry} from "../types";

describe('Fitness Buddy - Admin',  () => {
    let fitnessBuddyContract: FitnessBuddy;
    let owner: HardhatEthersSigner;
    let user1: HardhatEthersSigner;

    const foodEntry1: FoodEntry = {
        calories: 1000,
        food: 'Granola'
    }

    const foodEntry2: FoodEntry = {
        calories: 500,
        food: 'Greek Yogurt'
    }

    const foodEntry4: FoodEntry = {
        calories: 600,
        food: 'Greek Yogurt'
    }


    // Exceed max calories threshold 2100 kCal
    const foodEntry3: FoodEntry = {
        calories: 2110,
        food: 'Large Cheese Pizza'
    }


    beforeEach(async () => {
        fitnessBuddyContract =  (await loadFixture(deployedContracts)).fitnessBuddyContract;

        const accounts = await ethers.getSigners()
        user1 = accounts[1];
        owner = accounts[0];
    })


    it('should successfully be added as user on contract deployment', async ()  => {
        expect(await fitnessBuddyContract.checkUserExist(owner.address)).equals(true); // check if user is added
    });

    it('should be able to change user threshold limit', async () => {
        const DAILY_CALORIES_THRESHOLD_EXCEEDED = 'DAILY_CALORIES_THRESHOLD_EXCEEDED';
        await fitnessBuddyContract.connect(user1).addUser()

        //add entries with threshold of 2100.
        await fitnessBuddyContract.connect(user1).addFoodEntry(foodEntry1.food, foodEntry1.calories);
        await fitnessBuddyContract.connect(user1).addFoodEntry(foodEntry2.food, foodEntry2.calories);
        await fitnessBuddyContract.connect(user1).addFoodEntry(foodEntry4.food, foodEntry4.calories);


        // reverts when adding another entry
        await expect(fitnessBuddyContract.connect(user1).addFoodEntry(foodEntry1.food, foodEntry1.calories))
            .to.be.revertedWithCustomError(fitnessBuddyContract, DAILY_CALORIES_THRESHOLD_EXCEEDED);


        // add 1000 to calories 2100 default threshold.
        await fitnessBuddyContract.connect(owner).changeUserCaloriesThreshold(user1.address, 1000);

        //successfully add another entry
        await fitnessBuddyContract.connect(user1).addFoodEntry(foodEntry4.food, foodEntry4.calories);
    });
})
