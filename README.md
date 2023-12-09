# walletBT
This walletBT mobile crypto wallet was developed using React Native and Ethers for the Ethereum network. We are using the Expo-managed workflow for the app development.
The current implementation of the walletBT is just for the Sepolia Test Network. But it can be easily implemented for the Mainnet as well.

## Functionalities
1. View Account Information: You can view your account address, balance, and private key.
2. Send Ether(s): You will be able to send Ether(s) to any valid account in Ethereum Network(Sepolia Test Network).
3. View Transaction History: You will be able to view the last 100 transactions.

# How to Replicate the walletBT
## First, clone the application inside your development machine
```
git clone https://github.com/Druk-Information-and-Technology/walletBT.git walletBT
cd walletBT
npm i
```
## .env File
Create a .env file in the project's root and define the INFURA_SEPOLIA_API and ETHERSCAN_API_KEY environment variables.
```
INFURA_SEPOLIA_API=value
ETHERSCAN_API_KEY=value
```

Both the APIs can be created from the respective website free of cost. However, it has limitations in its use for the free tier.

[INFURA Website](https://www.infura.io/) \
[ETHERSCAN website](https://etherscan.io/)

## Run the Code
```
npx expo start

```

# Contrubution to the walletBT
If you want to contribute, feel free to send the pull request.

If you like the project, then feel free to give it a star ⭐


