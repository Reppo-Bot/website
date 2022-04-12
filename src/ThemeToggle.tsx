import PageContext from "./PageContext"
import {useContext} from 'react'
import {
    Switch,
    useTheme,
    styled,
    FormGroup,
    FormControlLabel
} from "@mui/material"

const ThemeModeSwitch = styled(Switch)(({theme}) => ({
    width: 62,
     height: 34,
     padding: 7,
     '& .MuiSwitch-switchBase': {
       margin: 1,
       padding: 0,
       transform: 'translateX(6px)',
       '&.Mui-checked': {
         color: '#fff',
         transform: 'translateX(22px)',
         '& .MuiSwitch-thumb:before': {
           backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
             '#fff',
           )}" d="M20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zM12 18c-.89 0-1.74-.2-2.5-.55C11.56 16.5 13 14.42 13 12s-1.44-4.5-3.5-5.45C10.26 6.2 11.11 6 12 6c3.31 0 6 2.69 6 6s-2.69 6-6 6z"/></svg>')`,
         },
         '& + .MuiSwitch-track': {
           opacity: 1,
         },
       },
     },
     '& .MuiSwitch-thumb': {
       backgroundColor: theme.palette.mode === 'dark' ? '#000' : theme.palette.primary.main,
       width: 32,
       height: 32,
       '&:before': {
         content: "''",
         position: 'absolute',
         width: '100%',
         height: '100%',
         left: 0,
         top: 0,
         backgroundRepeat: 'no-repeat',
         backgroundPosition: 'center',
         backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
           '#fff',
         )}" d="M20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zM12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm0-10c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z"/></svg>')`,
       },
     },
     '& .MuiSwitch-track': {
       opacity: 1,
       backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
       borderRadius: 20 / 2,
     },
}))

const ThemeToggle = () => {
    const theme = useTheme();
    const context = useContext(PageContext)

    const toggleThemeMode = () => {
        context.setCookie('mode', theme.palette.mode === 'light' ? 'dark' : 'light')
        context.colorMode.toggleColorMode()
    }
    return (
        <FormGroup>
            <FormControlLabel
                control={
                    <ThemeModeSwitch onChange={toggleThemeMode} checked={theme.palette.mode === 'dark'}/>
                }
                label={`${theme.palette.mode === 'light' ? "Light" : "Dark"} Mode`} />
        </FormGroup>
    )
}
export default ThemeToggle
