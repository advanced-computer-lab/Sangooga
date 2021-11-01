import TextField from '@mui/material/TextField';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useState } from 'react';

const Login = () => {
    const[userName, setUserName] = useState('')
    const[password, setPassword] = useState('')
    const History = useHistory();
    const login = async (e) => {
        
        console.log(userName, password);
        const loginState = await axios.get(`http://localhost:5000/user/login/${userName}/${password}`);
        console.log(loginState)
        let successfulLogin = loginState.data;
        if(successfulLogin)
        {
            console.log("success!");
            History.push('/home');
        }   
        else 
            console.log("failure");
    }
    return (
        <div>
            <form onSubmit = {login}> 
                <TextField label = 'Username'
                type = 'text'
                value = {userName}
                onChange = {(e) => setUserName(e.target.value)}/>
                <br/> <br/>
                <TextField label = 'Password'
                value = {password}
                type= 'password'
                onChange = {(e) => setPassword(e.target.value)}/>
                <br/> <br/>
                <Button type = 'submit'
                variant = 'contained'>Login</Button>

            </form>
        </div>
    )
}

export default Login
