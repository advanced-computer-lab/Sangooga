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

const ProfileSetting = ({ userData }) => {
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
      <Typography sx={{ fontWeight: "bold", mb: 1 }} variant="h6">
        User Name:
      </Typography>
      <Typography variant="h6" sx={{ fontFamily: "Monospace" }}>
        {userData.username}
      </Typography>
      <Divider sx={{ mb: 2 }} variant="fullwidth" />
      <Typography sx={{ fontWeight: "bold", mb: 1 }} variant="h6">
        password
      </Typography>
      <Typography variant="h6" sx={{ fontFamily: "Monospace" }}>
        {userData.password}
      </Typography>
      <Link to="/profileEdit">
        <Button sx={{ pl: 2, mt: 2 }} fullWidth variant="contained">
          Edit
        </Button>
      </Link>
    </Paper>
  );
};

export default ProfileSetting;
