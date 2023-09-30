'use client'
import '../style/globals.css'
import { FC, PropsWithChildren } from 'react'
import {WagmiConfig, createConfig, sepolia} from 'wagmi'
import { ConnectKitProvider, getDefaultConfig } from 'connectkit'
import ScreenContainer from "@/components/SiteContainer";
import {useIsMounted} from "@/hooks/useIsMounted";
import {UserContextProvider} from "@/context/UserContext";

const config = createConfig(
	getDefaultConfig({
		appName: 'Fitness Buddy',
		alchemyId: process.env.NEXT_PUBLIC_ALCHEMY_ID,
		walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
		chains: [sepolia]
	})
)


const Web3Provider: FC<any> = ({ children }) => {
	const isMounted = useIsMounted()
	return (
		<WagmiConfig config={config}>
			<ConnectKitProvider>
				<UserContextProvider>
					{isMounted && (
						<ScreenContainer>
							{children}
						</ScreenContainer>
					)}
				</UserContextProvider>
			</ConnectKitProvider>
		</WagmiConfig>
	)
}

export default Web3Provider
