import React, { useState } from 'react'
import { Button, Card, TextField, Typography } from '@mui/material';
import axios from 'axios';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

function SignIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isClicked, setIsClicked] = useState(false);
    const [isClicked2, setIsClicked2] = useState(false);


    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleAssistant = () => {
        setIsClicked(!isClicked)
        setIsClicked2(false)
    }
    const handleClient = () => {
        setIsClicked2(!isClicked2)
        setIsClicked(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (username.trim() === '' || username.trim() === '') {
            alert("Wrong Username/Password")
            return
        }
        const response = await axios.post(`http://192.168.43.14:5000/login`, {
            "username": username,
            "password": password
        })
        const data = response.data.rows[0]
        if (data.username === "admin" && data.password === "admin") {
            window.location.href = "/view";
        } else {
            alert("Wrong Username/Password")
        }
    };

    const buttonStyle = { marginTop: '10px', background: isClicked ? '#036EFF' : '#c1de6e', width: '45%', color: isClicked ? '#fff' : '#036EFF' }
    const buttonStyle2 = { marginTop: '10px', background: isClicked2 ? '#036EFF' : '#c1de6e', width: '45%', color: isClicked2 ? '#fff' : '#036EFF' }
    return (
        <>
            <Typography
                sx={{
                    display: { xs: 'block', lg: 'flex' }
                }}>
                <Typography
                    sx={{
                        width: { xs: '0%', lg: '40%' },
                        display: { xs: 'none', lg: 'block' }
                    }}
                >
                    <img src='/images/logo.png' alt='logo' />
                </Typography>
                <Typography
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: '100vh',
                        width: { xs: '100%', lg: '60%' },
                        background: 'linear-gradient(135deg, rgba(148,218,24,1) 15%, rgba(19,126,231,1) 60%)'
                    }}
                >
                    <Card sx={{ maxWidth: 450, padding: 2, paddingTop: { xs: 2, lg: 7 }, borderRadius: '20px', margin: 1 }}>
                        <Typography sx={{ display: 'flex', flexDirection: 'column', width: { xs: '100%', lg: 450 }, justifyContent: 'center', alignItems: 'center', }}>

                            <TextField style={{ marginTop: '20px' }} size="small" label="Name" type="text" name="username" value={username} onChange={handleUsernameChange} fullWidth />
                            <TextField style={{ marginTop: '20px' }} size="small" label="Surname" type="text" name="password" value={password} onChange={handlePasswordChange} fullWidth />
                            <TextField style={{ marginTop: '20px' }} size="small" label="E-mail" type="text" name="mail" value={username} onChange={handleUsernameChange} fullWidth />
                            <TextField style={{ marginTop: '20px' }} size="small" label="Password" type="password" name="password" value={password} onChange={handlePasswordChange} fullWidth />
                            <TextField style={{ marginTop: '20px' }} size="small" label="Confirm password" type="password" name="cpassword" value={username} onChange={handleUsernameChange} fullWidth />





                            <Typography sx={{ color: 'blue', marginTop: '20px', fontSize: { xs: '15px', lg: '22px' }, fontWeight: 'bold' }}>Sign up as {isClicked ? "Assistant" : ""}{isClicked2 ? "Client" : ""} </Typography>

                            <Typography style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }} fullWidth>
                                <Button style={buttonStyle} type="submit" onClick={handleAssistant} variant='contained' >Assistant</Button>
                                <Button style={buttonStyle2} type="submit" onClick={handleClient} variant='contained' >Client</Button>
                            </Typography>

                            <FormGroup style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <FormControlLabel control={<Checkbox />} label={<Typography sx={{ fontSize: { xs: '11px', lg: '17px' } }}>I have read and agree to the terms and conditions</Typography>} />
                            </FormGroup>

                            <Button style={{ marginTop: '10px', background: '#036EFF' }} type="submit" onClick={handleSubmit} variant='contained' fullWidth>Sign Up</Button>
                            <Typography style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <FormGroup>
                                    <FormControlLabel control={<Checkbox />} label="Remember me" />
                                </FormGroup>
                            </Typography>
                        </Typography>
                    </Card>
                </Typography>
            </Typography>
        </>
    )
}

export default SignIn;