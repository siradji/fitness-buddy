"use client";

import { useState} from "react";
import {InputField} from "@/components/common/InputField";
import {ConnectButton} from "@/components/common/ConnectButton";
import {useAccount, useContractWrite, usePrepareContractWrite, useWaitForTransaction} from "wagmi";
import {AddEntryButton} from "@/components/common/AddEntryButton";
import {TESTNET_CONFIG} from "@/config";
import {useDebounce} from "use-debounce";



export const FoodEntryForm: React.FC = () => {
    const { isConnected, address} = useAccount()

    const [foodName, setFoodName] = useState('')
    const [debouncedFoodName] = useDebounce(foodName, 200)


    const [calories, setCalories] = useState('')
    const [debouncedCalories] = useDebounce(calories, 200)

    const { config, error } = usePrepareContractWrite({
        address: TESTNET_CONFIG.FitnessBuddy.address as any,
        abi: TESTNET_CONFIG.FitnessBuddy.abi as any,
        functionName: 'addFoodEntry',
        enabled: true,
        args: [debouncedFoodName,  debouncedCalories],
        account: address
    });

    const {  write, data } = useContractWrite(config);

    const {  isLoading,} = useWaitForTransaction({
        hash: data?.hash,
    });

    const handleAddEntry = () => {
        if(!write) return
        clearForm()
        write()
    }

    const clearForm  = (): void => {
        setFoodName('')
        setCalories('')
    }
    return (
        <div className="dark-card-bg-image rounded-[20px] w-full border backdrop-blur-[18px] border border-dark-200">
           <div className="p-7">
               <h3 className="font-bold text-center">Enter food item</h3>
                <div className="flex flex-col my-10">
                    <label>
                        Food Name
                    </label>
                    <InputField
                        value={foodName}
                        name="name"
                        onChange={(value) => setFoodName(value) }
                    />
                </div>

               <div className="flex flex-col my-10">
                   <label>
                       Calories
                   </label>
                   <InputField
                       isNumeric={true}
                       value={calories}
                       name="calories"
                       onChange={(value) =>  setCalories(value)}
                   />
               </div>
               {isConnected ? <AddEntryButton loading={isLoading}  onClick={handleAddEntry} />  : <ConnectButton  /> }
           </div>
        </div>
    )
}


