import {Menu, MenuItem, Avatar, IconButton} from '@mui/material'
import {useState, MouseEvent, useContext} from 'react'
import ThemeToggle from "./ThemeToggle"
import PageContext from "./PageContext"
import {useNavigate} from "react-router-dom"

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
    const logout = () => {
        context.setUser({name: '', id: '', avatar: ''})
        context.setCookie('user', {name: '', id: '', avatar: ''}, {expires: new Date()})
        context.setCookie('token', '', {expires: new Date()})
        handleClose()
        context.setTokenInfo('', '', () => navigate('/'))
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
            <Menu
                anchorEl={anchorEl}
                onClose={handleClose}
                open={open}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            >
            {props.user === undefined ? (
                <MenuItem onClick={() => {window.location.href="https://discord.com/api/oauth2/authorize?client_id=852589582733541416&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth&response_type=token&scope=identify"}}>
                    Login
                </MenuItem>
            ) : (
                <MenuItem onClick={logout}>
                    Logout
                </MenuItem>
            )}
                <MenuItem>
                    <ThemeToggle/>
                </MenuItem>
            </Menu>
        </>
    )
}
export default ProfileMenu
