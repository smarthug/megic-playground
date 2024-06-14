import { Canvas } from "@react-three/fiber";
// import { Experience } from "./components/Experience";
import { Experience } from "../pages/uikit";
// import { OrbitControls } from "@react-three/drei";
// import { Fullscreen, Container } from '@react-three/uikit'

// export const Experience = () => {
//   return (
//     <>
//       <OrbitControls />
//       <Fullscreen flexDirection="row" padding={0} gap={0}>
//         <Container
//           flexGrow={1}
//           backgroundOpacity={0.5}
//           hover={{ backgroundOpacity: 1 }}
//           backgroundColor="red"
//         />
//         <Container
//           flexGrow={1}
//           backgroundOpacity={0.5}
//           hover={{ backgroundOpacity: 1 }}
//           backgroundColor="blue"
//         />
//       </Fullscreen>
//       <mesh>
//         <boxGeometry />
//         <meshNormalMaterial />
//       </mesh>
//     </>
//   );
// };

function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas shadows camera={{ position: [0, 25, 25], fov: 45 }}>
        <color attach="background" args={["#ececec"]} />
        <Experience />
      </Canvas>
    </div>
  );
}

export default App;

// #root {
//     width: 100vw;
//     height: 100vh;
//   }

//   body {
//     margin: 0;
//   }
