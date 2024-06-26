import "./style.css?url";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.jsx";
import { KeyboardControls } from "@react-three/drei";
// import Interface from "./Interface.jsx";
import TouchControls from "./TouchControls.jsx";
import { Leva } from "leva";

export default function App() {
  return (
    <>
      <Leva collapsed hidden={false} />
      <KeyboardControls
        map={[
          { name: "forward", keys: ["ArrowUp", "KeyW"] },
          { name: "backward", keys: ["ArrowDown", "KeyS"] },
          { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
          { name: "rightward", keys: ["ArrowRight", "KeyD"] },
          { name: "jump", keys: ["Space"] },
        ]}
      >
        <TouchControls />
        <Canvas
          flat
          shadows
          camera={{
            fov: 25,
            near: 0.1,
            far: 200,
            position: [0, 4, 6],
          }}
        >
          <Experience />
        </Canvas>
        
      </KeyboardControls>
    </>
  );
}
