import React, {useContext} from 'react'
import {
    Box,
    Typography,
    Link
} from "@mui/material"
import PageContext from "./PageContext"
import ProfileMenu from "./ProfileMenu"
import {getConfig} from "./utils/config"

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
