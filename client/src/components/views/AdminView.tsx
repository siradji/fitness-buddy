import {UsersTable} from "@/components/UsersTable";
import {useAccount, useContractRead, useContractWrite, usePrepareContractWrite, useWaitForTransaction} from "wagmi";
import {TESTNET_CONFIG} from "@/config";
import {useEffect, useMemo, useState} from "react";
import {EditCal} from "@/components/EditCalDropdown";
import {autoUpdate, shift, size, useFloating} from "@floating-ui/react";


export function AdminView (): JSX.Element {
    const {isConnected, address} = useAccount();
    const [cal, setCal] = useState('')
    const [open, setOpen] = useState(false)
    const [editAddress, setAddress] = useState('')

    const { config, error: changeCalPrepareError } = usePrepareContractWrite({
        address: TESTNET_CONFIG.FitnessBuddy.address as any,
        abi: TESTNET_CONFIG.FitnessBuddy.abi as any,
        functionName: 'changeUserCaloriesThreshold',
        enabled: Boolean(isConnected),
        args: [editAddress, cal],
        account:address
    });


    const {  write, data, isLoading, isSuccess} = useContractWrite(config);


    const { data: users, isLoading: queryingUsers, error: queryingUsersError, refetch} = useContractRead({
        address: TESTNET_CONFIG.FitnessBuddy.address as any,
        abi: TESTNET_CONFIG.FitnessBuddy.abi as any,
        functionName: 'queryAllUsers',
        account: address
    });


    const { isLoading: changeCalTxLoading } = useWaitForTransaction({
        hash: data?.hash,
    });

    useEffect(() => {
        void refetch()
    }, [isLoading])


    const { y,x, strategy, refs } = useFloating({
        placement: "bottom-end",
        middleware: [
            shift(),
            size({
                apply({ rects }) {
                    if (
                        refs.floating.current !== null &&
                        refs.floating.current !== undefined
                    ) {
                        Object.assign(refs.floating.current.style, {
                            minWidth: "225px",
                            maxWidth: "368px",
                            width: `${rects.reference.width}px`,
                        });
                    }
                },
            }),
        ],
        whileElementsMounted: autoUpdate,
    });




    const formattedUsers = useMemo(() => {
        if(!users?.length) return
        const [addressArray, thresholdArray] = users as any
        return addressArray.map((address, index) => {
            return {
                address,
                threshold: thresholdArray[index]
            };
        });
    }, [users, queryingUsers])




    const handleEdit = (address:string) => {
        if(!cal.length || isLoading) return
        setAddress(address)
        write?.()
    }

    useEffect(() => {

        if(isSuccess) {
            setOpen(false)
            setCal('')
            setAddress('')
            refetch()
                .then( () => console.log('refetched users'))
        }

    }, [isSuccess])


    if(queryingUsers) {
        return <h1>getting users.......</h1>
    }


    if(!queryingUsers && !users?.length) {
        return <h1>No users</h1>
    }




    return (
        <div>
            <div className="flex flex-row items-center space-x-5 w-full">
                {/*<Card heading="Entries In the last 14 days">*/}
                {/*    {props.totalfoodEntries_14days}*/}
                {/*</Card>*/}
                {/*<Card heading="Entries in the last 7 days">*/}
                {/*    {props.totalFoodEntries_7days}*/}
                {/*</Card>*/}
            </div>
            <div>
                <UsersTable>
                    <UsersTable.UserTableHeader>
                        <UsersTable.UserTableHead
                            label="Address"
                            width="1/3"
                        />
                        <UsersTable.UserTableHead
                            label="Max Calories Threshold"
                            width="1/3"
                        />
                    </UsersTable.UserTableHeader>

                    {formattedUsers.length && formattedUsers.map((user: any) => {
                        return (
                                <UsersTable.UserTableRow >
                                    <UsersTable.UserRowItem>
                                        {user.address}
                                    </UsersTable.UserRowItem>
                                    <UsersTable.UserRowItem>
                                        <button onClick={() => setOpen(true)} ref={refs.setReference}>
                                            {user.threshold}
                                        </button>
                                        {open && (
                                            <div>
                                                <EditCal
                                                    open={true}
                                                    x={x}
                                                    cal={cal}
                                                    setCal={(value) => {
                                                        setCal(value)
                                                        setAddress(user.address)
                                                    }}
                                                    isSaving={isLoading}
                                                    handleClick={() => handleEdit(user.address)}
                                                    strategy={strategy}
                                                    y={y}
                                                    floating={refs.setFloating}
                                                />
                                            </div>
                                        )}
                                    </UsersTable.UserRowItem>
                                </UsersTable.UserTableRow>
                        )
                    })}
                </UsersTable>
            </div>
        </div>
    )
}
