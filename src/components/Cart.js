import { useDispatch } from "react-redux";
import { removeItemFromCart } from "../redux/cartSlice";
import { Box, Divider, Paper, Stack, Typography, styled } from "@mui/material";
import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Rating from "@mui/material/Rating";
import api from "../api/link";
import { useCallback } from "react";

const Cart = () => {
  const [totalQuantity, setTotalQuantity] = React.useState(0);
  const [totalPrice, setTotalPrice] = React.useState(0);
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = React.useState([]);

  const fetchCartItems = useCallback(async () => {
    try {
      const response = await api.get("/cart/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setCartItems(response.data.cart_items);
      setTotalPrice(response.data.total_price);
      setTotalQuantity(response.data.quantity);
    } catch (error) {
      console.error("Error fetching cart items", error);
    }
  }, []);

  const removeFromCartHandler = useCallback(
    async (id) => {
      try {
        const response = await api.delete(`/cart/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        dispatch(removeItemFromCart(id));

        if (response.status === 200) {
          // Fetch the updated cart data after deleting the item
          fetchCartItems();
        } else {
          console.error("Failed to remove item from the database");
        }
      } catch (error) {
        console.error("Error removing item from the cart:", error);
      }
    },
    [dispatch, fetchCartItems]
  );

  const TruncatedTitleTypography = styled(Typography)(({ theme }) => ({
    display: "-webkit-box",
    overflow: "hidden",
    fontSize: 17,
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 1, // Limit to 3 lines
  }));

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" }, // Ensure column direction on small screens
        justifyContent: "space-between",
        alignItems: { xs: "flex-start", md: "stretch" },
        width: "100%",
        gap: 2, // Add gap between the two main boxes
      }}
    >
      <Box sx={{ flexGrow: 1, minWidth: { xs: "100%", md: "60%" } }}>
        <Typography variant="h6">Shopping Cart</Typography>
        <Divider sx={{ marginBottom: "30px" }} />
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          sx={{ width: "100% !important", marginTop: "10px" }}
        >
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <Grid item xs={12} key={item.id}>
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                  }}
                >
                  <CardMedia
                    sx={{ width: { xs: "100%", sm: "20%" } }}
                    image={item.images}
                    title={item.title}
                  />
                  <CardContent
                    sx={{ width: "100%", padding: "7px 30px 10px 25px" }}
                  >
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography gutterBottom variant="h5" component="div">
                        {item.title}
                      </Typography>

                      <Typography gutterBottom variant="h6" component="div">
                        ${item.price}
                      </Typography>
                    </Stack>
                    <Divider />
                    <Box>
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
                        Quantity: {item.quantity}
                      </TruncatedTitleTypography>
                      <Button
                        size="small"
                        onClick={() => removeFromCartHandler(item.id)}
                      >
                        Delete Item
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "200px", // Adjust height as needed
                width: "100%",
              }}
            >
              <Typography>No items in the cart</Typography>
            </Box>
          )}
        </Grid>
      </Box>
      <Box
        sx={{
          flexGrow: 0,
          minWidth: { xs: "100%", md: "30%" },
          padding: "20px",
          backgroundColor: "background.paper", // Ensure it stands out
          borderRadius: 1,
        }}
      >
        <Paper sx={{ padding: 3 }}>
          <Typography sx={{ mb: 2 }}>
            Subtotal ({totalQuantity < 1 ? 0 : totalQuantity} items): $
            {totalPrice < 1 ? 0 : totalPrice}
          </Typography>
          <Button variant="contained" fullWidth>
            Proceed to checkout
          </Button>
        </Paper>
      </Box>
    </Box>
  );
};

export default Cart;
