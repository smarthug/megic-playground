import { RigidBody } from "@react-three/rapier";
import { useControls } from "leva";

import { Tent } from "./Stylized_tent";
import { Suspense } from "react";

import { Oolong } from "./Oolong";

import { QuestionBlock } from "./QuestionBlock";

import Pomodoro from "./Pomodoro";

export default function Floor({ size = 10 }) {

  const { animation, timeScale } = useControls({
    animation: {
      value: 'idle',
      options: [
        'idle',
        'idleattack',
        'idlecarryitem',
        'jump',
        'run',
        'runattack',
        'runcarryitem',
        'walk',
        'walkattack',
        'walkcarryitem',
      ],
    },
    timeScale: {
      value: 0.7,
      min: 0,
      max: 1,
      step: 0.1,
    },
    axie: {
      value: 'buba',
      options: ['pomodoro', 'puffy'],
    },
  })
  
  const settings = useControls("floor", {
    color: { value: "#2a2a2a" },
  });

  function randomBoolean() {
    return Math.random() < 0.5;
  }

  const random = randomBoolean();

  return (
    <>
      {/* <RigidBody type="fixed">
        <mesh scale={[size, 1, size]} position-y={-0.5} receiveShadow>
          <boxGeometry args={[1, 1, 5]} />
          <meshLambertMaterial dithering color={settings.color} />
        </mesh>
      </RigidBody> */}

      {/* <mesh scale={[size, 1, size]} position-y={-3 } receiveShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshLambertMaterial dithering  />
      </mesh> */}

      <Suspense fallback={null}>
        {/* <Tent scale={0.015} position-y={1.5} /> */}
        {/* <Oolong scale={0.5} position-z={-55} /> */}
        <Oolong scale={3} position-z={-9} position-y={-3} />
        {/* <QuestionBlock scale={0.5} position-z={-9} position-y={-3} /> */}
      </Suspense>
      {/* <QuestionBlock pos={[0, 0, 0]} mushroom={random} /> */}
      <QuestionBlock pos={[0, 0, 0]} mushroom={false} />
      <Pomodoro
        animation={animation.toString()}
        outline={{ color: 'black', opacity: 1, thickness: 0.03 }}
        position={[-2, 0, 0]}
        timeScale={timeScale}
      />
    </>
  );
}
