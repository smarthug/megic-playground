import { Canvas } from "@react-three/fiber";
// import { Experience } from "./components/Experience";

import { OrbitControls } from "@react-three/drei";  

import BottomNav from '../components/mui/BottomNav';

export const Experience = () => {
  return (
    <>
      <OrbitControls />
      <mesh>
        <boxGeometry />
        <meshNormalMaterial />
      </mesh>
    </>
  );
};

function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
        <BottomNav />
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
