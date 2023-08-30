'use client'

import { ConnectKitButton } from 'connectkit'
import {FoodEntryForm} from "@/components/FoodEntryForm";
import {ReactNode} from "react";
import {Card} from "@/components/common/Card";
import {UsersTable} from "@/components/UsersTable";
import {useAccount} from "wagmi";
import {FoodEntryItems} from "@/components/FoodEntryItems";
import {User, useUserContext} from "@/context/UserContext";
import {AdminView} from "@/components/views/AdminView";


const Home = () => {
	const {isConnected} = useAccount()
	const {isAdmin, isLoading, user, fetchingUser} = useUserContext()
	return (
		<div className="px-5 md:px-10 lg:px-[120px] pt-8 pb-6 md:py-6 lg:py-8">
			{isAdmin ?
				<AdminView  />
				:
				<UserView
					fetchingUser={fetchingUser}
					user={user}
					isConnected={isConnected}
					isLoading={isLoading}
				/>}
		</div>

	)
}

export default Home






const  UserView: React.FC<{isLoading: boolean, isConnected: boolean, user: User | null, fetchingUser: boolean}>  = ({user, fetchingUser, isLoading, isConnected}) =>  {

	if(fetchingUser) {
		return <h1>.......</h1>
	}



	return (
		<div className="flex flex-col w-full">
			{isConnected && (
				<div className="flex flex-row items-center space-x-5 w-full">
					<Card heading="Total Calories Today">
						{user && user.totalCaloriesToday}
					</Card>
					<Card heading="Max Calories Threshold">
						{user && user.maxCaloriesThreshold}
					</Card>
				</div>
			)}
			<div className="flex items-center justify-between w-full">
				{!isConnected ? (
					<div className="basis-1/2">
						<h1 className="font-bold text-8xl text-white">Decentralized Fitness Tracking App</h1>
					</div>
				): (
					<div>
						<div className="basis-1/2">
							<h1 className="font-bold text-4xl text-white">Connected. Start Adding food entries</h1>
						</div>
					</div>
				)}
				<div className="basis-1/2 rounded p-16" >
					{isLoading ? (<h1>Loading</h1>) : (
						<div>
							<FoodEntryForm />
						</div>
					)}
				</div>
			</div>
			{isConnected && (
				<FoodEntryItems entries={user?.foodEntries} />
			)}
		</div>
	)
}
