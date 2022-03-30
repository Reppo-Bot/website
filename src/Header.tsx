import React, {useState, useContext} from 'react'
import {
    Box,
    Typography,
    Link,
    Avatar
} from "@mui/material"
import PageContext from "./PageContext"
import ThemeToggle from "./ThemeToggle"

const Header = () => {
    const context = useContext(PageContext)

    return (
        <Box component="div" sx={{
                position: "absolute",
                width: '100vw',
                bgcolor: '#1a1c1e',
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                color: '#EEEEEE',
                paddingLeft: '10px',
                paddingTop: '10px',
                paddingBottom: '10px',
            }}>
            {context.accessToken === '' ? (
                <Link sx={{marginRight: '10px'}} href="https://discord.com/api/oauth2/authorize?client_id=852589582733541416&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth&response_type=token&scope=identify">
                Login
                </Link>
            ) : (
                <Typography sx={{marginRight: '10px'}}>
                    Hey {context.accessToken}!
                </Typography>
            )}
            <Avatar sx={{marginRight: '20px'}} alt="Username"/>
        </Box>
    )
}

export default Header;
