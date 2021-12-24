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
import axios from "axios";
import SettingsIcon from "@mui/icons-material/Settings";
import ProfileEdit from "./ProfileEdit";

const Profile = ({ userData, setUserData }) => {
  const [userId, setUserId] = useState(window.localStorage.getItem("userId"));
  const navigate = useNavigate();
  const getUserData = async () => {
    const result = await axios.get(`http://localhost:5000/user/${userId}`, {
      headers: {
        Authorization: window.localStorage.getItem("token"),
      },
    });

    setUserData(result.data);
  };
  useEffect(() => {
    getUserData();
  }, []);
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
        <Grid item xs={10} sm={10}>
          <Typography sx={{ fontWeight: "bold", mb: 2 }} variant="h3">
            {userData.username}
          </Typography>
        </Grid>
        <Grid item xs={2} sm={2}></Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6} sm={6}>
          <Typography sx={{ fontWeight: "bold", mb: 1 }} variant="h6">
            First name:
          </Typography>
          <Typography variant="h6" sx={{ fontFamily: "Monospace" }}>
            {userData.firstname}
          </Typography>
          <Divider sx={{ mb: 2 }} />
        </Grid>
        <Grid item xs={6} sm={6}>
          <Typography sx={{ fontWeight: "bold", mb: 1 }} variant="h6">
            Last name:
          </Typography>
          <Typography variant="h6" sx={{ fontFamily: "Monospace" }}>
            {userData.lastname}
          </Typography>
          <Divider sx={{ mb: 2 }} />
        </Grid>
      </Grid>

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
      <Divider sx={{ mb: 2 }} variant="fullwidth" />
      <Typography sx={{ fontWeight: "bold", mb: 1 }} variant="h6">
        phone Number:
      </Typography>
      <Typography variant="h6" sx={{ fontFamily: "Monospace" }}>
        {userData.phone}
      </Typography>
      <Divider sx={{ mb: 2 }} variant="fullwidth" />
      <Grid container spacing={2}>
        <Grid item xs={6} sm={6}>
          <Typography sx={{ fontWeight: "bold", mb: 1 }} variant="h6">
            Address:
          </Typography>
          <Typography variant="h6" sx={{ fontFamily: "Monospace" }}>
            {userData.address}
          </Typography>

          <Divider sx={{ mb: 2 }} />
        </Grid>
        <Grid item xs={6} sm={6}>
          <Typography sx={{ fontWeight: "bold", mb: 1 }} variant="h6">
            Country Code:
          </Typography>
          <Typography variant="h6" sx={{ fontFamily: "Monospace" }}>
            {userData.countryCode}
          </Typography>
          <Divider sx={{ mb: 2 }} />
        </Grid>
      </Grid>

      <Link to="/profileEdit">
        <Button sx={{ pl: 2, mt: 2 }} fullWidth variant="contained">
          Edit Profile <EditIcon sx={{ ml: 1, fontSize: "medium" }} />
        </Button>
      </Link>
      <Link to="/profileEditPass">
        <Button sx={{ pl: 2, mt: 2 }} variant="outlined" fullWidth>
          change Password?
        </Button>
      </Link>
    </Paper>
  );
};

export default Profile;
