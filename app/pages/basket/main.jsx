import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import Experience from "./Experience";
import Interface from "./Interface";
import "/fonts/Basketball.otf";
import "./index.css?url";

// const debug = /[?&]debug=/.test(window.location.search);
const debug = false

export default function App() {
  return (
    <>
      <Leva hidden={!debug} />
      <Interface />
      <Canvas dpr={[1, 2]} camera={{ position: [-15, 15, 15], fov: 55 }}>
        <Experience />
      </Canvas>
    </>
  );
}
