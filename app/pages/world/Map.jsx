import { RigidBody } from "@react-three/rapier";
import { useControls } from "leva";

import { Tent } from "./Stylized_tent";
import { Suspense } from "react";

import { Oolong } from "./Oolong";

export default function Floor({ size = 10 }) {
  const settings = useControls("floor", {
    color: { value: "#2a2a2a" },
  });

  return (
    <>
      <RigidBody type="fixed">
        {/* <mesh scale={[size, 1, size]} position-y={-0.5} receiveShadow>
          <boxGeometry args={[1, 1, 5]} />
          <meshLambertMaterial dithering color={settings.color} />
        </mesh> */}
      </RigidBody>

     
        <Suspense fallback={null}>
          {/* <Tent scale={0.015} position-y={1.5} /> */}
          {/* <Oolong scale={0.5} position-z={-55} /> */}
          <Oolong scale={3} position-z={-3} position-y={-3}  />
        </Suspense>
      
    </>
  );
}
