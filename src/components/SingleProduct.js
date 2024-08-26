import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api/link";
import {
  Typography,
  Box,
  Paper,
  Grid,
  Button,
  Card,
  CardMedia,
  CardContent,
  Tooltip,
  Rating,
  styled,
} from "@mui/material";
import { addItemToCart } from "../redux/cartSlice";
import { useDispatch } from "react-redux";

const TruncatedTitleTypography = styled(Typography)({
  display: "-webkit-box",
  overflow: "hidden",
  fontSize: 17,
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 1, // Limit to 1 line
});

const SingleProduct = () => {
  const { category, productId } = useParams(); // Get the productId from the URL
  const [product, setProduct] = useState(null);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  // Fetch recommendations based on the product title
  useEffect(() => {
    if (product) {
      const fetchRecommendations = async () => {
        try {
          const response = await api.get(`/recommend/${product.title}`);
          setRecommendedProducts(response.data);
        } catch (error) {
          console.error("Error fetching recommendations:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchRecommendations();
      document.title = product.title;
    }
  }, [product]);

  if (!product) {
    return <div>Loading...</div>;
  }

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

  return (
    <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
      <Grid container spacing={4}>
        {/* Image Section */}
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src={product.image_url}
            alt={product.title}
            sx={{
              width: "75%",
              height: "90%",
              borderRadius: 2,
              boxShadow: 2,
            }}
          />
        </Grid>

        {/* Product Details Section */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" component="h2" gutterBottom>
            {product.title}
          </Typography>
          <Typography variant="h5" color="primary" gutterBottom>
            Price: ${product.price}
          </Typography>
          <Typography variant="body1" sx={{ marginTop: 2 }}>
            {product.description}
          </Typography>

          <Box sx={{ marginTop: 4 }}>
            <Button
              variant="contained"
              color="primary"
              sx={{ marginRight: 2 }}
              onClick={() => addToCartHandler(product)}
            >
              Add to Cart
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Box sx={{ marginTop: 6 }}>
        <Typography variant="h5" component="h3" gutterBottom>
          Recommended Products
        </Typography>

        <Grid container spacing={4}>
          {recommendedProducts.length === 0 ? (
            <Grid item variant="body1" xs={12} sm={6} md={3}>
              <Typography variant="h5" component="h3">
                Loading...
              </Typography>
            </Grid>
          ) : (
            recommendedProducts.map((data) => (
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
                    to={`/landingpage/${category}/${data.id}`}
                    className="adjust-font"
                    underline="none"
                  >
                    <CardMedia
                      sx={{ height: 225 }}
                      image={data.image_url}
                      title={data.title}
                    />

                    <CardContent>
                      <TruncatedTitleTypography
                        gutterBottom
                        variant="h6"
                        component="div"
                      >
                        <Tooltip title={data.title} placement="top-start" arrow>
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
                      <Button
                        size="small"
                        onClick={() => addToCartHandler(data)}
                      >
                        Add to cart
                      </Button>
                    </CardContent>
                  </Link>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Box>
    </Paper>
  );
};

export default SingleProduct;
