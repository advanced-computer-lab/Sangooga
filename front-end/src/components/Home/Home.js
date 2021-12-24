import React, { useState, useEffect } from "react";
import Search from "../Search/Search";
import "./Home.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import axios from "axios";

const Home = () => {
  const fakeBook = async () => {
    const departureData = {
      reservationNumber: Math.random() * 100000000000000000,
      flight: 555564,
      user: window.localStorage.getItem("userId"),
      departurePrice: 250,
    };

    const returnData = {
      reservationNumber: Math.random() * 100000000000000000,
      flight: 555565,
      user: window.localStorage.getItem("userId"),
      departurePrice: 250,
    };

    const checkoutSession = await axios.post(
      "http://localhost:5000/payment/createCheckoutSession",
      { departureData, returnData },
      {
        headers: { Authorization: window.localStorage.getItem("token") },
      }
    );
    window.location = checkoutSession.data.url;
  };

  return (
    <div className="home">
      <div className="search-container">
        <Search isAdmin={false} />
      </div>
      <Grid container spacing={2} className="cardGrid">
        <Grid item xs={6}>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="https://www.gannett-cdn.com/presto/2021/07/07/USAT/ff8de4c6-f511-4a14-99a7-78dbe6869c74-GettyImages-1131890997.jpg?width=660&height=277&fit=crop&format=pjpg&auto=webp"
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Italy
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="https://www.gannett-cdn.com/presto/2021/07/07/USAT/ff8de4c6-f511-4a14-99a7-78dbe6869c74-GettyImages-1131890997.jpg?width=660&height=277&fit=crop&format=pjpg&auto=webp"
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Italy
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="https://www.gannett-cdn.com/presto/2021/07/07/USAT/ff8de4c6-f511-4a14-99a7-78dbe6869c74-GettyImages-1131890997.jpg?width=660&height=277&fit=crop&format=pjpg&auto=webp"
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Italy
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="https://www.gannett-cdn.com/presto/2021/07/07/USAT/ff8de4c6-f511-4a14-99a7-78dbe6869c74-GettyImages-1131890997.jpg?width=660&height=277&fit=crop&format=pjpg&auto=webp"
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Italy
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Button onClick={fakeBook}>Fake Book Flight </Button>
      </Grid>
    </div>
  );
};

export default Home;
