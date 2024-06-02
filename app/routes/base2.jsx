import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";

function RouletteWheel() {
  const wheelRef = useRef();
  const [spinning, setSpinning] = useState(false);

  useFrame(() => {
    if (spinning) {
      wheelRef.current.rotation.z += 0.1;
    }
  });

  const handleSpinClick = () => {
    setSpinning(true);
    setTimeout(() => setSpinning(false), 3000); // Spin for 3 seconds
  };

  return (
    <>
      <mesh ref={wheelRef} position={[0, 0, 0]}>
        <cylinderGeometry args={[5, 5, 1, 32]} />
        <meshStandardMaterial color="green" />
        <meshStandardMaterial color="white" />
      </mesh>
      <mesh position={[0, 5.5, 0]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color="white" />
      </mesh>

      {/* <Html>
        <button
          style={{
            position: "absolute",
            top: "20px",
            left: "20px",
            padding: "10px",
            fontSize: "16px",
          }}
          onClick={handleSpinClick}
        >
          Spin
        </button>
      </Html> */}
    </>
  );
}

function App() {
  return (
    <>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <RouletteWheel />
        <OrbitControls />
      </Canvas>
    </>
  );
}

export default App;
