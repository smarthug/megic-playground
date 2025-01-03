// src/App.js
import React, { useState } from "react";
import { Container, Grid } from "@mui/material";
import ItemCard from "./ItemCard";
import useGame from "../world/stores/useGame";
import { useMegicStore } from "../../utils/useMegicStore";

import {
  useWriteContract,
  useWaitForTransactionReceipt,
} from 'wagmi';

import { abi } from '../../utils/abi';


const items = [
  {
    id: 1,
    name: "The Crown",
    description: "A crown that grants the wearer unlimited power",
    price: 1000,
    // image: 'https://via.placeholder.com/150',
    image: "/imgs/crown.png",
  },
  // {
  //     id: 2,
  //     name: 'Shield of Valor',
  //     description: 'A shield that can withstand any attack.',
  //     price: 79.99,
  //     image: 'https://via.placeholder.com/150',
  // },
  // 더 많은 아이템을 추가할 수 있습니다.
];

const App = () => {
  // Transaction hooks
  const { data: hash, writeContract, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });


  const setHasCrown = useGame((state) => state.setHasCrown);
  const [purchasedItems, setPurchasedItems] = useState([]);
  const megicPoints = useMegicStore((state) => state.megicPoints);
  const decreaseMegicPointByNumber = useMegicStore(
    (state) => state.decreaseMegicPointByNumber
  );

  const handlePurchase = (item) => {
    if (megicPoints < item.price) {
      alert("Not enough megic points!");
      return;
    }

    // if (!identityInstance) return;
    // const provider = identityInstance.getEthereumProvider();


    writeContract({
      abi,
      address: '0x93a61eD85dD4585beC75e0cDa76d713ddBb6F6b3',
      functionName: 'mint',
      args: ['0xA4C8F3Ed647F3aA84011da72d0f3E20DB2Bfa69D', 0, 1, ""],
    });



    setHasCrown(true);
    localStorage.setItem("hasCrown", true);

    setPurchasedItems([...purchasedItems, item]);
    decreaseMegicPointByNumber(item.price);
    // alert(`Purchased ${item.name}`);

  };

  return (
    <Container
      maxWidth="xs"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid container spacing={2}>
        {items.map((item) => (
          <Grid item xs={12} sm={12} md={12} key={item.id}>
            <ItemCard item={item} onPurchase={handlePurchase} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default App;
