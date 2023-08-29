import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import {expect} from 'chai';
import {deployedContracts} from "./test_utils/deployment";
import {ethers} from "hardhat";
import {FitnessBuddy} from "../generated";
import {FoodEntry} from "../types";
import {HardhatEthersSigner} from "@nomicfoundation/hardhat-ethers/signers";

describe('Fitness Buddy - Food Entry',  () => {
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

    it('should successfully add food entry', async ()  => {
        await fitnessBuddyContract.connect(user1).addUser()

        await fitnessBuddyContract.connect(user1).addFoodEntry(foodEntry1.food, foodEntry1.calories);

        const [foodEntryResult1] = await fitnessBuddyContract.connect(user1).queryMyFoodEntries();

        expect(foodEntryResult1.food).to.be.equals(foodEntry1.food); // check if food entry is being added
        expect(foodEntryResult1.calories).to.be.equals(foodEntry1.calories); // check if food entry is being added
    });

    it('should add multiple food entries', async () => {
        await fitnessBuddyContract.connect(user1).addUser()

        await fitnessBuddyContract.connect(user1).addFoodEntry(foodEntry1.food, foodEntry1.calories);
        await fitnessBuddyContract.connect(user1).addFoodEntry(foodEntry2.food, foodEntry2.calories);

        const [foodEntryResult1, foodEntryResult2] = await fitnessBuddyContract.connect(user1).queryMyFoodEntries();

        expect(foodEntryResult1.food).to.be.equals(foodEntry1.food); // check if food entry is being added
        expect(foodEntryResult1.calories).to.be.equals(foodEntry1.calories);

        expect(foodEntryResult2.food).to.be.equals(foodEntry2.food); // check if food entry is being added
        expect(foodEntryResult2.calories).to.be.equals(foodEntry2.calories);
    });

    it('should emit an event when a new food entry is added', async () => {
        const event = 'FOOD_ENTRY_ADDED';
        await fitnessBuddyContract.connect(user1).addUser()
        await expect(
            fitnessBuddyContract.connect(user1).addFoodEntry(foodEntry1.food, foodEntry1.calories)
        )
            .to.emit(fitnessBuddyContract, event)
            .withArgs(foodEntry1.food, foodEntry1.calories, user1.address)

    });

    it('should revert when adding food entry if user does not exist ', async ()  => {
            const USER_DOES_NOT_EXIST_CODE = 'USER_DOES_NOT_EXIST';

         await expect(fitnessBuddyContract.connect(user1).addFoodEntry(foodEntry1.food, foodEntry2.calories))
            .to.revertedWithCustomError(fitnessBuddyContract, USER_DOES_NOT_EXIST_CODE)

    });

    it('should revert when adding single food entry that exceed calories threshold', async () => {
        const MAX_EXCEED_REVERT_CODE = 'FOOD_ENTRY_MAX_CALORIES_THRESHOLD_EXCEEDED';

        await fitnessBuddyContract.connect(user1).addUser()

        await expect(fitnessBuddyContract.connect(user1).addFoodEntry(foodEntry3.food, foodEntry3.calories))
            .to.be.revertedWithCustomError(fitnessBuddyContract, MAX_EXCEED_REVERT_CODE)
    });

    it('should should revert when daily calories threshold is exceeded', async () => {
       const DAILY_CALORIES_THRESHOLD_EXCEEDED = 'DAILY_CALORIES_THRESHOLD_EXCEEDED';

        await fitnessBuddyContract.connect(user1).addUser()

        // Adding entries not exceeding default threshold (1500 calories for both)
        await fitnessBuddyContract.connect(user1).addFoodEntry(foodEntry1.food, foodEntry1.calories);
        await fitnessBuddyContract.connect(user1).addFoodEntry(foodEntry2.food, foodEntry2.calories);

        // Will fail adding 1000 calories
        await expect(fitnessBuddyContract.connect(user1).addFoodEntry(foodEntry1.food, foodEntry1.calories))
            .to.be.revertedWithCustomError(fitnessBuddyContract, DAILY_CALORIES_THRESHOLD_EXCEEDED)

        // added 500 calories (total 2000)
        await fitnessBuddyContract.connect(user1).addFoodEntry(foodEntry2.food, foodEntry2.calories);
    });
})
