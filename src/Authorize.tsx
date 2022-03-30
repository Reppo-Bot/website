import {useEffect, useContext} from 'react'
import PageContext from "./PageContext"
import { useNavigate } from "react-router-dom";

const Authorize = () => {
    const navigate = useNavigate()
    const context = useContext(PageContext)
    useEffect(() => {
        const fragment = new URLSearchParams(window.location.hash.slice(1));
        const [accessToken, tokenType, expiresIn] = [fragment.get('access_token'), fragment.get('token_type'), fragment.get('expires_in')];
        if(accessToken === null){
            return
        }
        context.setTokenInfo(accessToken, expiresIn, () => navigate('/'))
    },[])
    return (
        <>
            Authorizing
        </>
    )
}
export default Authorize
