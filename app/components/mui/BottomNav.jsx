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
  console.log(currentPath);

  // Determine the value based on the current path
  let initialValue;
  switch (currentPath) {
    case "/shop":
      initialValue = "0";
      break;
    case "/world":
      initialValue = "1";
      break;
    case "/game":
      initialValue = "2";
      break;
    default:
      initialValue = "2";
      break;
  }

  const [value, setValue] = useState(initialValue);
  console.log(value);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    switch (newValue) {
      case "0":
        navigate("/shop");
        break;
      case "1":
        navigate("/world");
        break;
      case "2":
        navigate("/game");
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
        <BottomNavigationAction
          label="Shop"
          value="0"
          icon={<StorefrontIcon />}
        />
        <BottomNavigationAction label="World" value="1" icon={<PublicIcon />} />
        {/* <BottomNavigationAction
          label="Casino"
          value="casino"
          icon={<MonetizationOnIcon />}
        /> */}
        <BottomNavigationAction
          label="Game"
          value="2"
          icon={<SportsEsportsIcon />}
        />
      </BottomNavigation>
    </Paper>
  );
}
