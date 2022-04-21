import {useParams} from "react-router-dom"
import {
    Avatar,
    Box,
    useTheme,
    Typography,
    Grid
} from "@mui/material"
import {useEffect, useState} from "react"
import {getUser} from "./../utils/user"

const UserInfo = () => {
    const params = useParams()
    const theme = useTheme()
    const [user, setUser] = useState<User | null>(null)
    useEffect(()=>{
        if(params.id === undefined){
            setUser(null)
            return
        }
        const user = getUser(params.id)
        .then((user)=>setUser(user))
    },[params])
    if(user === null){
        return null
    }
    return (
        <>
            <Box sx={{
                margin: '50px 0 0 50px',
                display: 'inline-flex',
                width: '50vw'
            }} >
                <Avatar sx={{
                    width: '12vw',
                    height: '12vw',
                    boxShadow: `5px 5px 15px ${theme.background.primary}`
                }} src={`https://cdn.discordapp.com/avatars/${user.discordid}/${user.avatar}?size=480`} alt={user.name}/>
                <Grid sx={{
                    height: 0
                }} container>
                    <Grid item xs={12}>
                        <Typography variant="h4" sx={{
                            color: theme.palette.text.primary,
                            paddingLeft: '30px'
                        }} >
                            {user.name}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" sx={{
                            color: theme.palette.text.primary,
                            paddingLeft: '40px',
                            paddingTop: '10px'
                        }} >
                            Hey, this seems like a pretty cool guy! Someone should tell him to set his bio...
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}
export default UserInfo

