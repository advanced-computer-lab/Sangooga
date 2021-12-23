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
import Profile from "./Profile";

const ProfileEdit = ({ userData }) => {
  const [profileData, setProfileData] = useState({
    firstname: userData.firstname,
    lastname: userData.lastname,
    email: userData.email,
    passport: userData.passport,
  });
  console.log(profileData);
  const updateProfile = async () => {
    await axios.patch(`http://localhost:5000/user/${userData._id}`, {
      firstname: profileData.firstname,
      lastname: profileData.lastname,
      email: profileData.email,
      passport: profileData.passport,
    });
  };
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
      <form>
        <Typography sx={{ fontWeight: "bold", mb: 2 }} variant="h3">
          {userData.username}
        </Typography>
        <Typography sx={{ fontWeight: "bold", mb: 1 }} variant="h6">
          First name:
        </Typography>
        <TextField
          sx={{ mb: 1 }}
          name="firstname"
          fullWidth
          value={profileData.firstname}
          onChange={(e) => {
            setProfileData({ ...profileData, firstname: e.target.value });
          }}
        />

        <Typography sx={{ fontWeight: "bold", mb: 1 }} variant="h6">
          Last name:
        </Typography>
        <TextField
          sx={{ mb: 1 }}
          name="lastname"
          fullWidth
          value={profileData.lastname}
          onChange={(e) => {
            setProfileData({ ...profileData, lastname: e.target.value });
          }}
        />

        <Typography sx={{ fontWeight: "bold", mb: 1 }} variant="h6">
          Email:
        </Typography>
        <TextField
          sx={{ mb: 1 }}
          name="email"
          fullWidth
          value={profileData.email}
          onChange={(e) => {
            setProfileData({ ...profileData, email: e.target.value });
          }}
        />

        <Typography sx={{ fontWeight: "bold", mb: 1 }} variant="h6">
          passport:
        </Typography>
        <TextField
          sx={{ mb: 1 }}
          name="passport"
          fullWidth
          value={profileData.passport}
          onChange={(e) => {
            setProfileData({ ...profileData, passport: e.target.value });
          }}
        />
        <Link to="/profile">
          <Button
            sx={{ mt: 2 }}
            variant="contained"
            fullWidth
            onClick={updateProfile()}
          >
            Confirm <SendIcon sx={{ ml: 1, fontSize: "medium" }} />
          </Button>
        </Link>
      </form>
    </Paper>
  );
};

export default ProfileEdit;
