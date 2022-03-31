import React, {useContext} from 'react'
import {
    Box,
    Typography,
    Link,
    Avatar
} from "@mui/material"
import PageContext from "./PageContext"

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
                <>
                    <Link sx={{marginRight: '10px'}} href="https://discord.com/api/oauth2/authorize?client_id=852589582733541416&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth&response_type=token&scope=identify">
                        Login
                    </Link>
                    <Avatar sx={{marginRight: '20px'}}/>
                </>
            ) : (
                <>
                    <Typography sx={{marginRight: '10px'}}>
                        {context.user.name}
                    </Typography>
                    <Avatar sx={{marginRight: '20px'}} src={`https://cdn.discordapp.com/avatars/${context.user.id}/${context.user.avatar}?size=480`} alt={context.user.name}/>
                </>
            )}
        </Box>
    )
}

export default Header;
