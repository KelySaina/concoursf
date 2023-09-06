import React, { useState } from 'react'
import { Box, Button, Card, Divider, Modal, TextField, Typography } from '@mui/material';
import axios from 'axios';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import Client from './Client';
import Assistant from './Assistant';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [mail, setMail] = useState('');
    const [loggedIn, setLoggedIn] = useState(false)
    const [rememberMe, setRememberMe] = useState(true)
    const [errMsg, setErrMsg] = useState("")
    const [d, setD] = useState('')
    const [acc, setAcc] = useState('')
    const [open, setOpen] = useState(false);


    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
        setErrMsg("")
    };

    const handleMailChange = (e) => {
        setMail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setErrMsg("")
    };

    const checkRemember = (event) => {
        setRememberMe(event.target.checked);
        setErrMsg("")
    }

    const sendMail = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`http://localhost:5000/mail`, {
                recipient: mail,
            })
            const data = response.data
            console.log(data)
        } catch (error) {
            console.error(error)
        }
    }



    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const r = await axios.post(`http://localhost:5000/remember`, {
                username: username,
                password: password,
            });

            const data = r.data[0].remember;
            const accType = r.data[0].accountType
            setD(data);
            setAcc(accType)
        } catch (error) {
            return
        }
        if (username.trim() === '' || username.trim() === '') {
            setErrMsg("Wrong Username/Password")
            return
        }

        const response = await axios.post(`http://localhost:5000/login`, {
            username: username,
            password: password
        })
        const data = response.data

        if (data.length === 0) {
            setLoggedIn(false)
            setErrMsg("Wrong Username/Password")
            return
        } else {
            setLoggedIn(true)
            if (rememberMe) {
                const userCredentials = {
                    username: username,
                    password: password
                };

                document.cookie = `userCredentials=${JSON.stringify(userCredentials)}; expires=Thu, 01 Jan 2030 00:00:00 UTC; path=/; SameSite=None`;

            }
            const setRemember = await axios.post(`http://localhost:5000/setRemember`, {
                r: rememberMe,
                id: data[0].id
            })

            const dataR = setRemember.data

        }





    };
    return (
        <>
            {
                loggedIn && acc === "client" && d === 0 ? (<Client />) : loggedIn && acc === "assistant" && d === 0 ? (<Assistant />) :

                    (<Typography
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
                                background: 'linear-gradient(135deg, #c1de6e 20%, #036EFF 60%)'
                            }}
                        >

                            <Card sx={{ maxWidth: 450, height: '60vh', padding: 3, paddingTop: { xs: 2, lg: 7 }, borderRadius: '20px' }}>
                                {
                                    open ? (

                                        <form onSubmit={handleSubmit}>
                                            <Typography sx={{ display: 'flex', flexDirection: 'column', width: { xs: '100%', lg: 450 }, justifyContent: 'center', alignItems: 'center', }}>
                                                <Typography style={{ color: "#FF5757" }}>{errMsg}</Typography>
                                                <TextField style={{ marginTop: '20px' }} size="medium" label="Username" type="text" name="username" value={username} onChange={handleUsernameChange} fullWidth />
                                                <TextField style={{ marginTop: '20px' }} size="medium" label="Password" type="password" name="password" value={password} onChange={handlePasswordChange} fullWidth />
                                                <Button style={{ marginTop: '20px', color: 'gray' }} onClick={() => setOpen(false)} >Forgot password?</Button>
                                                <Button style={{ marginTop: '20px', background: '#036EFF' }} type="submit" variant='contained' fullWidth>Login</Button>
                                                <Button style={{ marginTop: '20px', borderColor: '#c1de6e', color: '#c1de6e' }} type="submit" variant='outlined' fullWidth>Login as Assistant</Button>

                                                <FormGroup style={{ marginBottom: '20px' }}>
                                                    <FormControlLabel control={<Checkbox />} label="Remember me" onChange={checkRemember} checked={rememberMe} />
                                                </FormGroup>
                                            </Typography>

                                            <Divider style={{ width: '100%' }} />

                                            <Typography>
                                                <Typography style={{ color: 'blue', marginTop: '10px' }}>No account yet?</Typography>
                                                <Link to="/signin" style={{ width: '100%' }}><Button style={{ marginTop: '10px', background: '#c1de6e', width: '100%' }} type="button" variant='contained'>Sign up</Button></Link>
                                            </Typography>
                                        </form>) : (
                                        <>
                                            <form onSubmit={sendMail}>
                                                <Button onClick={() => { setOpen(true) }}>Back</Button>
                                                <Typography style={{ marginTop: '20px' }}>Please, fill in your mail adress to reinitialize your password</Typography>
                                                <TextField style={{ marginTop: '20px' }} size='small' label='E-mail adress' value={mail} onChange={handleMailChange} fullWidth />
                                                <Button style={{ marginTop: '20px' }} type='submit' variant="contained" fullWidth>Submit</Button>
                                            </form>
                                        </>
                                    )

                                }
                            </Card>

                        </Typography>
                    </Typography>
                    )
            }


        </>
    )
}

export default Login;