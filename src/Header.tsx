import React, {useContext} from 'react'
import {
    Box,
    Typography,
    Link,
    useTheme
} from "@mui/material"
import {Link as RouterLink} from "react-router-dom"
import PageContext from "./PageContext"
import ProfileMenu from "./ProfileMenu"

const Header = () => {
    const context = useContext(PageContext)
    const theme = useTheme()
    return (
        <Box component="div" sx={{
                position: "absolute",
                width: '100vw',
                bgcolor: theme.palette.mode === 'light' ? "white": theme.palette.background.default,
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
                        color: theme.palette.text.primary,
                        fontWeight: '350',
                    }}
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
                    <Typography sx={{color: theme.palette.text.primary, marginRight: '10px'}}>
                        {context.user.name}
                    </Typography>
                    <ProfileMenu user={context.user}/>
                </>
            )}
        </Box>
    )
}

export default Header;
