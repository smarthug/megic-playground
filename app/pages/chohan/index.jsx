import { useEffect, useState } from "react";
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

function TextOnCard() {
  const firstDice = useDiceStore((state) => state.firstDice);
  const secondDice = useDiceStore((state) => state.secondDice);

  const isYourGuessOdd = useDiceStore((state) => state.isYourGuessOdd);

  const isFirstDiceRolling = useDiceStore((state) => state.isFirstDiceRolling);
  const isSecondDiceRolling = useDiceStore(
    (state) => state.isSecondDiceRolling
  );
  const isRolling = isFirstDiceRolling || isSecondDiceRolling;

  const getOddEven = (sum) => (sum % 2 === 0 ? "Even" : "Odd");

  useEffect(() => {
    if (isFirstDiceRolling || isSecondDiceRolling) return;
    if (isYourGuessOdd) {
      if ((firstDice + secondDice) % 2 === 0) {
        console.log("You lose!");
      } else {
        console.log("You win!");
      }
    } else {
      if ((firstDice + secondDice) % 2 === 0) {
        console.log("You win!");
      } else {
        console.log("You lose!");
      }
    }
  }, [isFirstDiceRolling, isSecondDiceRolling]);
  return (
    <Card
      borderRadius={32}
      padding={32}
      gap={8}
      flexDirection="column"
      alignItems={"center"}
      width={250}
    >
      <Text fontSize={32}>
        {isRolling ? "Rolling..." : getOddEven(firstDice + secondDice)}
        {/* {(firstDice + secondDice) % 2 === 0 ? "Even" : "Odd"} */}
      </Text>
      <Text fontSize={24} opacity={0.7}>
        {isRolling
          ? ""
          : `${firstDice}+${secondDice}=${firstDice + secondDice}`}
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

function OddEvenTabs() {
  const setIsYourGuessOdd = useDiceStore((state) => state.setIsYourGuessOdd);
  function onActiveChange(value) {
    console.log(value);
    setIsYourGuessOdd(value === "1");
  }
  return (
    <Tabs onValueChange={onActiveChange} defaultValue="2">
      <TabsButton value="1">
        <Text>Odd</Text>
      </TabsButton>
      <TabsButton value="2">
        <Text>Even</Text>
      </TabsButton>
    </Tabs>
  );
}

function Test() {
  console.log("test");
}

export const Experience = () => {
  return (
    <>
      <OrbitControls maxPolarAngle={Math.PI / 2} />
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
          <Container>
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
          >
            <Container justifyContent={"center"} flexGrow={1}>
              <InputsOnCard />
            </Container>
            <Container justifyContent={"center"} flexGrow={1}>
              <OddEvenTabs />
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
