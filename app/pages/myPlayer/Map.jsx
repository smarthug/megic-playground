import { RigidBody } from "@react-three/rapier";
import { useControls } from "leva";

export default function Floor({ size = 50 }) {
  const settings = useControls("floor", {
    color: { value: "#2a2a2a" },
  });

  return (
    <RigidBody type="fixed">
      <mesh scale={[size, 1, size]} position-y={-0.5} receiveShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshLambertMaterial dithering color={settings.color} />
      </mesh>
    </RigidBody>
  );
}
