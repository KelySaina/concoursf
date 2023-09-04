import React, { useState } from 'react'
import { Button, Card, TextField, Typography } from '@mui/material';
//import axios from 'axios';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (username.trim() === '' || username.trim() === '') {
            alert("Wrong Username/Password")
            return
        }
        
        if (username === "admin" && password === "admin") {
            window.location.href = "/signin";
        } else {
            alert("Wrong Username/Password")
        }
    };
    return (
        <>
        <Typography 
            sx={{
                display:{xs:'block', lg:'flex'}
            }}>
        <Typography
            sx={{
                width: { xs: '0%', lg: '40%' },
                display: { xs: 'none', lg: 'block' }
            }}
        >
            <img src='/images/logo.png' alt='logo'/>
        </Typography>
        <Typography
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                width:{xs:'100%', lg:'60%'},
                background: 'linear-gradient(135deg, rgba(148,218,24,1) 15%, rgba(19,126,231,1) 60%)'
            }}
        >
            <Card sx={{ maxWidth: 450, padding: 3, paddingTop: {xs:2 , lg:7}, borderRadius:'20px' }}>
                <Typography sx={{ display: 'flex', flexDirection: 'column', width: {xs:'100%', lg:450}, justifyContent:'center', alignItems:'center',  }}>
                    
                    <TextField style={{ marginTop: '20px'}} size="small" label="Username" type="text" name="username" value={username} onChange={handleUsernameChange} fullWidth/>
                    <TextField style={{ marginTop: '20px' }} size="small" label="Password" type="password" name="password" value={password} onChange={handlePasswordChange} fullWidth/>
                    <a href="/" style={{ marginTop: '20px', textDecoration:'none', color:'gray' }}>Forgot password?</a>
                    <Button style={{ marginTop: '20px', background: '#137ee7' }} type="submit" onClick={handleSubmit} variant='contained' fullWidth>Login</Button>

                    <FormGroup style={{marginBottom:'20px'}}>
                        <FormControlLabel control={<Checkbox />} label="Remember me" />
                    </FormGroup>

                    <hr style={{ width:'100%'}}/>

                    <Typography style={{color: 'blue', marginTop:'10px'}}>No account yet?</Typography>
                    <Link to="/signin" style={{width:'100%'}}><Button style={{ marginTop: '10px', background: '#94da18', width: '100%' }} type="submit" variant='contained'>Sign up</Button></Link>

                </Typography>
            </Card>
        </Typography>
        </Typography>
        </>
    )
}

export default Login;