
import FolderIcon from "@mui/icons-material/Folder";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PublicIcon from '@mui/icons-material/Public';

import SportsEsportsIcon from '@mui/icons-material/SportsEsports';

import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

import StorefrontIcon from '@mui/icons-material/Storefront';

import { useState } from "react";
import { Paper,BottomNavigation,BottomNavigationAction } from "@mui/material";

export default function LabelBottomNavigation() {
  const [value, setValue] = useState("recents");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation showLabels={false} value={value} onChange={handleChange}>
        <BottomNavigationAction
          label="Shop"
          value="shop"
          icon={<StorefrontIcon />}
        />
        <BottomNavigationAction
          label="World"
          value="world"
          icon={<PublicIcon />}
        />
        {/* <BottomNavigationAction
          label="Casino"
          value="casino"
          icon={<MonetizationOnIcon />}
        /> */}
         <BottomNavigationAction
          label="Game"
          value="game"
          icon={<SportsEsportsIcon />}
        />
      </BottomNavigation>
    </Paper>
  );
}
