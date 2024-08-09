import React, { useState } from "react";
import {
  Box,
  Divider,
  FormControl,
  MenuItem,
  Paper,
  Typography,
  Select,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Rating,
  Pagination,
  Tooltip,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../redux/cartSlice";
import api from "../api/link";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const TruncatedTitleTypography = styled(Typography)({
  display: "-webkit-box",
  overflow: "hidden",
  fontSize: 17,
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 1, // Limit to 1 line
});

const Products = ({ selectedPage }) => {
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const rowsPerPage = 10; // Number of items per page

  const dispatch = useDispatch();
  const fulldata = useSelector((state) => state.products.items);

  const addToCartHandler = async (data) => {
    const user_id = localStorage.getItem("userid");
    try {
      await api.post(
        "/cart/",
        {
          user_id,
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

  const sortProducts = (order, products) => {
    return products.slice().sort((a, b) => {
      if (order === "asc") return a.price - b.price;
      return b.price - a.price;
    });
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const paginatedData = sortProducts(sortOrder, fulldata).slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <Grid container spacing={2} sx={{ padding: "16px" }}>
      <Grid item xs={12} sm={3} md={2}>
        <Sidebar />
      </Grid>
      <Grid item xs={12} sm={9} md={10}>
        <Paper sx={{ padding: "8px 16px" }}>
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
                onChange={handleSortChange}
                sx={{ height: "35px" }}
              >
                <MenuItem value="asc">Price: Low to High</MenuItem>
                <MenuItem value="desc">Price: High to Low</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Divider />
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {paginatedData.map((data) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                key={data.id}
                sx={{ marginTop: "10px" }}
              >
                <Card sx={{ maxWidth: 345 }}>
                  <Link
                    to={`/landingpage/${selectedPage}/${data.id}`}
                    className="adjust-font"
                  >
                    <CardMedia
                      sx={{ height: 225 }}
                      image={data.image_url}
                      title={data.title}
                    />
                  </Link>
                  <CardContent>
                    <TruncatedTitleTypography
                      gutterBottom
                      variant="h6"
                      component="div"
                    >
                      <Tooltip title={data.title} placement="top" arrow>
                        <Typography>{data.title}</Typography>
                      </Tooltip>
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
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4, mb: 2 }}>
            <Pagination
              count={Math.ceil(fulldata.length / rowsPerPage)}
              page={page}
              onChange={handleChangePage}
              shape="rounded"
            />
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Products;
