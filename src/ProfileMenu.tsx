import {Menu, MenuItem, Avatar, IconButton} from '@mui/material'
import {useState, MouseEvent, useContext} from 'react'
import ThemeToggle from "./ThemeToggle"
import PageContext from "./PageContext"
import {useNavigate} from "react-router-dom"
import {logout} from "./utils/global"

function ProfileMenu(props: {user?: {id: string, avatar: string, name: string}}){
    const navigate = useNavigate()
    const context = useContext(PageContext)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = () => {
        logout(context.accessToken)
        context.setUser({name: '', id: '', avatar: ''})
        context.setCookie('user', {name: '', id: '', avatar: ''}, {expires: new Date()})
        context.setCookie('token', '', {expires: new Date()})
        handleClose()
        context.setTokenInfo('', 0)
        navigate('/')
    }
    return (
        <>
            <IconButton
                onClick={handleClick}
                sx={{marginRight: '10px'}}
            >
                {props.user === undefined ? (
                    <Avatar/>
                ) : (
                    <Avatar src={`https://cdn.discordapp.com/avatars/${props.user.id}/${props.user.avatar}?size=480`} alt={props.user.name}/>
                )}
            </IconButton>
            {props.user === undefined ? (
                // logged out
                <Menu
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    open={open}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                >
                <MenuItem onClick={() => {window.location.href=`https://discord.com/api/oauth2/authorize?client_id=852589582733541416&redirect_uri=${encodeURIComponent(window.location.origin + "/")}auth&response_type=token&scope=identify`}}>
                    Login
                </MenuItem>
                    <MenuItem>
                        <ThemeToggle/>
                    </MenuItem>
                </Menu>
            ) : (
                // Logged in
                <Menu
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    open={open}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                >
                <MenuItem onClick={() => navigate(`/user/${props.user!.id!}`)}>
                    Profile
                </MenuItem>
                <MenuItem onClick={() => navigate('/config')}>
                    Config
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    Logout
                </MenuItem>
                <MenuItem>
                    <ThemeToggle/>
                </MenuItem>
            </Menu>
            )}
        </>
    )
}
export default ProfileMenu
