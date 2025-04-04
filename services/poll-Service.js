const { ethers } = require("ethers");
const votingABI = require("../abi/VotingSystem.json");

const contractAddress = process.env.CONTRACT_ADDRESS;
const privateKey = process.env.PRIVATE_KEY; // Owner wallet key
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(privateKey, provider);
const contract = new ethers.Contract(contractAddress, votingABI, wallet);

module.exports = {
    createPoll: async (title) => {
        const tx = await contract.createPoll(title);
        await tx.wait();
        return tx.hash;
    },

    mintToken: async (pollIndex, voterAddress) => {
        const tx = await contract.mintVotingToken(pollIndex, voterAddress);
        await tx.wait();
        return tx.hash;
    },

    addCandidate: async (pollIndex, name) => {
        const tx = await contract.addCandidate(pollIndex, name);
        await tx.wait();
        return tx.hash;
    },

    togglePollStatus: async (pollIndex) => {
        const tx = await contract.togglePollStatus(pollIndex);
        await tx.wait();
        return tx.hash;
    },

    vote: async (pollIndex, candidateIndex, signer) => {
        const voterConnected = contract.connect(signer);
        const tx = await voterConnected.vote(pollIndex, candidateIndex);
        await tx.wait();
        return tx.hash;
    },

    getPollCount: async () => {
        return await contract.getPollCount();
    },

    getCandidate: async (pollIndex, index) => {
        return await contract.getCandidate(pollIndex, index);
    },

    getCandidateCount: async (pollIndex) => {
        return await contract.getCandidateCount(pollIndex);
    },
};
