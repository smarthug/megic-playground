import * as CANNON from "cannon-es";

import * as THREE from "three";
import * as BufferGeometryUtils from "three/addons/utils/BufferGeometryUtils.js";

import { OrbitControls } from "@react-three/drei";
import { useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";

import { useDiceStore } from "./useDiceStore";

// const canvasEl = document.querySelector('#canvas');
// const scoreResult = document.querySelector('#score-result');
// const rollBtn = document.querySelector('#roll-btn');

let renderer, scene, camera, diceMesh, physicsWorld;

const params = {
  numberOfDice: 2,
  segments: 40,
  edgeRadius: 0.07,
  notchRadius: 0.12,
  notchDepth: 0.1,
};

// const diceArray = [];

// initPhysics();
// initScene();

// window.addEventListener('resize', updateSceneSize);
// window.addEventListener('dblclick', throwDice);
// rollBtn.addEventListener('click', throwDice);

export const DiceGame = ({ container }) => {
  const three = useThree();
  // renderer, scene, camera
  renderer = three.gl;
  scene = three.scene;
  camera = three.camera;
  // containerEl = container.current;

  useEffect(() => {
    initPhysics();
    //   const ambientLight = new THREE.AmbientLight(0xffffff, .5);
    //   scene.add(ambientLight);
    //   const topLight = new THREE.PointLight(0xffffff, .5);
    //   topLight.position.set(10, 15, 0);
    //   topLight.castShadow = true;
    //   topLight.shadow.mapSize.width = 2048;
    //   topLight.shadow.mapSize.height = 2048;
    //   topLight.shadow.camera.near = 5;
    //   topLight.shadow.camera.far = 400;
    //   scene.add(topLight);

    useDiceStore.setState({ diceArray: [] });
    const diceArray = useDiceStore.getState().diceArray;

    createFloor();
    createWalls();
    diceMesh = createDiceMesh();
    for (let i = 0; i < params.numberOfDice; i++) {
      diceArray.push(createDice());
      addDiceEvents(diceArray[i], i);
    }

    // throwDice();

    //   window.addEventListener('dblclick', throwDice);

    return () => {
      // cleanup
      // window.removeEventListener('dblclick', throwDice);
    };
  }, []);

  useFrame(() => {
    physicsWorld.fixedStep();
    const diceArray = useDiceStore.getState().diceArray;
    for (const dice of diceArray) {
      dice.mesh.position.copy(dice.body.position);
      dice.mesh.quaternion.copy(dice.body.quaternion);
    }
  });

  return (
    <>
      <ambientLight color={0xffffff} intensity={1} />
      <pointLight
        color={0xffffff}
        intensity={1000}
        position={[10, 20, 5]}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
    </>
  );
};

// function initScene() {

//     renderer = new THREE.WebGLRenderer({
//         alpha: true,
//         antialias: true,
//         canvas: canvasEl
//     });
//     renderer.shadowMap.enabled = true
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

//     scene = new THREE.Scene();

//     camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .1, 300)
//     camera.position.set(0, .5, 4).multiplyScalar(7);

//     updateSceneSize();

//     const ambientLight = new THREE.AmbientLight(0xffffff, .5);
//     scene.add(ambientLight);
//     const topLight = new THREE.PointLight(0xffffff, .5);
//     topLight.position.set(10, 15, 0);
//     topLight.castShadow = true;
//     topLight.shadow.mapSize.width = 2048;
//     topLight.shadow.mapSize.height = 2048;
//     topLight.shadow.camera.near = 5;
//     topLight.shadow.camera.far = 400;
//     scene.add(topLight);

//     createFloor();
//     diceMesh = createDiceMesh();
//     for (let i = 0; i < params.numberOfDice; i++) {
//         diceArray.push(createDice());
//         addDiceEvents(diceArray[i]);
//     }

//     throwDice();

//     render();
// }

function initPhysics() {
  physicsWorld = new CANNON.World({
    allowSleep: true,
    gravity: new CANNON.Vec3(0, -50, 0),
  });
  physicsWorld.defaultContactMaterial.restitution = 0.3;
}

function createFloor() {
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(1000, 1000),
    new THREE.ShadowMaterial({
      opacity: 0.1,
    })
  );
  floor.receiveShadow = true;
  // floor.position.y = -7;
  floor.quaternion.setFromAxisAngle(new THREE.Vector3(-1, 0, 0), Math.PI * 0.5);
  scene.add(floor);

  const floorBody = new CANNON.Body({
    type: CANNON.Body.STATIC,
    shape: new CANNON.Plane(),
  });
  floorBody.position.copy(floor.position);
  floorBody.quaternion.copy(floor.quaternion);
  physicsWorld.addBody(floorBody);
}


function createWall(position, rotation) {
  const wallWidth =8;
  const wallHeight = 3;
  const wallThickness = .1;

  // Three.js 벽 생성
  const wallGeometry = new THREE.BoxGeometry(wallWidth, wallHeight, wallThickness);
  const wallMaterial = new THREE.MeshStandardMaterial({ color: 0x888888 });
  // 금색 재질 설정
const goldMaterial = new THREE.MeshStandardMaterial({
  color: 0xffd700, // 금색
  metalness: 0.5, // 금속성
  roughness: 0.2 // 거칠기 (0에 가까울수록 반사가 강함)
});
  const wall = new THREE.Mesh(wallGeometry, goldMaterial);
  wall.position.copy(position);
  wall.rotation.copy(rotation);
  wall.receiveShadow = true;
  scene.add(wall);

  // Cannon-es 벽 생성
  const wallShape = new CANNON.Box(new CANNON.Vec3(wallWidth / 2, wallHeight / 2, wallThickness / 2));
  const wallBody = new CANNON.Body({ mass: 0 }); // static
  wallBody.addShape(wallShape);
  wallBody.position.copy(wall.position);
  wallBody.quaternion.copy(wall.quaternion);
  physicsWorld.addBody(wallBody);
}

function createWalls() {
  const halfSize = 4; // 바닥의 반 크기
  const wallThickness = 10;

  const wallHeight = 3;
  // 벽 위치와 회전 설정
  const positions = [
    new THREE.Vector3(0, wallHeight/2, halfSize), // 앞쪽 벽
    new THREE.Vector3(0, wallHeight/2, -halfSize), // 뒤쪽 벽
    new THREE.Vector3(halfSize, wallHeight/2, 0), // 오른쪽 벽
    new THREE.Vector3(-halfSize, wallHeight/2, 0) // 왼쪽 벽
  ];
  const rotations = [
    new THREE.Euler(0, 0, 0), // 앞쪽 벽
    new THREE.Euler(0, Math.PI, 0), // 뒤쪽 벽
    new THREE.Euler(0, Math.PI / 2, 0), // 오른쪽 벽
    new THREE.Euler(0, -Math.PI / 2, 0) // 왼쪽 벽
  ];

  // const mat1 = new CANNON.Material()

  // 각 벽 생성
  positions.forEach((position, index) => {
    createWall(position, rotations[index]);
  });

  // const mat1_ground = new CANNON.ContactMaterial(groundMaterial, mat1, { friction: 0.0, restitution: 0.0 })
}

function createDiceMesh() {
  const boxMaterialOuter = new THREE.MeshStandardMaterial({
    color: 0xeeeeee,
  });
  const boxMaterialInner = new THREE.MeshStandardMaterial({
    color: 0x000000,
    roughness: 0,
    metalness: 1,
    side: THREE.DoubleSide,
  });

  const diceMesh = new THREE.Group();
  const innerMesh = new THREE.Mesh(createInnerGeometry(), boxMaterialInner);
  const outerMesh = new THREE.Mesh(createBoxGeometry(), boxMaterialOuter);
  outerMesh.castShadow = true;
  diceMesh.add(innerMesh, outerMesh);

  return diceMesh;
}

function createDice() {
  const mesh = diceMesh.clone();
  scene.add(mesh);

  const body = new CANNON.Body({
    mass: 1,
    shape: new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5)),
    sleepTimeLimit: 0.1,
  });
  physicsWorld.addBody(body);

  return { mesh, body };
}

function createBoxGeometry() {
  let boxGeometry = new THREE.BoxGeometry(
    1,
    1,
    1,
    params.segments,
    params.segments,
    params.segments
  );

  const positionAttr = boxGeometry.attributes.position;
  const subCubeHalfSize = 0.5 - params.edgeRadius;

  for (let i = 0; i < positionAttr.count; i++) {
    let position = new THREE.Vector3().fromBufferAttribute(positionAttr, i);

    const subCube = new THREE.Vector3(
      Math.sign(position.x),
      Math.sign(position.y),
      Math.sign(position.z)
    ).multiplyScalar(subCubeHalfSize);
    const addition = new THREE.Vector3().subVectors(position, subCube);

    if (
      Math.abs(position.x) > subCubeHalfSize &&
      Math.abs(position.y) > subCubeHalfSize &&
      Math.abs(position.z) > subCubeHalfSize
    ) {
      addition.normalize().multiplyScalar(params.edgeRadius);
      position = subCube.add(addition);
    } else if (
      Math.abs(position.x) > subCubeHalfSize &&
      Math.abs(position.y) > subCubeHalfSize
    ) {
      addition.z = 0;
      addition.normalize().multiplyScalar(params.edgeRadius);
      position.x = subCube.x + addition.x;
      position.y = subCube.y + addition.y;
    } else if (
      Math.abs(position.x) > subCubeHalfSize &&
      Math.abs(position.z) > subCubeHalfSize
    ) {
      addition.y = 0;
      addition.normalize().multiplyScalar(params.edgeRadius);
      position.x = subCube.x + addition.x;
      position.z = subCube.z + addition.z;
    } else if (
      Math.abs(position.y) > subCubeHalfSize &&
      Math.abs(position.z) > subCubeHalfSize
    ) {
      addition.x = 0;
      addition.normalize().multiplyScalar(params.edgeRadius);
      position.y = subCube.y + addition.y;
      position.z = subCube.z + addition.z;
    }

    const notchWave = (v) => {
      v = (1 / params.notchRadius) * v;
      v = Math.PI * Math.max(-1, Math.min(1, v));
      return params.notchDepth * (Math.cos(v) + 1);
    };
    const notch = (pos) => notchWave(pos[0]) * notchWave(pos[1]);

    const offset = 0.23;

    if (position.y === 0.5) {
      position.y -= notch([position.x, position.z]);
    } else if (position.x === 0.5) {
      position.x -= notch([position.y + offset, position.z + offset]);
      position.x -= notch([position.y - offset, position.z - offset]);
    } else if (position.z === 0.5) {
      position.z -= notch([position.x - offset, position.y + offset]);
      position.z -= notch([position.x, position.y]);
      position.z -= notch([position.x + offset, position.y - offset]);
    } else if (position.z === -0.5) {
      position.z += notch([position.x + offset, position.y + offset]);
      position.z += notch([position.x + offset, position.y - offset]);
      position.z += notch([position.x - offset, position.y + offset]);
      position.z += notch([position.x - offset, position.y - offset]);
    } else if (position.x === -0.5) {
      position.x += notch([position.y + offset, position.z + offset]);
      position.x += notch([position.y + offset, position.z - offset]);
      position.x += notch([position.y, position.z]);
      position.x += notch([position.y - offset, position.z + offset]);
      position.x += notch([position.y - offset, position.z - offset]);
    } else if (position.y === -0.5) {
      position.y += notch([position.x + offset, position.z + offset]);
      position.y += notch([position.x + offset, position.z]);
      position.y += notch([position.x + offset, position.z - offset]);
      position.y += notch([position.x - offset, position.z + offset]);
      position.y += notch([position.x - offset, position.z]);
      position.y += notch([position.x - offset, position.z - offset]);
    }

    positionAttr.setXYZ(i, position.x, position.y, position.z);
  }

  boxGeometry.deleteAttribute("normal");
  boxGeometry.deleteAttribute("uv");
  boxGeometry = BufferGeometryUtils.mergeVertices(boxGeometry);

  boxGeometry.computeVertexNormals();

  return boxGeometry;
}

function createInnerGeometry() {
  const baseGeometry = new THREE.PlaneGeometry(
    1 - 2 * params.edgeRadius,
    1 - 2 * params.edgeRadius
  );
  const offset = 0.48;
  return BufferGeometryUtils.mergeGeometries(
    [
      baseGeometry.clone().translate(0, 0, offset),
      baseGeometry.clone().translate(0, 0, -offset),
      baseGeometry
        .clone()
        .rotateX(0.5 * Math.PI)
        .translate(0, -offset, 0),
      baseGeometry
        .clone()
        .rotateX(0.5 * Math.PI)
        .translate(0, offset, 0),
      baseGeometry
        .clone()
        .rotateY(0.5 * Math.PI)
        .translate(-offset, 0, 0),
      baseGeometry
        .clone()
        .rotateY(0.5 * Math.PI)
        .translate(offset, 0, 0),
    ],
    false
  );
}

function addDiceEvents(dice, i) {
  dice.body.addEventListener("sleep", (e) => {
    dice.body.allowSleep = false;

    const euler = new CANNON.Vec3();
    e.target.quaternion.toEuler(euler);

    const eps = 0.1;
    let isZero = (angle) => Math.abs(angle) < eps;
    let isHalfPi = (angle) => Math.abs(angle - 0.5 * Math.PI) < eps;
    let isMinusHalfPi = (angle) => Math.abs(0.5 * Math.PI + angle) < eps;
    let isPiOrMinusPi = (angle) =>
      Math.abs(Math.PI - angle) < eps || Math.abs(Math.PI + angle) < eps;

    if (isZero(euler.z)) {
      if (isZero(euler.x)) {
        showRollResults(1, i);
      } else if (isHalfPi(euler.x)) {
        showRollResults(4, i);
      } else if (isMinusHalfPi(euler.x)) {
        showRollResults(3, i);
      } else if (isPiOrMinusPi(euler.x)) {
        showRollResults(6, i);
      } else {
        // landed on edge => wait to fall on side and fire the event again
        dice.body.allowSleep = true;
      }
    } else if (isHalfPi(euler.z)) {
      showRollResults(2, i);
    } else if (isMinusHalfPi(euler.z)) {
      showRollResults(5, i);
    } else {
      // landed on edge => wait to fall on side and fire the event again
      dice.body.allowSleep = true;
    }
  });
}

function showRollResults(score, i) {
  // if (scoreResult.innerHTML === '') {
  //     scoreResult.innerHTML += score;
  // } else {
  //     scoreResult.innerHTML += ('+' + score);
  // }
  console.log(score, i);
  if (i === 0) {
    // useDiceStore.getState().setFirstDice(score);
    useDiceStore.setState({ firstDice: score });
    useDiceStore.setState({ isFirstDiceRolling: false });
  } else {
    // useDiceStore.getState().setSecondDice(score);
    useDiceStore.setState({ secondDice: score });
    useDiceStore.setState({ isSecondDiceRolling: false });
  }
}

// function render() {
//     physicsWorld.fixedStep();

//     for (const dice of diceArray) {
//         dice.mesh.position.copy(dice.body.position)
//         dice.mesh.quaternion.copy(dice.body.quaternion)
//     }

//     renderer.render(scene, camera);
//     requestAnimationFrame(render);
// }

function updateSceneSize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

export function throwDice() {
  const diceArray = useDiceStore.getState().diceArray;
  // scoreResult.innerHTML = '';
  useDiceStore.setState({ isFirstDiceRolling: true });
  useDiceStore.setState({ isSecondDiceRolling: true });
  diceArray.forEach((d, dIdx) => {
    d.body.velocity.setZero();
    d.body.angularVelocity.setZero();

    d.body.position = new CANNON.Vec3(4, dIdx *3 + 4, 0);
    // d.body.position = new CANNON.Vec3(3, dIdx * 6, 0);
    d.mesh.position.copy(d.body.position);

    d.mesh.rotation.set(
      2 * Math.PI * Math.random(),
      0,
      2 * Math.PI * Math.random()
    );
    d.body.quaternion.copy(d.mesh.quaternion);

    const force = 3 + 5 * Math.random();
    d.body.applyImpulse(
      new CANNON.Vec3(-force, force, 0),
      new CANNON.Vec3(0, 0, 0.2)
    );

    d.body.allowSleep = true;
  });
}
