import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar1 from "./Navbar1";
import Navbar2 from "./Navbar2";
import Sidebar from "./Sidebar";
import { Stack, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";

export default function Landingpage() {
  const [mode, setMode] = useState("light");
  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });

  const location = useLocation();
  const isCartPage = location.pathname === "/landingpage/Cart";

  return (
    <ThemeProvider theme={darkTheme}>
      <React.Fragment>
        <Navbar1 mode={mode} setMode={setMode} />
        <Navbar2 mode={mode} setMode={setMode} />
        <Stack direction="row" gap={2} sx={{ marginTop: "20px" }}>
          {!isCartPage && <Sidebar />}
          <Outlet />
        </Stack>
      </React.Fragment>
    </ThemeProvider>
  );
}
