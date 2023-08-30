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
        address: "0xa0650F067056Ff51E9D81f0E3670eA92D0690E03",
        abi: FitnessBuddyAbi,
        defaultSignerAddress: '0xd8580008FF43Fcf299392aa8067e945d1A453254'
    }
};

export const PROJECT_META = {
    APP_NAME: 'FitnessBuddy'
}
