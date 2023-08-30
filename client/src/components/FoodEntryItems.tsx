import {useAccount, useContractEvent} from "wagmi";
import {TESTNET_CONFIG} from "@/config";
import {useState} from "react";
import {UsersTable} from "@/components/UsersTable";
import {FoodEntry, useUserContext} from "@/context/UserContext";



export const FoodEntryItems: React.FC<{entries?: FoodEntry[]}> = ({entries}) => {
    const {refetchUser} =  useUserContext()
    const {address} = useAccount()
    const unwatch = useContractEvent({
        address: TESTNET_CONFIG.FitnessBuddy.address as any,
        abi: TESTNET_CONFIG.FitnessBuddy.abi,
        eventName: 'FOOD_ENTRY_ADDED',
        listener(event: any) {
            if (event[0].args._address !== address ) {
                 unwatch?.()
                return
            }

            void refetchUser()
        },
    })

    if(!entries?.length) {
        return (
            <div>
                <h1>No Food Items Added yet</h1>
            </div>
        )
    }

    return (
        <UsersTable>
            <UsersTable.UserTableHeader>
                <UsersTable.UserTableHead
                    label="Food Name"
                    width="1/3"
                />
                <UsersTable.UserTableHead
                    label="Calories"
                    width="1/3"
                />
                <UsersTable.UserTableHead
                    label="Date"
                    width="1/3"
                />
            </UsersTable.UserTableHeader>
            {entries.length && entries.map((entry, index) => (
                <FoodEntryItem date={entry.date} key={index} food={entry.food} calories={entry.calories} />
            ))}
        </UsersTable>
    )
}

const FoodEntryItem = (props: FoodEntry) => {
    const date = new Date(Number(props.date) * 1000)

    return (
        <UsersTable.UserTableRow >
            <UsersTable.UserRowItem>
                {props.food}
            </UsersTable.UserRowItem>
            <UsersTable.UserRowItem>
                {props.calories}
            </UsersTable.UserRowItem>
            <UsersTable.UserRowItem>
                {date.toLocaleDateString()}
            </UsersTable.UserRowItem>
        </UsersTable.UserTableRow>
    )
}
