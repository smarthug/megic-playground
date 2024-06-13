import { OrbitControls } from "@react-three/drei";
import { Fullscreen, Container, Root } from "@react-three/uikit";

import { Text } from "@react-three/uikit";
import { Card } from "../../components/apfel/card";

function TextOnCard() {
  return (
    <Card borderRadius={32} padding={32} gap={8} flexDirection="column">
      <Text fontSize={32}>Hello World!</Text>
      <Text fontSize={24} opacity={0.7}>
        This is the apfel kit.
      </Text>
    </Card>
  );
}

export const Experience = () => {
  return (
    <>
      <OrbitControls />
      <Fullscreen flexDirection="column" padding={0} gap={0}>
        <Container
            justifyContent={"center"}
            // alignItems={"center"}
        >
          <TextOnCard />
        </Container>
      </Fullscreen>
      <mesh>
        <boxGeometry />
        <meshNormalMaterial />
      </mesh>
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
