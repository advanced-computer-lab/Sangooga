import { useState } from "react";
import {
  Typography,
  Paper,
  Divider,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
const ProfileEditPass = ({ userData }) => {
  const navigate = useNavigate();
  const [passError, setError] = useState(false);
  const [passData, setPassData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const updatePass = async (e) => {
    try {
      e.preventDefault();
      await axios.patch(`http://localhost:5000/user/profile/${userData._id}`, {
        oldPassword: passData.oldPassword,
        newPassword: passData.newPassword,
      });
      navigate("/profile");
    } catch (err) {
      setError(true);
    }
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
      <form onSubmit={updatePass}>
        <Typography sx={{ fontWeight: "bold", mb: 2 }} variant="h3">
          {userData.username}
        </Typography>
        <Typography sx={{ fontWeight: "bold", mb: 1 }} variant="h6">
          Old Password
        </Typography>
        {passError ? (
          <TextField
            error
            sx={{ mb: 1 }}
            name="oldPassword"
            fullWidth
            type="password"
            value={passData.oldPassword}
            helperText="Incorrect password"
            onChange={(e) => {
              setPassData({ ...passData, oldPassword: e.target.value });
            }}
          />
        ) : (
          <TextField
            sx={{ mb: 1 }}
            name="oldPassword"
            fullWidth
            type="password"
            value={passData.oldPassword}
            onChange={(e) => {
              setPassData({ ...passData, oldPassword: e.target.value });
            }}
          />
        )}
        <Typography sx={{ fontWeight: "bold", mb: 1 }} variant="h6">
          New password
        </Typography>
        {passError ? (
          <TextField
            sx={{ mb: 1 }}
            name="newPassword"
            fullWidth
            type="password"
            value={passData.newPassword}
            onChange={(e) => {
              setPassData({ ...passData, newPassword: e.target.value });
            }}
          />
        ) : (
          <TextField
            sx={{ mb: 1 }}
            name="newPassword"
            fullWidth
            type="password"
            value={passData.newPassword}
            onChange={(e) => {
              setPassData({ ...passData, newPassword: e.target.value });
            }}
          />
        )}

        <Button sx={{ mt: 2 }} variant="contained" fullWidth type="submit">
          Confirm <SendIcon sx={{ ml: 1, fontSize: "medium" }} />
        </Button>
      </form>
    </Paper>
  );
};

export default ProfileEditPass;
