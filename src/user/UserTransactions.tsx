import React from 'react'
import {useParams} from "react-router-dom"
import {useEffect, useState} from "react"
import {getRecentTransactions}
from "./../utils/user"
import {useNavigate} from "react-router-dom"
import {
    Box,
    Paper,
    Typography,
    Grid,
    List,
    CircularProgress,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Divider
} from "@mui/material"
import autocolors from 'chartjs-plugin-autocolors';

type activityPayload = {
    action: {
        commandname: string
    },
    Bot: {
        servername: string
    },
    serverid: string,
    time: Date
}
type timespan = "day" | "month" | "year"
const UserTransactions = () =>{
    const params = useParams()
    const navigate = useNavigate()
    const [period, setPeriod] = useState<timespan>("day")
    const [data, setData] = useState<any>(undefined)
    useEffect(()=>{
        if(!params.id) return
        getRecentTransactions(params.id, 4)
        .then((res)=>setData(res))
    },[])
    return (
        <>
            <Box sx={{
                bottom: 0,

            }}>
                <Paper elevation={3} sx={{
                    padding: '10px 0 70px 0',
                    height: "35vh",
                    width: '45vw',
                }}>
                    <Grid container justifyContent="space-evenly" alignItems="center">
                        <Typography gutterBottom variant="h5">
                            Recent Transactons
                        </Typography>
                    </Grid>
                    {data !== undefined ?(
                        <List>
                            <ListItem>
                                <ListItemText>
                                    Command Name
                                </ListItemText>
                                <ListItemText primaryTypographyProps={{variant: "h6"}} sx={{marginLeft: 'auto', textAlign: 'end'}} >
                                    Server Name
                                </ListItemText>
                                <ListItemText primaryTypographyProps={{variant: "h6"}} sx={{marginLeft: 'auto', textAlign: 'end'}} >
                                    Date
                                </ListItemText>
                            </ListItem>
                            {data.map((trans: activityPayload, index: number)=>(
                            <React.Fragment key={index}>
                                <ListItem sx={{
                                        padding: 0,
                                        margin: 0
                                    }} >
                                    <ListItemButton onClick={()=>navigate("/"+trans.serverid)} >
                                        <ListItemText>
                                            {trans.action.commandname[0].toUpperCase() + trans.action.commandname.slice(1)}
                                        </ListItemText>
                                        <ListItemText primaryTypographyProps={{variant: "h6"}} sx={{marginLeft: 'auto', textAlign: 'end'}} >
                                            {trans.Bot.servername}
                                        </ListItemText>
                                        <ListItemText primaryTypographyProps={{variant: "h6"}} sx={{marginLeft: 'auto', textAlign: 'end'}} >
                                            {(new Date(trans.time)).toLocaleDateString()}
                                        </ListItemText>
                                    </ListItemButton>
                                </ListItem>
                                <Divider/>
                            </React.Fragment>
                            ))}
                        </List>
                    ):(
                    <Grid sx={{alignItems: "center", height: '100%'}} container justifyContent="center">
                            <CircularProgress color="inherit" />
                    </Grid>
                    )}
                </Paper>
            </Box>
        </>
    )
}
export default UserTransactions
