const { ethers } = require("ethers");
const abi = require("./abi.json");



async function main() {

    let privateKeys = "0xd68f5d8c457f5675592a7d486aeb7de973a76b12e02430e7dc01956b27af0370";
    let rpc = "http://127.0.0.1:8545";
    let provider = new ethers.providers.JsonRpcProvider(
        rpc
    );

    let signer = new ethers.Wallet(privateKeys, provider);
    let contractAddress = "0xa38e9508368a823249b7eF291156F93CDcB8E66E";

    let contract = new ethers.Contract(contractAddress, abi, signer);

    const wEthadd = "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1";

    const tokens = ["0x5979D7b546E38E414F7E9822514be443A4800529", "0xfc5A1A6EB076a2C7aD06eD22C90d7E710E35ad0a", "0x912CE59144191C1204E64559FE8253a0e49E6548"];
    const allocation = [50, 30, 20];
    const swapFees = [100, 3000, 500];

    let createToken = await contract.createVault(wEthadd, tokens, allocation, swapFees, {
        gasLimit: 200000000,
    });

    const txReceipt = await createToken.wait();
    const leng = txReceipt.logs.length - 1;

    const dt = txReceipt.logs[leng].data;
    let token = ethers.utils.defaultAbiCoder.decode(["address"], dt).toString();
    console.log("allocation vault is", token);
}

main();