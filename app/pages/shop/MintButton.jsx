import * as React from 'react'
import { useWriteContract } from 'wagmi'
// import { abi } from './abi'

export function MintButton() {
  const { data: hash, writeContract } = useWriteContract()

  async function mint() {

    console.log("minting")
    await writeContract({
      address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
      abi: {
        "inputs": [
          { "internalType": "address", "name": "to", "type": "address" },
          { "internalType": "uint256", "name": "id", "type": "uint256" },
          { "internalType": "uint256", "name": "amount", "type": "uint256" },
          { "internalType": "bytes", "name": "data", "type": "bytes" }
        ],
        "name": "mint",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      functionName: 'mint',
      args: [BigInt(1)],
    })
  }

  return (
    <>

      <button onClick={mint}>Mint</button>
      {hash && <div>Transaction Hash: {hash}</div>}
    </>

  )
}