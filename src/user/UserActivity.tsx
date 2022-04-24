import {useParams} from "react-router-dom"
import {useEffect, useState} from "react"
import {
    getActivityForDay,
    getActivityForMonth,
    getActivityForYear}
from "./../utils/user"
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import {
    Box,
    Paper,
    Typography,
    Grid,
    Button,
    CircularProgress
} from "@mui/material"
import autocolors from 'chartjs-plugin-autocolors';

ChartJS.register(ArcElement, Tooltip, autocolors, Legend);

type activityPayload = {
    action: {
        commandname: string
    },
    Bot: {
        servername: string
    }
}
type timespan = "day" | "month" | "year"
const UserActivity = () =>{
    const params = useParams()
    const [period, setPeriod] = useState<timespan>("day")
    const [data, setData] = useState<any>(undefined)
    const getActivity = async (activityPeriod : timespan) =>{
        if(!params.id) return
        let payload = undefined
        if(activityPeriod === "day") payload = await getActivityForDay(params.id)
        if(activityPeriod === "month") payload = await getActivityForMonth(params.id)
        if(activityPeriod === "year") payload = await getActivityForYear(params.id)
        let flatened = {} as {[name: string]: number}
        payload.forEach((entry: activityPayload)=>{
            const index = entry.action.commandname + " From " + entry.Bot.servername
            flatened[index] = (flatened[index] ?? 0) + 1
        })
        let _data = {
            labels: [] as string[],
            datasets: [{
                label: "Activity For Today",
                data: [] as number[],
                hoverOffset: 20,
                radius: "90%",
            }],
        }
        Object.keys(flatened).forEach((key)=>{
            _data.labels.push(key)
            _data.datasets[0].data.push(flatened[key])
        })

        setData(_data)
    }
    useEffect(()=>{
        setData(undefined)
        getActivity(period)
    },[period])

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
                        <Grid item sx={{textAlign: 'center'}} xs={12}>
                            <Typography gutterBottom variant="h5">
                                Activity Per Day
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Button onClick={()=>setPeriod("day")} variant="contained">Day</Button>
                        </Grid>
                        <Grid item>
                            <Button onClick={()=>setPeriod("month")} variant="contained">Month</Button>
                        </Grid>
                        <Grid item>
                            <Button onClick={()=>setPeriod("year")} variant="contained">Year</Button>
                        </Grid>
                    </Grid>
                    {data !== undefined ?(
                    <Doughnut
                        data={data}
                        options={{
                            maintainAspectRatio: false,
                            plugins: {
                                //@ts-ignore
                                autocolors: {
                                    mode: 'data'
                                },
                                legend: {
                                    fullSize: true,
                                    position: 'left'
                                }
                            }
                        }}
                    />
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
export default UserActivity
