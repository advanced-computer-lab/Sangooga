import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = ({ setAuthenticated, setTokenData }) => {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    username: "",
    password: "",
    firstname: "",
    lastname: "",
    email: "",
    passport: "",
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
    });
    window.localStorage.setItem("token", user.data.token);
    window.localStorage.setItem("userID", user.data._doc._id);
    setAuthenticated(true);
    navigate("/home");
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
        }}
      >
        <form onSubmit={registerUser}>
          <TextField
            className="registerMargin"
            type="text"
            name="username"
            label="username"
            fullWidth
            value={registerData.username}
            onChange={(e) =>
              setRegisterData({ ...registerData, username: e.target.value })
            }
          />
          <TextField
            className="registerMargin"
            type="password"
            name="password"
            label="password"
            fullWidth
            value={registerData.password}
            onChange={(e) =>
              setRegisterData({ ...registerData, password: e.target.value })
            }
          />
          <TextField
            className="registerMargin"
            type="text"
            name="firstname"
            label="firstname"
            fullWidth
            value={registerData.firstname}
            onChange={(e) =>
              setRegisterData({ ...registerData, firstname: e.target.value })
            }
          />
          <TextField
            className="registerMargin"
            type="text"
            name="lastname"
            label="lastname"
            fullWidth
            value={registerData.lastname}
            onChange={(e) =>
              setRegisterData({ ...registerData, lastname: e.target.value })
            }
          />
          <TextField
            className="registerMargin"
            type="email"
            name="email"
            label="email"
            fullWidth
            value={registerData.email}
            onChange={(e) =>
              setRegisterData({ ...registerData, email: e.target.value })
            }
          />
          <TextField
            className="registerMargin"
            type="text"
            name="passport"
            label="passport"
            fullWidth
            value={registerData.passport}
            onChange={(e) =>
              setRegisterData({ ...registerData, passport: e.target.value })
            }
          />
          <br /> <br />
          <Button type="submit" variant="contained">
            Register
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default Register;
