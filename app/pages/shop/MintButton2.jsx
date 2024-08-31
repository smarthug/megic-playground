// import React, { useState } from 'react';
// import { useAccount, useWalletClient, useWriteContract } from 'wagmi';
// import { createPublicClient, createWalletClient, custom } from 'viem';
// // import { mainnet } from 'viem/chains';


// const rootNetworkTestnet = {
//     id: 7672,
//     name: "Root Network Testnet",
//     network: "root-testnet",
//     rpcUrls: {
//       default: "https://testnet.root.rootnet.live/archive", // Replace with actual RPC URL
//     },
//     nativeCurrency: {
//       name: "Test XRP",
//       symbol: "TXRP",
//       decimals: 18,
//     },
//     blockExplorers: {
//       default: {
//         name: "Root Explorer",
//         url: "https://testnet-explorer.rootnet.live",
//       },
//     },
//     testnet: true,
//   };

// const MintNFT = () => {
//   const { address } = useAccount();
//   const { data: signer } = useWalletClient();
//   const [status, setStatus] = useState('');


//   const { data: hash, writeContract } = useWriteContract()

//   const mintNFT = async () => {
//     if (!signer || !address) {
//       setStatus('Please connect your wallet first.');
//       return;
//     }

//     const contractAddress = '0xB0B58fC668E0C944f620f30D3C4e075845b3aAC5'; // ERC-1155 컨트랙트 주소 입력
//     const abi = [
//       // ERC-1155 컨트랙트의 mint 함수 ABI
//       {
//         "inputs": [
//           { "internalType": "address", "name": "to", "type": "address" },
//           { "internalType": "uint256", "name": "id", "type": "uint256" },
//           { "internalType": "uint256", "name": "amount", "type": "uint256" },
//           { "internalType": "bytes", "name": "data", "type": "bytes" }
//         ],
//         "name": "mint",
//         "outputs": [],
//         "stateMutability": "nonpayable",
//         "type": "function"
//       }
//     ];

//     const client = createWalletClient({
//       chain: rootNetworkTestnet,
//       transport: custom(signer),
//     });

//     try {
//       const tokenId = 1; // 민팅할 토큰의 ID
//       const amount = 1;  // 민팅할 수량
//       const { hash } = await client.writeContract({
//         address: contractAddress,
//         abi: abi,
//         functionName: 'mint',
//         args: [address, tokenId, amount, '0x'],
//       });

//       setStatus('Transaction sent! Waiting for confirmation...');

//       const publicClient = createPublicClient({
//         chain: mainnet,
//       });

//       await publicClient.waitForTransactionReceipt({ hash });

//       setStatus('NFT successfully minted!');
//     } catch (error) {
//       console.error(error);
//       setStatus('Minting failed.');
//     }
//   };

//   return (
//     <div>
//       <button onClick={mintNFT} disabled={!address}>
//         Mint NFT
//       </button>
//       <p>{status}</p>
//     </div>
//   );
// };

// export default MintNFT;