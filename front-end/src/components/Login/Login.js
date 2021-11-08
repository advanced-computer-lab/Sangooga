import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
const Login = ({ setAuthenticated }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setError] = useState(false);
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    setPassword("");
    try {
      const user = await axios.post(`http://localhost:5000/user/login`, {
        username: userName,
        password: password,
      });
      console.log(user);
      window.localStorage.setItem(`token`, user.data.token);
      setAuthenticated(true);
      navigate("/home");
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="loginForm">
      <form onSubmit={login}>
        {loginError ? (
          <TextField
            error
            label="Username"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        ) : (
          <TextField
            label="Username"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        )}
        <br /> <br />
        {loginError ? (
          <TextField
            error
            label="Password"
            value={password}
            type="password"
            helperText="Incorrect Credentials"
            onChange={(e) => setPassword(e.target.value)}
          />
        ) : (
          <TextField
            label="Password"
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        )}
        <br /> <br />
        <Button type="submit" variant="contained">
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
