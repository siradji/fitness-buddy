import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import {useAccount, useContractRead, useContractWrite, usePrepareContractWrite, useWaitForTransaction} from "wagmi";
import { TESTNET_CONFIG } from "@/config";

export interface FoodEntry {
    food: string
    calories: number
    date: string
}
export interface User {
    foodEntries:  FoodEntry[]
    totalCaloriesToday: number;
    maxCaloriesThreshold: number;
}

interface UserContextData {
    user: User | null;
    isLoading: boolean;

    refetchUser: (t?: any) => any;

    fetchingUser: boolean

    isAdmin: boolean
}

const UserContext = createContext<UserContextData | undefined>(undefined);

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUserContext must be used within a UserContextProvider");
    }
    return context;
};

export function UserContextProvider(props: PropsWithChildren<{}>) {
    const [user, setUser] = useState<User | null>(null);
    const { isConnected, address } = useAccount();
    const [isAdmin, setIsAdmin] = useState<boolean>(false)

    const { data: fetchedUser, isSuccess: hasFetchedUser, isLoading: fetchingUser ,refetch} = useContractRead({
        address: TESTNET_CONFIG.FitnessBuddy.address as any,
        abi: TESTNET_CONFIG.FitnessBuddy.abi as any,
        functionName: 'getUser',
        args: [address]
    });


    useEffect(() => {

        if(address && isConnected && address === TESTNET_CONFIG.FitnessBuddy.defaultSignerAddress) {
            setIsAdmin(true)
        } else {
            setIsAdmin(false)
        }

    }, [address, isConnected])


    const { data: userStatus, isLoading: checkingUserStatus,} = useContractRead({
        address: TESTNET_CONFIG.FitnessBuddy.address as any,
        abi: TESTNET_CONFIG.FitnessBuddy.abi as any,
        functionName: 'checkUserExist',
        args: [address]
    });


    const { config, error: addUserPrepareError, refetch: refetchAddUser } = usePrepareContractWrite({
        address: TESTNET_CONFIG.FitnessBuddy.address as any,
        abi: TESTNET_CONFIG.FitnessBuddy.abi as any,
        functionName: 'addUser',
        enabled: Boolean(isConnected),
        account: address
    });

    const {  write, data, error: addUserWriteError, } = useContractWrite(config);


    const { isLoading} = useWaitForTransaction({
        hash: data?.hash,
    });


    useEffect(() => {
        if(addUserWriteError || addUserPrepareError) {
        }
    }, [addUserWriteError, addUserPrepareError])


    useEffect(() => {
        if(hasFetchedUser) {
            const [foodEntries, maxCaloriesThreshold, totalCaloriesToday] = fetchedUser as any;
            setUser({
                foodEntries: foodEntries satisfies FoodEntry[],
                maxCaloriesThreshold,
                totalCaloriesToday
            })
        }
    }, [hasFetchedUser, isConnected])



    useEffect(() => {
        refetchAddUser()
            .then(() => {
                if(!userStatus) {
                    write?.()
                }
            })

    }, [checkingUserStatus, userStatus, isConnected]);


    const refetchUser = async () => {
        const {isSuccess, data, isError, error} = await refetch();

        if(isSuccess) {
            const [foodEntries, maxCaloriesThreshold, totalCaloriesToday] = data as any;
            setUser({
                foodEntries: foodEntries satisfies FoodEntry[],
                maxCaloriesThreshold,
                totalCaloriesToday
            })
        } else if(isError) {
            console.error(error)
        }
    }


    return (
        <UserContext.Provider value={{ user, isAdmin, isLoading, refetchUser, fetchingUser}}>
            {props.children}
        </UserContext.Provider>
    );
}
