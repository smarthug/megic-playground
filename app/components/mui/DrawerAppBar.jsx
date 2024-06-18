import * as React from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  Menu,
  MenuItem,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
const drawerWidth = 240;
// const navItems = ['Home', 'About', 'Contact'];

function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MEGIC
      </Typography>
      <Divider />
      <List>
        <ListItem key={"discord"} disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <ListItemText primary={"discord"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    // setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem onClick={handleMenuClose}>Inventory</MenuItem>
    </Menu>
  );

  return (
    <>
      <CssBaseline />
      <AppBar color="primary" component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            // sx={{ mr: 2, display: { sm: "none" } }}
            sx={{ mr: 2}}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "block", sm: "block" } }}
          >
            {/* MEGIC */}
          </Typography>
          {/* <Box sx={{ display: { xs: "none", sm: "block" } }}></Box> */}

          {/* <Box sx={{ flexGrow: 1 }} /> */}
          <Box sx={{ flexGrow: 1 }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              //   onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <AttachMoneyIcon />
              <Typography variant="body1" component="span" sx={{ flexGrow: 1 }}>
                100,000,000
              </Typography>
            </IconButton>
          </Box>

          <Box sx={{ display: { xs: "flex", md: "flex" } }}>
            {/* <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </>
  );
}

export default DrawerAppBar;

{
  /* <Box component="main" sx={{ p: 0 }}>
        <Toolbar
         style={{
            backgroundColor: 'blue',
        }}
        />
          <div 
            style={{
                backgroundColor: 'red',
            }}
          >
            hello
          </div>
      </Box> */
}
