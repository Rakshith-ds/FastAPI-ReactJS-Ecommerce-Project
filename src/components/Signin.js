import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import api from "../api/link";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const defaultTheme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();
  const { setAuthToken } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formdata = new URLSearchParams();
    formdata.append("username", data.get("email"));
    formdata.append("password", data.get("password"));

    try {
      const request = await api.post("/token/", formdata, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      if (request.status === 200) {
        setAuthToken(request.data.access_token);
        localStorage.setItem("authToken", request.data.access_token);
        localStorage.setItem("userid", request.data.user_id);
        navigate("/landingpage");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          alert("Bad Request: Invalid input or missing required parameters.");
        } else if (error.response.status === 401) {
          alert("Unauthorized: Invalid credentials.");
        } else {
          alert(`Error: ${error.response.statusText}`);
        }
      } else if (error.request) {
        alert("No response received from server. Please try again later.");
      } else {
        alert("Error: " + error.message);
      }
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
