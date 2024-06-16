import DrawerAppBar from "../components/mui/DrawerAppBar";
import BottomNav from "../components/mui/BottomNav";

import { Box, Container } from "@mui/material";
import { styled } from "@mui/system";
import { Outlet } from "@remix-run/react";

const RootContainer = styled(Container)({
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden",
  padding: 0,
});

const ContentBox = styled(Box)({
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
//   backgroundColor: "lightblue",
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
        <Outlet />
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
