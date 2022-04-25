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
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
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
                        <Table>
                            <TableHead>
                            <TableRow>
                                <TableCell>
                                    Command Name
                                </TableCell>
                                <TableCell>
                                    Server Name
                                </TableCell>
                                <TableCell>
                                    Date
                                </TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {data.map((trans: activityPayload, index: number)=>(
                                <TableRow key={index} sx={{
                                        padding: 0,
                                        margin: 0
                                    }} >
                                        <TableCell>
                                            {trans.action.commandname[0].toUpperCase() + trans.action.commandname.slice(1)}
                                        </TableCell>
                                        <TableCell>
                                            {trans.Bot.servername}
                                        </TableCell>
                                        <TableCell>
                                            {(new Date(trans.time)).toLocaleDateString()}
                                        </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
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
