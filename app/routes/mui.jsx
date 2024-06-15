import { Canvas } from "@react-three/fiber";
// import { Experience } from "./components/Experience";

import { OrbitControls } from "@react-three/drei";

import DrawerAppBar from "../components/mui/DrawerAppBar";
import BottomNav from "../components/mui/BottomNav";

import { Box, Container } from "@mui/material";
import { styled } from "@mui/system";

const RootContainer = styled(Container)({
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden",
});

const ContentBox = styled(Box)({
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

// export const Experience = () => {
//   return (
//     <>
//       <OrbitControls />
//       <mesh>
//         <boxGeometry />
//         <meshNormalMaterial />
//       </mesh>
//     </>
//   );
// };

function App() {
  return (
    <RootContainer>
      <DrawerAppBar />
      <ContentBox>
        {/* 여기에 콘텐츠를 추가하세요 */}
        <h1>Full Screen Content</h1>
      </ContentBox>
      <BottomNav />
    </RootContainer>
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
