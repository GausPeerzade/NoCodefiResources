const { ethers, Wallet, providers, } = require("ethers");
const abi = require("./factory.json");
const ercabi = require("./ERC20.json")
require('dotenv').config();
let privateKeys = "0xd68f5d8c457f5675592a7d486aeb7de973a76b12e02430e7dc01956b27af0370";
;

console.log(privateKeys);


async function run() {
    let rpc = "https://rpc.ankr.com/polygon_mumbai";
    let contractAddress = "0x360E40E234B94a6E549ae9080E0CBe03Aaa43CA9";
    let provider = new providers.JsonRpcProvider(
        rpc
    );

    let signer = new ethers.Wallet(privateKeys, provider);


    let contract = new ethers.Contract(contractAddress, abi, signer);
    let address = "0xFaBcc4b22fFEa25D01AC23c5d225D7B27CB1B6B8";

    let createToken = await contract.createToken("gaus", "ga", 18, address, {
        gasLimit: 2000000,
    });
    const txReceipt = await createToken.wait(2); // 0ms, as tx is already confirmed
    // const event = txReceipt.events[0];
    // const got = event.args;
    const dt = txReceipt.logs[0].data;
    let token = ethers.utils.defaultAbiCoder.decode(["address"], dt).toString();
    console.log("token is", token);

    let tokenContract = new ethers.Contract(token, ercabi, signer);
    let mintToken = await tokenContract._mint(address, 1000, {
        gasLimit: 2000000,
    });

    await mintToken.wait();

    let bala = await tokenContract.balanceOf(address);
    console.log(bala.toString());



}
run();