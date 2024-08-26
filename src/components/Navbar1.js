import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Link } from "react-router-dom";
import { Badge, alpha, styled, useTheme } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchIcon from "@mui/icons-material/Search";
import api from "../api/link";
import { useEffect, useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cartQuantityUpdateOnLogin } from "../redux/cartSlice";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import data_json from "../data/data";
import { useNavigate } from "react-router-dom";

const settings = ["Profile", "Account", "Dashboard", "Logout"];

function Navbar1() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [fulldata, setFullData] = useState(data_json);
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const theme = useTheme(); // Access the theme object

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleUserMenuClick = (settings) => {
    if (settings === "Logout") {
      localStorage.clear();
      window.location.href = "/landingpage/login";
    }
  };

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -1,
      top: 5,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }));

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const Quantity = useSelector((state) => state.cart.totalQuantity);

  const fetchCartItems = useCallback(async () => {
    try {
      const response = await api.get("/cart/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      dispatch(cartQuantityUpdateOnLogin(JSON.stringify(response.data)));
    } catch (error) {
      console.error("Error fetching cart items", error);
      alert("Session expired");
      Navigate("/signin");
    }
  }, [dispatch, Navigate]);

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <React.Fragment>
      <AppBar
        position="sticky"
        // position="fixed"
        sx={{
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 1200, // Higher z-index to ensure it's above the second navbar
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/landingpage/products"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                color: "inherit",
                textDecoration: "none",
              }}
            >
              EcommerceCart
            </Typography>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <Autocomplete
                  freeSolo
                  // value={inputValue}
                  // onChange={(event, newValue) => {
                  //   setInputValue(newValue);
                  // }}
                  options={fulldata.map((option) => ({
                    title: option.title,
                    id: option.id,
                  }))}
                  getOptionLabel={(option) => option.title || ""}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Search…"
                      inputProps={{
                        ...params.inputProps,
                        "aria-label": "search",
                      }}
                    />
                  )}
                  sx={{
                    width: "100%",
                    "& .MuiInputBase-root": {
                      padding: "1px 1px 1px 0",
                      paddingLeft: `calc(1em + ${theme.spacing(4)})`, // Use theme here
                      transition: theme.transitions.create("width"),
                      width: "100%",
                      [theme.breakpoints.up("md")]: {
                        width: "50ch",
                      },
                    },
                  }}
                />
              </Search>
            </Box>
            <Box sx={{ flexGrow: 1 }} />

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px", paddingTop: "0px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => handleUserMenuClick(setting)}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  ml: 2,
                  marginTop: "3px",
                }}
              >
                <IconButton
                  aria-label="cart"
                  sx={{ color: "white" }}
                  component={Link}
                  to="/landingpage/cart"
                >
                  <StyledBadge
                    badgeContent={Quantity < 1 ? 0 : Quantity}
                    color="secondary"
                    showZero
                  >
                    <ShoppingCartOutlinedIcon />
                  </StyledBadge>
                </IconButton>
                <Typography sx={{ ml: 1 }}>Cart</Typography>
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </React.Fragment>
  );
}
export default Navbar1;
