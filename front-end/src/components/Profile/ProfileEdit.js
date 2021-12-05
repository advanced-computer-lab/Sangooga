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

const ProfileEdit = () => {
  const navigate = useNavigate();
  const userId = window.localStorage.getItem("userID");

  const [userData, setUserData] = useState([]);

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
  console.log(userData);
  const [profileData, setProfileData] = useState({
    firstname: userData.firstname,
    lastname: userData.lastname,
    email: userData.email,
    passport: userData.passport,
  });
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
          label="firstname"
          fullWidth
          value={profileData.firstname}
          onChange={(e) => {
            setProfileData({ ...profileData, firstname: e.target.value });
          }}
        />
        <Divider sx={{ mb: 2 }} variant="fullwidth" />
        <Typography sx={{ fontWeight: "bold", mb: 1 }} variant="h6">
          Last name:
        </Typography>
        <TextField
          sx={{ mb: 1 }}
          name="lastname"
          label="lastname"
          fullWidth
          value={profileData.lastname}
          onChange={(e) => {
            setProfileData({ ...profileData, lastname: e.target.value });
          }}
        />
        <Divider sx={{ mb: 2 }} variant="fullwidth" />
        <Typography sx={{ fontWeight: "bold", mb: 1 }} variant="h6">
          Email:
        </Typography>
        <TextField
          sx={{ mb: 1 }}
          name="email"
          label="email"
          fullWidth
          value={profileData.email}
          onChange={(e) => {
            setProfileData({ ...profileData, email: e.target.value });
          }}
        />
        <Divider sx={{ mb: 2 }} variant="fullwidth" />
        <Typography sx={{ fontWeight: "bold", mb: 1 }} variant="h6">
          passport:
        </Typography>
        <TextField
          sx={{ mb: 1 }}
          name="passport"
          label="passport"
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
            color="success"
          >
            Confirm <SendIcon sx={{ ml: 1, fontSize: "medium" }} />
          </Button>
        </Link>
      </form>
    </Paper>
  );
};

export default ProfileEdit;
