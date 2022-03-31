import React, {useState, useMemo, useEffect} from 'react';
import PageContext from "./PageContext"
import {createTheme, ThemeProvider, PaletteMode} from "@mui/material"
import Header from "./Header"
import { Routes, Route, BrowserRouter} from "react-router-dom";
import Authorize from "./Authorize"
import Home from "./Home"
import {useCookies} from 'react-cookie'

const getDesignTokens = (mode: PaletteMode)=> ({
    palette: {
        mode,
        ...(mode === 'light' ? {
            // Light Mode Colors
            primary: {
                main: '#4851c3'
            },
            secondary: {
                main: '#3a48e8'
            },
            text: {
                primary: '#ffffff',
                secondary: '#ffffff'
            },
            background: {
                default: '#fdfcff',
                paper: '#fdfcff'
            },
            error: {
                main: '#be002d'
            },
            success: {
                main: '#6fdc8e'
            }
        } : {
            // Dark mode colors
            primary: {
                main :'#bcc2ff'
            },
            secondary: {
                main: '#bcc2ff'
            },
            text: {
                primary: '#111a95',
                secondary: '#0001ad'
            },
            background: {
                default: '#1a1c1e',
                paper: '#1a1c1e'
            },
            error: {
                main: '#be002d'
            },
            success: {
                main: '#6fdc8e'
            }
        })
    }
})

const App = () => {
    const [accessToken, setAccessToken] = useState('')
    const [expiration, setExpiration] = useState(0)
    const [mode, setMode] = useState<PaletteMode>('dark');
    const [user, setUser] = useState({name: '', id: '', avatar: ''})
    const [cookies, setCookie] = useCookies(['user', 'token', 'mode'])
    const colorMode = useMemo(
        () => ({
        // The dark mode switch would invoke this method
        toggleColorMode: () => {
            setMode((prevMode: PaletteMode) =>
                prevMode === 'light' ? 'dark' : 'light',
                );
            },
        }),
    [],
    );
    useEffect(() => {
        if(cookies.token === undefined && accessToken === ''){
            return
        }
        if(cookies.token !== undefined && accessToken === ''){
            setAccessToken(cookies.token)
            setMode(cookies.mode)
            setUser({name: cookies.user.name, id: cookies.user.id, avatar: cookies.user.avatar})
        }
    },[user, cookies, accessToken])
    const setTokenInfo = (token: string, exp: number, callback: () => {}) => {
        setAccessToken(token)
        setExpiration(exp)
        callback()
    }
    const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
    return (
        <ThemeProvider theme={theme}>
            <PageContext.Provider value={{
                colorMode:    colorMode,
                setTokenInfo: setTokenInfo,
                accessToken:  accessToken,
                expiration:   expiration,
                setUser:      setUser,
                user:         user,
                setCookie:   setCookie
            }}>
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/auth' element={<Authorize/>}/>
                </Routes>
            </BrowserRouter>
            </PageContext.Provider>
        </ThemeProvider>
    )
}

export default App;
