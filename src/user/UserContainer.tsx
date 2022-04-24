import {useEffect} from 'react'
import {
    useTheme,
    Grid,
    Box
} from "@mui/material"
import UserInfo from "./UserInfo"
import UserRep from "./UserRep"
import UserActivity from "./UserActivity"
import UserTransactions from "./UserTransactions"

const UserContainer = () => {
    const theme = useTheme()
    useEffect(()=>{
        document.body.style.background = theme.background.secondary
    },[theme])

    return (
        <>
        <Grid container sx={{
            paddingTop: '126px',
            paddingLeft: '50px',
        }}>
            <Grid item xs={6}>
                <Box>
                    <UserInfo/>
                </Box>
            </Grid>
            <Grid item xs={6}>
                <UserRep/>
            </Grid>
        </Grid>
        <Box sx={{
            position: 'fixed',
            bottom: 0,
            paddingLeft: '50px',
            paddingBottom: '50px'
        }} >
            <Grid container sx={{width: '100vw'}}>
                <Grid item  xs={6}>
                    <UserActivity/>
                </Grid>
                <Grid item  xs={6}>
                    <UserTransactions/>
                </Grid>
            </Grid>
        </Box>
        </>
    )
}

export default UserContainer
