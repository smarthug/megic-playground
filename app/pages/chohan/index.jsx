import { useEffect, useLayoutEffect, useState } from "react";
import { OrbitControls } from "@react-three/drei";
import { Fullscreen, Container, Root } from "@react-three/uikit";

import { Text } from "@react-three/uikit";
import { Card } from "../../components/apfel/card";
import { Tabs, TabsButton } from "../../components/apfel/tabs";

// import { Card } from '@/card.js'
import { Input } from "../../components/apfel/input";

import { DollarSign } from "@react-three/uikit-lucide";
import { DiceGame, throwDice } from "./dice";

import { useDiceStore } from "./useDiceStore";
import { Canvas } from "@react-three/fiber";
import {
  Box,
  Paper,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

import { useMegicStore } from "../../utils/useMegicStore";

function TextOnCard() {
  const setMegicPoints = useMegicStore((state) => state.setMegicPoints);
  const firstDice = useDiceStore((state) => state.firstDice);
  const secondDice = useDiceStore((state) => state.secondDice);

  const isYourGuessOdd = useDiceStore((state) => state.isYourGuessOdd);

  const isFirstDiceRolling = useDiceStore((state) => state.isFirstDiceRolling);
  const isSecondDiceRolling = useDiceStore(
    (state) => state.isSecondDiceRolling
  );
  const isRolling = isFirstDiceRolling || isSecondDiceRolling;

  const getOddEven = (sum) => (sum % 2 === 0 ? "EVEN" : "ODD");

  const [isWin, setIsWin] = useState(false);
  const [result, setResult] = useState(0);

  useLayoutEffect(() => {
    console.log("firstDice", firstDice);
    if (firstDice === 0 || secondDice === 0) return;
    if (isFirstDiceRolling || isSecondDiceRolling) return;
    if (isYourGuessOdd) {
      if ((firstDice + secondDice) % 2 === 0) {
        lose();
      } else {
        win();
      }
    } else {
      if ((firstDice + secondDice) % 2 === 0) {
        win();
      } else {
        lose();
      }
    }
  }, [isFirstDiceRolling, isSecondDiceRolling]);

  function win() {
    console.log("win");
    setIsWin(true);
    // useMegicStore.getState().increaseMegicPoints(1)
    const betAmount = useDiceStore.getState().betAmount;
    // console.log(betAmount);
    const prev = useMegicStore.getState().megicPoints;
    // console.log(prev);
    const result = Number(prev) + Number(betAmount) * 2;
    // console.log(result);
    console.log(Number(betAmount) * 2);
    setResult(formatCurrency(Number(betAmount) * 2));
    localStorage.setItem("megicPoints", result);

    setMegicPoints(result);
  }

  function lose() {
    console.log("lose");
    setIsWin(false);
    // useMegicStore.getState().decreaseMegicPoints(1)
    const betAmount = useDiceStore.getState().betAmount;
    // console.log(betAmount);
    const prev = useMegicStore.getState().megicPoints;
    // console.log(prev);
    const result = Number(prev) - Number(betAmount);
    // console.log(result);
    console.log(-Number(betAmount));
    setResult(formatCurrency(-Number(betAmount)));
    console.log(result);
    localStorage.setItem("megicPoints", result);
    setMegicPoints(result);
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0, // 소수점을 원하지 않으면 이 줄을 추가하세요.
    }).format(amount);
  };

  return (
    <Card
      borderRadius={32}
      padding={32}
      gap={8}
      flexDirection="column"
      alignItems={"center"}
      width={250}
    >
      {/* <Text fontSize={32} color={isWin ? "yellow" : "blue"}>
        {isRolling ? "Rolling..." : `${result}`}
      </Text> */}

      <Text
        fontSize={32}
        color={isRolling ? "white" : isWin ? "yellow" : "blue"}
      >
        {isRolling ? "Rolling..." : `${result}`}
      </Text>
      <Text fontSize={24} opacity={0.7}>
        {isRolling
          ? "or reroll"
          : `${firstDice}+${secondDice}=${
              firstDice + secondDice
            } : ${getOddEven(firstDice + secondDice)}`}
      </Text>
    </Card>
  );
}

function InputsOnCard() {
  // const betAmount = useDiceStore((state) => state.betAmount);
  // const setBetAmount = useDiceStore((state) => state.setBetAmount);
  const [text, setText] = useState(100);
  return (
    <Card flexDirection="column" borderRadius={32} padding={0}>
      <Container
        flexDirection="column"
        alignItems="stretch"
        gapRow={0}
        width={150}
      >
        <Input
          value={text}
          onValueChange={setText}
          variant="rect"
          placeholder="Bet Amount"
          prefix={<DollarSign />}
          disabled={true}
        />
      </Container>
    </Card>
  );
}

// function OddEvenTabs() {
//   return (
//     <Tabs defaultValue="1">
//       <TabsButton value="1">
//         <Text>Odd</Text>
//       </TabsButton>
//       <TabsButton value="2">
//         <Text>Even</Text>
//       </TabsButton>
//     </Tabs>
//   );
// }

// function OddEvenTabs() {
//   const setIsYourGuessOdd = useDiceStore((state) => state.setIsYourGuessOdd);
//   function onActiveChange(value) {
//     console.log(value);
//     setIsYourGuessOdd(value === "1");
//   }
//   return (
//     <Tabs onValueChange={onActiveChange} defaultValue="2">
//       <TabsButton value="1">
//         <Text>Odd</Text>
//       </TabsButton>
//       <TabsButton value="2">
//         <Text>Even</Text>
//       </TabsButton>
//     </Tabs>
//   );
// }

function OddEvenTabs() {
  const setIsYourGuessOdd = useDiceStore((state) => state.setIsYourGuessOdd);
  const isYourGuessOdd = useDiceStore((state) => state.isYourGuessOdd);
  // const tmpValue =

  const handleChange = (event, newAlignment) => {
    // setAlignment(newAlignment);
    console.log(newAlignment);
    if (newAlignment !== null) {
      setIsYourGuessOdd(newAlignment);
    }
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={isYourGuessOdd}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton
        style={{
          minWidth: 60,
        }}
        value={true}
      >
        Odd
      </ToggleButton>
      <ToggleButton
        style={{
          minWidth: 60,
        }}
        value={false}
      >
        Even
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

// function OddEvenTabs() {
//   const [selectedValue, setSelectedValue] = useState("a");

//   const handleChange = (event) => {
//     setSelectedValue(event.target.value);
//   };

//   return (
//     <div>
//       <Radio
//         checked={selectedValue === "a"}
//         onChange={handleChange}
//         color="secondary"
//         value="a"
//         name="radio-buttons"
//         inputProps={{ "aria-label": "A" }}
//         labelPlacement="top"
//         label="Odd"
//       />
//       <Radio
//         checked={selectedValue === "b"}
//         onChange={handleChange}
//         value="b"
//         name="radio-buttons"
//         inputProps={{ "aria-label": "B" }}
//         labelPlacement="top"
//         label="Even"
//       />
//     </div>
//   );
// }

function BetInput() {
  const betAmount = useDiceStore((state) => state.betAmount);
  const setBetAmount = useDiceStore((state) => state.setBetAmount);
  return (
    <TextField
      type="number"
      id="outlined-controlled"
      label="Bet Amount"
      value={betAmount}
      onChange={(event) => {
        setBetAmount(event.target.value);
      }}
    />
  );
}

function Test() {
  console.log("test");
}

const Experience = () => {
  return (
    <>
      {/* <OrbitControls maxPolarAngle={Math.PI / 2} /> */}
      <Fullscreen flexDirection="column" padding={0} gap={0}>
        <Container
          flexGrow={1}
          flexDirection="column"
          margin={8}
          // justifyContent={"center"}
          alignItems={"center"}
          // onDoubleClick={Test}
          onClick={throwDice}
        >
          <Container marginTop={0}>
            <TextOnCard />
          </Container>
          <Container flexGrow={1}>{/* <TextOnCard /> */}</Container>
        </Container>
        <Container>
          <Container
            alignItems={"center"}
            flexGrow={1}
            flexDirection={"row"}
            gap={0}
            margin={8}
            marginBottom={28}
          >
            <Container justifyContent={"center"} flexGrow={1}>
              {/* <OddEvenTabs /> */}
            </Container>
          </Container>
        </Container>
      </Fullscreen>
      {/* <mesh>
        <boxGeometry />
        <meshNormalMaterial />
      </mesh> */}
      <DiceGame />
    </>
  );
};

function App() {
  return (
    <>
      {/* <Box
        style={{
          flex: 1,
          // height: "100vh",
          margin: 0,
          padding: 0,
        }}
      >
      </Box> */}

      <Canvas shadows camera={{ position: [0, 17, 0], fov: 45 }}>
        <color attach="background" args={["#ececec"]} />
        <Experience />
      </Canvas>
      <Box
        // width="100%"
        style={{
          // display: "flex",
          // flexDirection: "column",
          // justifyContent: "flex-end",
          // display: "fixed",
          // paddingBottom: 56 + 28,
          // padding: 56,
          // backgroundColor: "#ececec",
          position: "fixed",
          bottom: 56,
          width: "100%",
          padding: 8,
          // marginTop: 16,
          // marginBottom: 56 + 16,
        }}
      >
        <Paper
          style={{
            width: "100%",
            display: "flex",
            elevation: 0,
          }}
        >
          <BetInput />
          <Box
            style={{
              flex: 1,
              backgroundColor: "#ececec",
            }}
          ></Box>
          <OddEvenTabs />
        </Paper>
      </Box>
    </>
  );
}

export default App;

// export const Experience = () => {
//   return (
//     <>
//       <OrbitControls />
//       <Root backgroundColor="red" sizeX={2} sizeY={1} flexDirection="row">
//         <Container flexGrow={1} margin={48} backgroundColor="green" />
//         <Container flexGrow={1} margin={48} backgroundColor="blue" />
//       </Root>
//       <mesh>
//         <boxGeometry />
//         <meshNormalMaterial />
//       </mesh>
//     </>
//   );
// };
