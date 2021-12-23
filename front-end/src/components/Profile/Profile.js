import { useState, useEffect } from "react";
import {
  Typography,
  Paper,
  Divider,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import SendIcon from "@mui/icons-material/Send";

import SettingsIcon from "@mui/icons-material/Settings";
import ProfileEdit from "./ProfileEdit";

const Profile = ({ userData }) => {
  const navigate = useNavigate();

  // const editButton = () => {
  //   setEdit((current) => !current);
  //   console.log(edit);
  // };

  return (
    <Paper
      elevation={16}
      sx={{
        p: 6,
        width: "50%",
        height: "100%",
        mx: "auto",
        mb: 5,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={6} sm={10}>
          <Typography sx={{ fontWeight: "bold", mb: 2 }} variant="h3">
            {userData.username}
          </Typography>
        </Grid>
        <Grid item xs={6} sm={2}>
          <Link to="/profileEditPass">
            <Button sx={{ pl: 2, mt: 2 }}>
              <SettingsIcon sx={{ ml: 1, fontSize: "medium" }} />
            </Button>
          </Link>
        </Grid>
      </Grid>

      <Typography sx={{ fontWeight: "bold", mb: 1 }} variant="h6">
        First name:
      </Typography>
      <Typography variant="h6" sx={{ fontFamily: "Monospace" }}>
        {userData.firstname}
      </Typography>
      <Divider sx={{ mb: 2 }} variant="fullwidth" />
      <Typography sx={{ fontWeight: "bold", mb: 1 }} variant="h6">
        Last name:
      </Typography>
      <Typography variant="h6" sx={{ fontFamily: "Monospace" }}>
        {userData.lastname}
      </Typography>
      <Divider sx={{ mb: 2 }} variant="fullwidth" />
      <Typography sx={{ fontWeight: "bold", mb: 1 }} variant="h6">
        Email:
      </Typography>
      <Typography variant="h6" sx={{ fontFamily: "Monospace" }}>
        {userData.email}
      </Typography>
      <Divider sx={{ mb: 2 }} variant="fullwidth" />
      <Typography sx={{ fontWeight: "bold", mb: 1 }} variant="h6">
        passport:
      </Typography>
      <Typography variant="h6" sx={{ fontFamily: "Monospace" }}>
        {userData.passport}
      </Typography>
      <Link to="/profileEdit">
        <Button sx={{ pl: 2, mt: 2 }} fullWidth variant="contained">
          Edit <EditIcon sx={{ ml: 1, fontSize: "medium" }} />
        </Button>
      </Link>
    </Paper>
  );
};

export default Profile;
