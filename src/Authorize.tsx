import {useEffect, useContext} from 'react'
import PageContext from "./PageContext"
import { useNavigate } from "react-router-dom";
import {getUser} from "./utils"

const Authorize = () => {
    const navigate = useNavigate()
    const context = useContext(PageContext)
    useEffect(() => {
        const fragment = new URLSearchParams(window.location.hash.slice(1));
        const [accessToken, tokenType, expiresIn] = [fragment.get('access_token'), fragment.get('token_type'), fragment.get('expires_in')];

        if(accessToken === null || tokenType === null || expiresIn === null){
            return
        }
        getUser(accessToken, tokenType).then((user) => {
            let expDate = new Date()
            expDate.setSeconds(expDate.getSeconds() + parseInt(expiresIn))
            context.setUser({name: user.username, id: user.id, avatar: user.avatar})
            context.setCookie('user', {name: user.username, id: user.id, avatar: user.avatar}, {expires: expDate})
            context.setCookie('token', accessToken, {expires: expDate})
            context.setTokenInfo(accessToken, expiresIn, () => navigate('/'))
        })
    },[navigate, context])
    return (
        <>
            Authorizing
        </>
    )
}
export default Authorize
