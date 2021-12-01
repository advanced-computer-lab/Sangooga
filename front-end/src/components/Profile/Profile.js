import { useState, useEffect } from "react";
import { Typography, Paper } from "@mui/material";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    const result = await axios.get(`http://localhost:5000/user/loggedUser`, {
      headers: {
        Authorization: window.localStorage.getItem("token"),
      },
    });
    console.log(result);
    setUser(result);
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <Paper
        elevation={16}
        sx={{
          p: 6,
          width: "50%",
          height: "100%",
          mx: "auto",
        }}
      >
        <Typography>{user}</Typography>
      </Paper>
    </div>
  );
};

export default Profile;
