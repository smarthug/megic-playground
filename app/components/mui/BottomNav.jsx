import PublicIcon from "@mui/icons-material/Public";

import SportsEsportsIcon from "@mui/icons-material/SportsEsports";

// import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

import StorefrontIcon from "@mui/icons-material/Storefront";

import { useState } from "react";
import { Paper, BottomNavigation, BottomNavigationAction } from "@mui/material";

import { useNavigate, useLocation } from "@remix-run/react";

export default function LabelBottomNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  // Get the current path to set the value
  const currentPath = location.pathname;

  // Determine the value based on the current path
  let initialValue;
  switch (currentPath) {
    case "/world":
      initialValue = "0";
      break;
    case "/game":
      initialValue = "1";
      break;
    case "/shop":
      initialValue = "2";
      break;
    default:
      initialValue = "1";
      break;
  }

  const [value, setValue] = useState(initialValue);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    switch (newValue) {
      case "0":
        navigate("/world");
        break;
      case "1":
        navigate("/game");
        break;
      case "2":
        navigate("/shop");
        break;
      default:
        break;
    }
  };

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation
        showLabels={false}
        value={`${value}`}
        onChange={handleChange}
      >
       
        <BottomNavigationAction label="World" value="0" icon={<PublicIcon />} />
        {/* <BottomNavigationAction
          label="Casino"
          value="casino"
          icon={<MonetizationOnIcon />}
        /> */}
        <BottomNavigationAction
          label="Game"
          value="1"
          icon={<SportsEsportsIcon />}
        />
         <BottomNavigationAction
          label="Shop"
          value="2"
          icon={<StorefrontIcon />}
        />
      </BottomNavigation>
    </Paper>
  );
}
