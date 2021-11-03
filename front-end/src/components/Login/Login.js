import TextField from "@mui/material/TextField";
import { useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import axios from "axios";
import { useState } from "react";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setError] = useState(false);

  const History = useHistory();
  const login = async (e) => {
    e.preventDefault();
    setPassword("");
    const loginState = await axios.post(`http://localhost:5000/user/login`, {
      username: userName,
      password: password,
    });
    let successfulLogin = loginState.data;
    if (successfulLogin) {
      History.push("/home");
    } else {
      setError(true);
    }
  };
  return (
    <div>
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
