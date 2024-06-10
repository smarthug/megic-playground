import { Canvas } from "@react-three/fiber";
import { Experience } from "../pages/dice";


import { useRef } from "react";



function App() {
  const container = useRef();
  return (
    <div ref={container} style={{ width: "100vw", height: "100vh" }}>
      <Canvas shadows camera={{ position: [3, 3, 3], fov: 30 }}>
        <color attach="background" args={["#ececec"]} />
        <Experience container={container} />
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
