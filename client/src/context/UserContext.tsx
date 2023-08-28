import {createContext, PropsWithChildren, useEffect, useState} from "react";
import {useAccount, useContractWrite, usePrepareContractWrite, useWaitForTransaction} from "wagmi";
import {TESTNET_CONFIG} from "@/config";

interface UserContextI {
    user: {
        id: string
        totalCaloriesToday: number
        maxCaloriesThreshold: number
    }
}
const UserContext = createContext<UserContextI>(undefined as any)

export function UserContextProvider (props: PropsWithChildren<{}>) {
    const [user, setUser] = useState<UserContextI | null>(null)
    const {isConnected, address} = useAccount();
    const [loader, setLoader] = useState<boolean>(false)

    const {config } = usePrepareContractWrite({
        address: TESTNET_CONFIG.FitnessBuddy.address as any,
        abi: TESTNET_CONFIG.FitnessBuddy.abi as any,
        functionName: 'checkUserExist',
        args: [address ?? '']
    })

    const {data: getUserData, write, isLoading, } = useContractWrite(config)


    const {
        error: getUserError,
        isLoading: isGettingUserInprogress,
        isSuccess,
    } = useWaitForTransaction({
        hash: getUserData?.hash,
    });


    useEffect(() => {
            if(isConnected) {
               void fetchUserFromBlockchain()
            }
        setLoader(isLoading)

        }, [isConnected, address])

    const fetchUserFromBlockchain = async (): Promise<void> => {
        if(!write) return
        write?.()
        console.log({ isLoading, isSuccess, getUserData})

        console.log({getUserError, isGettingUserInprogress})

    }
        return (
            <UserContext.Provider value={user as any}>
                {props.children}
            </UserContext.Provider>
        )
}
