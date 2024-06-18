import { RigidBody } from "@react-three/rapier";
import { useControls } from "leva";

import { Tent } from "./Stylized_tent";

export default function Floor({ size = 10 }) {
  const settings = useControls("floor", {
    color: { value: "#2a2a2a" },
  });

  return (
    <RigidBody type="fixed">
      <mesh scale={[size, 1, size]} position-y={-0.5} receiveShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshLambertMaterial dithering color={settings.color} />
      </mesh>

      <Tent scale={0.015} position-y={1.5} />
    </RigidBody>
  );
}
