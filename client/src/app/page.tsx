'use client'

import { ConnectKitButton } from 'connectkit'
import {FoodEntryForm} from "@/components/FoodEntryForm";
import {ReactNode} from "react";
import {Card} from "@/components/common/Card";
import {UsersTable} from "@/components/UsersTable";
import {useAccount} from "wagmi";
import {FoodEntryItems} from "@/components/FoodEntryItems";


const Home = () => {
	return (
		<div className="px-5 md:px-10 lg:px-[120px] pt-8 pb-6 md:py-6 lg:py-8">
			{/*<AdminView totalFoodEntries_7days={200} totalfoodEntries_14days={100} />*/}
			<UserView />
		</div>

	)
}

export default Home





interface AdminViewI {
	totalFoodEntries_7days: number

	totalfoodEntries_14days: number
}

export function AdminView (props: AdminViewI): JSX.Element {
	return (
		<div>
			<div className="flex flex-row items-center space-x-5 w-full">
				<Card heading="Entries In the last 14 days">
					{props.totalfoodEntries_14days}
				</Card>
				<Card heading="Entries in the last 7 days">
					{props.totalFoodEntries_7days}
				</Card>
			</div>
			<div>
				<UsersTable>
					<UsersTable.UserTableHeader>
						<UsersTable.UserTableHead
							label="Address"
							width="1/3"
						/>
						<UsersTable.UserTableHead
							label="Food Entries"
							width="1/3"
						/>
						<UsersTable.UserTableHead
							label="Max Calories Threshold"
							width="1/3"
						/>
					</UsersTable.UserTableHeader>
					<UsersTable.UserTableRow >
						<UsersTable.UserRowItem>
							fidvfifdibdvibibvdibvdib
						</UsersTable.UserRowItem>
						<UsersTable.UserRowItem>
							20
						</UsersTable.UserRowItem>
						<UsersTable.UserRowItem>
							120000
						</UsersTable.UserRowItem>
					</UsersTable.UserTableRow>
					<UsersTable.UserTableRow >
						<UsersTable.UserRowItem>
							fidvfifdibdvibibvdibvdib
						</UsersTable.UserRowItem>
						<UsersTable.UserRowItem>
							20
						</UsersTable.UserRowItem>
						<UsersTable.UserRowItem>
							120000
						</UsersTable.UserRowItem>
					</UsersTable.UserTableRow>
					<UsersTable.UserTableRow >
						<UsersTable.UserRowItem>
							fidvfifdibdvibibvdibvdib
						</UsersTable.UserRowItem>
						<UsersTable.UserRowItem>
							20
						</UsersTable.UserRowItem>
						<UsersTable.UserRowItem>
							120000
						</UsersTable.UserRowItem>
					</UsersTable.UserTableRow>
					<UsersTable.UserTableRow >
						<UsersTable.UserRowItem>
							fidvfifdibdvibibvdibvdib
						</UsersTable.UserRowItem>
						<UsersTable.UserRowItem>
							20
						</UsersTable.UserRowItem>
						<UsersTable.UserRowItem>
							120000
						</UsersTable.UserRowItem>
					</UsersTable.UserTableRow>
				</UsersTable>
			</div>
		</div>
	)
}

const  UserView: React.FC<any>  = () =>  {
	const {isConnected} = useAccount()

	return (
		<div className="flex items-center justify-between ">
			{isConnected ? (
				<FoodEntryItems />
				) : (
				<div className="basis-1/2">
					<h1 className="font-bold text-8xl text-white">Decentralized Fitness Tracking App</h1>
				</div>
			)}
			<div className="basis-1/2 bt-black rounded p-16" >
				<div>
					<FoodEntryForm />
				</div>
			</div>
		</div>
	)
}
