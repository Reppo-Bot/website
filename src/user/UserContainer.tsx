import {useEffect} from 'react'
import {
    useTheme,
    Box
} from "@mui/material"
import UserInfo from "./UserInfo"
import UserRep from "./UserRep"

const UserContainer = () => {
    const theme = useTheme()
    useEffect(()=>{
        document.body.style.background = theme.background.secondary
    },[theme])

    return (
        <Box sx={{
            paddingTop: '126px',
            display: 'flex',
        }}>
            <Box sx={{
                marginLeft: '50px'
            }}>
                <UserInfo/>
            </Box>

            <Box sx={{
                marginInlineStart: 'auto'
            }}>
                <UserRep/>
            </Box>
        </Box>
    )
}

export default UserContainer
