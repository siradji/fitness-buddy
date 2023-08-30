// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;


/**
 @notice @dev
This error occurs when a user tries to interact with contract without an account.
**/
    error USER_DOES_NOT_EXIST();

/**
 @notice @dev
This error occurs when a user tries to add food entry with calories exceeding the max daily threshold.
**/
    error FOOD_ENTRY_MAX_CALORIES_THRESHOLD_EXCEEDED();


/**
 @notice @dev
This error occurs when a user tries to add food entry when daily max threshold is exceeded.
**/
    error DAILY_CALORIES_THRESHOLD_EXCEEDED();


/**
 @notice @dev
This error occurs when a user tries to access functions exclusive to contract owners.
**/
    error UNAUTHORIZED_ACCESS();

// Author: @surajauwal
contract FitnessBuddy {
    address public admin;
    address[] private usersAddresses;
    constructor() {
        admin = msg.sender;
        addUser();
    }

    struct User {
        mapping(uint16 => uint16) totalCaloriesToday;
        bool exists;
        uint16 maxCaloriesThreshold;
        FoodEntry[] foodEntries;
    }

    struct FoodEntry {
        uint16 date;
        string food;
        uint16 calories;
    }

    mapping(address => User) public users;


    event FOOD_ENTRY_ADDED(string _food, uint16 _calories, address _address);

    modifier onlyAdmin() {
        if(msg.sender != admin) revert UNAUTHORIZED_ACCESS();
        _;
    }


    function addUser() public {
        User storage newUser = users[msg.sender];

        newUser.exists = true;
        newUser.maxCaloriesThreshold = uint16(2100);

        uint16 today = uint16(block.timestamp / 1 days);

        newUser.totalCaloriesToday[today] = uint16(0);

        usersAddresses.push(msg.sender);
    }

    function changeUserCaloriesThreshold(address _user, uint16 _limit)
    public
    onlyAdmin
    {
        User storage user = users[_user];

        if(!user.exists) revert USER_DOES_NOT_EXIST();
        user.maxCaloriesThreshold += _limit;
    }

    function addFoodEntry(string memory _food, uint16 _calories)
    public
    {

        User storage user = users[msg.sender];

        if(!user.exists) revert USER_DOES_NOT_EXIST();

        uint16 userMaxCaloriesThreshold = user.maxCaloriesThreshold;

        uint16 today = uint16(block.timestamp / 1 days);

        user.totalCaloriesToday[today] += _calories;

        uint16 totalCaloriesToday = user.totalCaloriesToday[today];

        if(_calories > userMaxCaloriesThreshold) revert FOOD_ENTRY_MAX_CALORIES_THRESHOLD_EXCEEDED();

        if(totalCaloriesToday > userMaxCaloriesThreshold) {
            user.totalCaloriesToday[today] -= _calories;
            revert DAILY_CALORIES_THRESHOLD_EXCEEDED();
        }

        FoodEntry memory newFoodEntry = FoodEntry({
            calories: _calories,
            food: _food,
            date: today
        });


        user.foodEntries.push(newFoodEntry); // Store food entry in user's storage


        emit FOOD_ENTRY_ADDED(_food, _calories, msg.sender);

    }

    function queryUserFoodEntries(address _user)
    public
    view
    onlyAdmin
    returns (FoodEntry[] memory)
    {
        return users[_user].foodEntries;
    }

    function queryMyFoodEntries() public view returns (FoodEntry[] memory) {
        return users[msg.sender].foodEntries;
    }

    function queryAllUsers()
    public
    view
    onlyAdmin
    returns (address[] memory, uint16[] memory)
    {
        address[] memory allUsers = new address[](usersAddresses.length);
        uint16[] memory thresholds = new uint16[](usersAddresses.length);

        for (uint256 i = 0; i < usersAddresses.length; i++) {
            allUsers[i] = usersAddresses[i];
            thresholds[i] = users[allUsers[i]].maxCaloriesThreshold;
        }

        return (allUsers, thresholds);
    }

    function checkUserExist (address _user) public view returns (bool) {
        User storage user = users[_user];

        return user.exists;
    }

    function getUser(address _user) external view returns (FoodEntry[] memory, uint16, uint16) {
        User storage user = users[_user];

        if(!user.exists)  revert USER_DOES_NOT_EXIST();

        FoodEntry[] storage foodEntries = user.foodEntries;
        uint16 today = uint16(block.timestamp / 1 days);
        return (foodEntries, user.maxCaloriesThreshold, user.totalCaloriesToday[today]);
    }

}
