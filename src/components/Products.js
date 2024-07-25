import {
  Box,
  Divider,
  FormControl,
  MenuItem,
  Paper,
  Select,
  Typography,
  styled,
} from "@mui/material";
import React, { useEffect } from "react";
import data_json from "../data/data";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Rating from "@mui/material/Rating";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../redux/cartSlice";
import api from "../api/link";

const Products = () => {
  const [fulldata, setFullData] = useState(data_json);
  const [sortOrder, setSortOrder] = useState("asc");
  const dispatch = useDispatch();

  const TruncatedTitleTypography = styled(Typography)(({ theme }) => ({
    display: "-webkit-box",
    overflow: "hidden",
    fontSize: 17,
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 1, // Limit to 3 lines
  }));

  const addToCartHandler = async (data) => {
    const user_id = localStorage.getItem("userid");
    try {
      const response = await api.post(
        "/cart/",
        {
          user_id: user_id, // Replace with the actual user ID
          product_id: data.id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      dispatch(addItemToCart(data));
    } catch (error) {
      console.error("Error adding item to cart", error);
    }
  };

  useEffect(() => {
    // Sort function
    const sortProducts = (order) => {
      const sortedData = [...fulldata].sort((a, b) => {
        if (order === "asc") {
          return a.price - b.price;
        } else {
          return b.price - a.price;
        }
      });
      setFullData(sortedData);
    };
    sortProducts(sortOrder);
  }, [sortOrder, fulldata]);

  return (
    <Paper sx={{ padding: "8px 16px", flex: "9" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Typography variant="h5">Products</Typography>
        <FormControl sx={{ mb: 2, minWidth: 120 }}>
          <Select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            sx={{ height: "35px" }}
          >
            <MenuItem value={"asc"}>Price: Low to High</MenuItem>
            <MenuItem value={"desc"}>Price: High to Low</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Divider />
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {fulldata.map((data) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            key={data.id}
            sx={{ marginTop: "10px" }}
          >
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                sx={{ height: 225 }}
                image={data.images}
                title={data.title}
              />
              <CardContent>
                <TruncatedTitleTypography
                  gutterBottom
                  variant="h6"
                  component="div"
                >
                  {data.title}
                </TruncatedTitleTypography>

                <Rating
                  name="read-only"
                  value={3}
                  readOnly
                  sx={{ marginRight: "auto" }}
                />

                <TruncatedTitleTypography
                  gutterBottom
                  variant="h6"
                  component="div"
                >
                  ${data.price}
                </TruncatedTitleTypography>

                <Button size="small" onClick={() => addToCartHandler(data)}>
                  Add to cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Paper>
    // </React.Fragment>
  );
};

export default Products;
