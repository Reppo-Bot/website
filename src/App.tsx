import React, {useState, useMemo, useEffect} from 'react';
import PageContext from "./PageContext"
import {createTheme, ThemeProvider, PaletteMode} from "@mui/material"
import Header from "./Header"
import { Routes, Route, BrowserRouter} from "react-router-dom";
import Authorize from "./Authorize"
import Home from "./Home"
import {useCookies} from 'react-cookie'
import {getDesignTokens} from './utils/global'
import Config from './config/Config'
import Gatekeeper from './Gatekeeper'
import User from "./user/User"
import NotFound from "./NotFound"

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
        if(cookies.token === undefined && accessToken !== ''){
            setAccessToken('')
            setUser({name: '', id: '', avatar: ''})
        }
        if(cookies.token !== undefined && accessToken === ''){
            setAccessToken(cookies.token)
            if(cookies.mode !== undefined){
                setMode(cookies.mode)
            }
            setUser({name: cookies.user.name, id: cookies.user.id, avatar: cookies.user.avatar})
        }
    },[user, cookies, accessToken])
    const setTokenInfo = (token: string, exp: number) => {
        setAccessToken(token)
        setExpiration(exp)
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
                    <Route path='/config' element={
                        <Gatekeeper>
                            <Config/>
                        </Gatekeeper>}/>
                    <Route path='/user/:id' element={<User/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </BrowserRouter>
            </PageContext.Provider>
        </ThemeProvider>
    )
}

export default App;
