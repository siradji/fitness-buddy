import '../style/globals.css'
import ClientLayout from './Web3Provider'
import { FC, PropsWithChildren } from 'react'
import Head from "next/head";

const RootLayout: FC<PropsWithChildren<{}>> = ({ children }) => {
	return (
		<html lang="en">
		<Head>
			<base href="/" />
			<meta name="application-name" content="FitnessBuddy" />
			<meta charSet="UTF-8" />
			<title key="title">Fitness Buddy</title>
			<meta key="description" name="description" content={"Decentralized fitness tracking platform"} />
			<meta key="keywords" name="keywords" content={"fitness web3, calories, weight loss"} />
			<meta key="robots" name="robots" content="follow,index" />
			<meta name="googlebot" content="index,follow" />
			<meta name="google" content="notranslate" />
			<meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
			<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1.0, shrink-to-fit=no, viewport-fit=cover"
			/>
			<meta
				key="apple-mobile-web-app-capable"
				name="apple-mobile-web-app-capable"
				content="yes"
			/>
			<link rel="icon" href="/favicon.ico" />
			<link
				rel="icon"
				type="image/svg"
				sizes="32x32"
				href="/next.svg"
			/>
			<link
				rel="icon"
				type="image/svg"
				sizes="16x16"
				href="/next.svg"
			/>
		</Head>

		<body>
				<ClientLayout>{children}</ClientLayout>
			</body>
		</html>
	)
}

export default RootLayout
