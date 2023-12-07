import { ethers } from "ethers";

function createAccounts(mnemonic) {
  let accounts = [];
  const hdNode = ethers.utils.HDNode.fromMnemonic(mnemonic);
  for (let index = 0; index < 10; index++) {
    // The BIP-44 standard for creating HD wallet path
    // https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki

    let path = `m/44'/60'/0'/0/${index}`;
    let myAccount = hdNode.derivePath(path);
    accounts.push({
      account: myAccount.address,
      key: myAccount.privateKey,
    });
  }
  return accounts;
}

function getTransactionsList(
  currentAccountAddress,
  ETHERSCAN_API_KEY,
  transactionCount
) {
  const result = fetch(
    `https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=${currentAccountAddress}&startblock=0&endblock=99999999&page=1&offset=${transactionCount}&sort=desc&apikey=${ETHERSCAN_API_KEY}`
  )
    .then((response) => response.json())
    .then((data) => {
      const tnx = data.result;
      return tnx;
    })
    .catch((error) => alert(error));
  return result;
}
async function getBalance(currentAccountAddress, provider_api) {
  try {
    const provider = new ethers.providers.JsonRpcProvider(provider_api);
    let balance = await provider.getBalance(currentAccountAddress);
    return ethers.utils.formatEther(balance);
  } catch (error) {
    console.log("Could not fetch balance");
  }
}

async function sendTransaction(
  amount,
  provider_api,
  currentAccountKey,
  recipientAddress
) {
  try {
    const provider = new ethers.providers.JsonRpcProvider(provider_api);
    const wallet = new ethers.Wallet(currentAccountKey, provider);
    let gasPrice = await provider.getGasPrice();
    gasPrice = ethers.utils.formatUnits(gasPrice, "wei");
    const txn = await wallet
      .sendTransaction({
        to: recipientAddress,
        gasPrice: gasPrice,
        gasLimit: 21000,
        value: ethers.utils.parseEther(amount),
      })
      .catch((e) => {
        // console.log(e);
        alert(e);
      });
    const response = await txn.wait();
    return response;
  } catch {
    console.log("Could not process the transaction");
  }
}
export { createAccounts, getTransactionsList, getBalance, sendTransaction };
