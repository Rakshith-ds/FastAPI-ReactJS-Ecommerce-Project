import { Button } from "@mui/material";
import React, { useState } from "react";
import api from "../api/link";
import { useAuth } from "./AuthContext";

const Pricing = () => {
  const [price, setPrice] = useState([]);
  const { authToken } = useAuth();

  const handleButton = async () => {
    try {
      if (!authToken) {
        throw new Error("No access token found");
      }

      const request = await api.get("/users/me/", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        credentials: "include",
      });

      setPrice(request.data);
    } catch (error) {
      console.error("Error fetching pricing data:", error);
      // Handle error appropriately (e.g., show a message to the user)
    }
  };

  return (
    <React.Fragment>
      <Button onClick={handleButton}>Click</Button>
      <div>{JSON.stringify(price, null, 2)}</div>
    </React.Fragment>
  );
};

export default Pricing;
