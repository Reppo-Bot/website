import {useEffect} from 'react'
import {
    useTheme
} from "@mui/material"
import UserInfo from "./UserInfo"

const UserContainer = () => {
    const theme = useTheme()
    useEffect(()=>{
        document.body.style.background = theme.background.secondary
    },[theme])

    return (
        <div style={{
            paddingTop: '76px'
        }}>
            <UserInfo/>
        </div>
    )
}

export default UserContainer
