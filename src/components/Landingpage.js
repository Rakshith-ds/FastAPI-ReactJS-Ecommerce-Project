import React, { useState, useEffect, useCallback } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar1 from "./Navbar1";
import Navbar2 from "./Navbar2";
import { Stack, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import Products from "../components/Products";
import { useDispatch } from "react-redux";
import { getProducts } from "../redux/productSlice";
import api from "../api/link";

export default function Landingpage() {
  const [mode, setMode] = useState("light");
  const [selectedPage, setSelectedPage] = useState("All");

  const dispatch = useDispatch();
  const location = useLocation();
  const isCartPage = location.pathname === "/landingpage/cart";

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });

  const fetchProducts = useCallback(
    async (selectedPage) => {
      try {
        const response = await api.get("/products/", {
          params: { category: selectedPage },
        });
        dispatch(getProducts(response.data));
      } catch (error) {
        console.error("Error fetching products data:", error);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    fetchProducts(selectedPage);
  }, [fetchProducts, selectedPage]);

  return (
    <ThemeProvider theme={darkTheme}>
      <React.Fragment>
        <Navbar1 mode={mode} setMode={setMode} />
        <Navbar2 setSelectedPage={setSelectedPage} />
        <Stack direction="row" gap={2} sx={{ marginTop: "20px" }}>
          {!isCartPage && <Products selectedPage={selectedPage} />}
          {isCartPage && <Outlet />}
        </Stack>
      </React.Fragment>
    </ThemeProvider>
  );
}
