"use client";

import {ReactNode, useState} from "react";
import {InputField} from "@/components/common/InputField";
import {ConnectButton} from "@/components/common/ConnectButton";
import {useAccount, useContractWrite} from "wagmi";
import {AddEntryButton} from "@/components/common/AddEntryButton";


interface FoodEntryFormFields {
    name: string
    calories: string
}
export function FoodEntryForm (): ReactNode {
    const {address, isConnected} = useAccount()

     const [form, setForm] = useState<FoodEntryFormFields>({
        name: '',
        calories: ''
    })

    const handleFormChange = (name: keyof FoodEntryFormFields, value: string): void => {
        setForm(prevState => ({...prevState, [name]: value}))
    }
    return (
        <div className="dark-card-bg-image rounded-[20px] border backdrop-blur-[18px] border border-dark-200">
           <div className="p-7">
               <h3 className="font-bold text-center">Enter food item</h3>
                <div className="flex flex-col my-10">
                    <label>
                        Food Name
                    </label>
                    <InputField
                        value={form.name}
                        name="name"
                        onChange={handleFormChange}
                    />
                </div>

               <div className="flex flex-col my-10">
                   <label>
                       Calories
                   </label>
                   <InputField
                       isNumeric={true}
                       value={form.calories}
                       name="calories"
                       onChange={handleFormChange}
                   />
               </div>
               {isConnected ? <AddEntryButton onClick={() => {}} />  : <ConnectButton  /> }
           </div>
        </div>
    )
}


