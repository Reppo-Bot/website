import React, {useContext} from 'react'
import {
    Box,
    Typography,
    Link
} from "@mui/material"
import {Link as RouterLink} from "react-router-dom"
import PageContext from "./PageContext"
import ProfileMenu from "./ProfileMenu"

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
                paddingTop: '10px',
                paddingBottom: '10px',
            }}>
            <RouterLink to='/' style={{
                textDecoration: 'none',
                marginRight: 'auto',
                paddingLeft: '10px',}}>
                <Typography
                    sx={{
                        fontWeight: '350',
                        color: '#bcc2ff'}}
                    variant="h4">
                    Reppo
                </Typography>
            </RouterLink>
            {context.accessToken === '' ? (
                <>
                    <Link
                        color="inherit"
                        underline="none"
                        sx={{marginRight: '10px'}}
                        href="https://discord.com/api/oauth2/authorize?client_id=852589582733541416&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth&response_type=token&scope=identify">
                        Login
                    </Link>
                    <ProfileMenu/>
                </>
            ) : (
                <>
                    <Typography sx={{marginRight: '10px'}}>
                        {context.user.name}
                    </Typography>
                    <ProfileMenu user={context.user}/>
                </>
            )}
        </Box>
    )
}

export default Header;
