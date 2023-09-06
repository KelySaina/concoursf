import { Button, Typography } from '@mui/material'
import React from 'react'

const Assistant = () => {
    const logout = async () => {
        document.cookie = 'userCredentials=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.location.href = "/"
    }

    return (
        <Typography>
            Assistant
            <Button variant='outlined' onClick={logout}>Logout</Button>
        </Typography>
    )
}

export default Assistant