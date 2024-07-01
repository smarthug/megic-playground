import DrawerAppBar from "../components/mui/DrawerAppBar";
import BottomNav from "../components/mui/BottomNav";

import { Box } from "@mui/material";
import { styled } from "@mui/system";
import { Outlet } from "@remix-run/react";
import { useEffect } from "react";
import { useMegicStore } from "../utils/useMegicStore";

// const RootContainer = styled(Container)({
//   height: "100vh",
//   display: "flex",
//   flexDirection: "column",
//   justifyContent: "center",
//   alignItems: "center",
//   overflow: "hidden",
//   padding: 0,
// });

const RootContainer = styled(Box)({
  height: "100dvh",
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
  flexDirection: "column",
  overflow: "hidden",
//   backgroundColor: "lightblue",

marginTop: "56px",
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

  useEffect(() => {
    const prevPoints = localStorage.getItem("megicPoints") || 1000;
    useMegicStore.setState({ megicPoints: prevPoints });

    const hasCrown = localStorage.getItem("hasCrown") || false;
    useMegicStore.setState({ hasCrown: hasCrown });
  }, []);
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
