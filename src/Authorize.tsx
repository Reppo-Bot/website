import {useEffect, useContext, useState} from 'react'
import PageContext from "./PageContext"
import { useNavigate } from "react-router-dom";
import {getUser, login} from "./utils/global"
import {Typography, Backdrop, CircularProgress} from "@mui/material"

type state = "success" | "failed" | "waiting"
const Authorize = () => {
    const navigate = useNavigate()
    const context = useContext(PageContext)
    const [authState, setAuthState] = useState<state>("waiting")
    useEffect(() => {
        async function onAuth(){
            const fragment = new URLSearchParams(window.location.hash.slice(1));
            const [accessToken, tokenType, expiresIn] = [fragment.get('access_token'), fragment.get('token_type'), fragment.get('expires_in')];
            if(accessToken === null || tokenType === null || expiresIn === null){
                setAuthState("failed")
                return
            }
            const user = await getUser(accessToken, tokenType)
            let expDate = new Date()
            expDate.setSeconds(expDate.getSeconds() + parseInt(expiresIn))
            const payload = await login(accessToken, expDate.toLocaleString())
            if(!payload){
                setAuthState("failed")
                return
            }
            setAuthState("success")
            context.setUser({name: user.username, id: user.id, avatar: user.avatar})
            context.setCookie('user', {name: user.username, id: user.id, avatar: user.avatar}, {expires: expDate})
            context.setCookie('token', accessToken, {expires: expDate})
            context.setTokenInfo(accessToken, expiresIn, () => navigate('/'))
        }
        onAuth()
    },[navigate, context])
    return (
        <>
            {authState === "failed" ? (
                <Typography sx={{paddingTop: "10vh"}} variant="h1">
                    Failed to Authorize!
                </Typography>
                ) : (
                <Backdrop
                  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                  open={true}
                >
                  <CircularProgress color="inherit" />
                </Backdrop>
            )}
        </>
    )
}
export default Authorize
