import FitnessBuddyAbi from './abi/FitnessBuddy.json';
export const MAINNET_CONFIG = {
    EthereumRpcUrl:
        "",
    ExplorerURL: "https://etherscan.io",
    FitnessBuddy: {
        address: "",
        abi: '',
    },

};

// sepolia
export const TESTNET_CONFIG = {
    EthereumRpcUrl: "https://eth-sepolia.g.alchemy.com/v2/voHtcOpgygGKOaMSpkt6aNz6JdKi_v0p",
    ExplorerURL: "https://sepolia.etherscan.io",
    FitnessBuddy: {
        address: "0xa3f1770A93Ce348033B4f4a3FedCDe4fCe6aab35",
        abi: FitnessBuddyAbi,
    }
};

export const PROJECT_META = {
    APP_NAME: 'FitnessBuddy'
}
