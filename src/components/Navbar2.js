import React, { useState } from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";

const pages = [
  "All",
  "Electronics",
  "Furniture",
  "Shoes",
  "Miscellaneous",
  "Home Decoration",
  "Fashion",
  "Beauty Product",
  "Clothes",
];

function Navbar2({ setSelectedPage }) {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [selectedPage, setSelectedPageLocal] = useState("All"); // State to track selected page

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleMenuItemClick = (page) => {
    setSelectedPageLocal(page);
    setSelectedPage(page); // Update parent component's state
    handleCloseNavMenu(); // Close the menu on mobile view
  };

  return (
    <React.Fragment>
      <AppBar
        position="sticky"
        sx={{
          top: "64px", // Position below the first navbar
          left: 0,
          width: "100%",
          zIndex: 1199, // Ensure it is below the first navbar
          backgroundColor: "black",
        }}
      >
        <Container maxWidth="xl" sx={{ height: "50px" }}>
          <Toolbar
            disableGutters
            sx={{ height: "50px !important", minHeight: "50px !important" }}
          >
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem
                    key={page}
                    onClick={() => handleMenuItemClick(page)}
                  >
                    <Typography
                      textAlign="center"
                      component={Link}
                      to={"/landingpage/" + page.split(" ").join("")}
                      sx={{
                        textDecoration: "none",
                        color: "inherit",
                      }}
                    >
                      {page}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  component={Link}
                  to={"/landingpage/" + page.split(" ").join("")}
                  onClick={() => handleMenuItemClick(page)}
                  sx={{
                    my: 2,
                    color: selectedPage === page ? "yellow" : "white", // Highlight selected button
                    display: "block",
                    textDecoration: "none",
                  }}
                >
                  {page}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </React.Fragment>
  );
}

export default Navbar2;
