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
import Flights from "../Flights/Flights";

const Home = () => {
  const [firstSearch, setFirstSearch] = useState(false);
  const [flightsReserved, setFlightReserved] = useState([]);
  return (
    <div className="home-page">
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
                Venice
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Venice, the capital of northern Italy’s Veneto region, is built
                on more than 100 small islands in a lagoon in the Adriatic Sea.
                It has no roads, just canals – including the Grand Canal
                thoroughfare – lined with Renaissance and Gothic palaces. The
                central square, Piazza San Marco, contains St. Mark’s Basilica,
                which is tiled with Byzantine mosaics, and the Campanile bell
                tower offering views of the city’s red roofs.
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
              image="https://lp-cms-production.imgix.net/2021-08/shutterstockRF_108818438.jpg?auto=format&fit=crop&sharp=10&vib=20&ixlib=react-8.6.4&w=850"
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Paris
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Paris, France's capital, is a major European city and a global
                center for art, fashion, gastronomy and culture. Its
                19th-century cityscape is crisscrossed by wide boulevards and
                the River Seine. Beyond such landmarks as the Eiffel Tower and
                the 12th-century, Gothic Notre-Dame cathedral, the city is known
                for its cafe culture and designer boutiques along the Rue du
                Faubourg Saint-Honoré.
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
              image="https://ychef.files.bbci.co.uk/976x549/p07zy3y6.jpg"
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Cairo
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Cairo, Egypt’s sprawling capital, is set on the Nile River. At
                its heart is Tahrir Square and the vast Egyptian Museum, a trove
                of antiquities including royal mummies and gilded King
                Tutankhamun artifacts. Nearby, Giza is the site of the iconic
                pyramids and Great Sphinx, dating to the 26th century BC. In
                Gezira Island’s leafy Zamalek district, 187m Cairo Tower affords
                panoramic city views.
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
              image="https://www.history.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTYyNDg1MjE3MTI1Mjc5Mzk4/topic-london-gettyimages-760251843-promo.jpg"
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                London
              </Typography>
              <Typography variant="body2" color="text.secondary">
                London, the capital of England and the United Kingdom, is a
                21st-century city with history stretching back to Roman times.
                At its centre stand the imposing Houses of Parliament, the
                iconic ‘Big Ben’ clock tower and Westminster Abbey, site of
                British monarch coronations. Across the Thames River, the London
                Eye observation wheel provides panoramic views of the South Bank
                cultural complex, and the entire city.
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
              image="http://cdn.mos.cms.futurecdn.net/s4wH4PzdvnsQYb6b57YN7f.jpg"
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Istanbul
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Istanbul is a major city in Turkey that straddles Europe and
                Asia across the Bosphorus Strait. Its Old City reflects cultural
                influences of the many empires that once ruled here. In the
                Sultanahmet district, the open-air, Roman-era Hippodrome was for
                centuries the site of chariot races, and Egyptian obelisks also
                remain. The iconic Byzantine Hagia Sophia features a soaring
                6th-century dome and rare Christian mosaics.
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
              image="https://img.static-af.com/images/meta/IDname/CITY-BCN-1?aspect_ratio=1:1&max_width=1280"
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Barcelona
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Barcelona, the cosmopolitan capital of Spain’s Catalonia region,
                is known for its art and architecture. The fantastical Sagrada
                Família church and other modernist landmarks designed by Antoni
                Gaudí dot the city. Museu Picasso and Fundació Joan Miró feature
                modern art by their namesakes. City history museum MUHBA,
                includes several Roman archaeological sites.
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
              image="https://media.istockphoto.com/photos/aerial-view-of-tokyo-cityscape-with-fuji-mountain-in-japan-picture-id1131743616?k=20&m=1131743616&s=612x612&w=0&h=5IzvPM791pd7-TFIB16zl1-CHgcqOBFLbQ9U1d6cUw8="
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Tokyo
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Tokyo, Japan’s busy capital, mixes the ultramodern and the
                traditional, from neon-lit skyscrapers to historic temples. The
                opulent Meiji Shinto Shrine is known for its towering gate and
                surrounding woods. The Imperial Palace sits amid large public
                gardens. The city's many museums offer exhibits ranging from
                classical art (in the Tokyo National Museum) to a reconstructed
                kabuki theater (in the Edo-Tokyo Museum).
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
              image="https://nypost.com/wp-content/uploads/sites/2/2018/08/ny-least-free-state.jpg?quality=90&strip=all"
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                New York
              </Typography>
              <Typography variant="body2" color="text.secondary">
                New York City comprises 5 boroughs sitting where the Hudson
                River meets the Atlantic Ocean. At its core is Manhattan, a
                densely populated borough that’s among the world’s major
                commercial, financial and cultural centers. Its iconic sites
                include skyscrapers such as the Empire State Building and
                sprawling Central Park. Broadway theater is staged in neon-lit
                Times Square.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
      {firstSearch && <Flights flightsReserved={flightsReserved} />}
    </div>
  );
};

export default Home;
