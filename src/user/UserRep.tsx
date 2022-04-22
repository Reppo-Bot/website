import {
    Paper,
    Typography
} from "@mui/material"
import {getReps} from "./../utils/user"
import {useParams} from "react-router-dom"
import {useState, useEffect} from 'react'

const UserRep = () => {
    const params = useParams()
    const [reps, setReps] = useState<any>([])
    useEffect(()=>{
        if(params.id === undefined){
            setReps(null)
            return
        }
        const _reps = getReps(params.id)
        .then((_reps)=>{
            console.log(_reps)
            setReps(_reps)
        })
    },[params])
    return (
        <Paper variant="outlined" sx={{
            padding: '7px',
            marginRight: '15vw'
        }} >
            <Typography variant="h4">
                Reputations
            </Typography>
        </Paper>
    )
}
export default UserRep
