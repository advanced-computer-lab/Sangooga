import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { Typography, Grid } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { textAlign } from "@mui/system";

const Register = ({ setAuthenticated, setTokenData }) => {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    username: "",
    password: "",
    firstname: "",
    lastname: "",
    email: "",
    passport: "",
    address: "",
    countryCode: "",
    phone: "",
  });

  const registerUser = async (e) => {
    e.preventDefault();

    const user = await axios.post("http://localhost:5000/user/register", {
      username: registerData.username,
      password: registerData.password,
      firstname: registerData.firstname,
      lastname: registerData.lastname,
      email: registerData.email,
      passport: registerData.passport,
      address: registerData.address,
      countryCode: registerData.countryCode,
      phone: registerData.phone,
    });
    window.localStorage.setItem("token", user.data.token);
    window.localStorage.setItem("userId", user.data._doc._id);
    setAuthenticated(true);
    navigate("/");
  };
  return (
    <div className="registerForm">
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
        <Typography
          sx={{ fontWeight: "bold", mb: 2, textAlign: "center" }}
          variant="h4"
        >
          Creat account
        </Typography>
        <form onSubmit={registerUser}>
          <Typography sx={{ fontWeight: "bold", mb: 1 }} variant="h6">
            Username
          </Typography>
          <TextField
            sx={{ mb: 4 }}
            type="text"
            name="username"
            //label="username"
            fullWidth
            value={registerData.username}
            onChange={(e) =>
              setRegisterData({ ...registerData, username: e.target.value })
            }
          />
          <Typography sx={{ fontWeight: "bold", mb: 1 }} variant="h6">
            Password
          </Typography>
          <TextField
            sx={{ mb: 4 }}
            type="password"
            name="password"
            fullWidth
            value={registerData.password}
            onChange={(e) =>
              setRegisterData({ ...registerData, password: e.target.value })
            }
          />
          <Grid container spacing={2}>
            <Grid item xs={6} sm={6}>
              <Typography sx={{ fontWeight: "bold", mb: 1 }} variant="h6">
                First Name
              </Typography>
              <TextField
                sx={{ mb: 4 }}
                className="registerMargin"
                type="text"
                name="firstname"
                fullWidth
                value={registerData.firstname}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    firstname: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <Typography sx={{ fontWeight: "bold", mb: 1 }} variant="h6">
                Last Name
              </Typography>
              <TextField
                sx={{ mb: 4 }}
                className="registerMargin"
                type="text"
                name="lastname"
                fullWidth
                value={registerData.lastname}
                onChange={(e) =>
                  setRegisterData({ ...registerData, lastname: e.target.value })
                }
              />
            </Grid>
          </Grid>
          <Typography sx={{ fontWeight: "bold", mb: 1 }} variant="h6">
            Email
          </Typography>
          <TextField
            sx={{ mb: 4 }}
            className="registerMargin"
            type="email"
            name="email"
            fullWidth
            value={registerData.email}
            onChange={(e) =>
              setRegisterData({ ...registerData, email: e.target.value })
            }
          />
          <Typography sx={{ fontWeight: "bold", mb: 1 }} variant="h6">
            Passport
          </Typography>
          <TextField
            sx={{ mb: 4 }}
            type="text"
            name="passport"
            fullWidth
            value={registerData.passport}
            onChange={(e) =>
              setRegisterData({ ...registerData, passport: e.target.value })
            }
          />
          <Grid container spacing={2}>
            <Grid item xs={6} sm={6}>
              <Typography sx={{ fontWeight: "bold", mb: 1 }} variant="h6">
                Home Address
              </Typography>
              <TextField
                sx={{ mb: 4 }}
                type="text"
                name="address"
                fullWidth
                value={registerData.address}
                onChange={(e) =>
                  setRegisterData({ ...registerData, address: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <Typography sx={{ fontWeight: "bold", mb: 1 }} variant="h6">
                Country Code
              </Typography>
              <TextField
                sx={{ mb: 4 }}
                type="text"
                name="countryCode"
                fullWidth
                value={registerData.countryCode}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    countryCode: e.target.value,
                  })
                }
              />
            </Grid>
          </Grid>
          <Typography sx={{ fontWeight: "bold", mb: 1 }} variant="h6">
            Phone Number
          </Typography>
          <TextField
            sx={{ mb: 4 }}
            type="text"
            name="phone"
            fullWidth
            value={registerData.phone}
            onChange={(e) =>
              setRegisterData({ ...registerData, phone: e.target.value })
            }
          />
          <br /> <br />
          <Button type="submit" variant="contained" fullWidth>
            Register
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default Register;
