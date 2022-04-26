import {useState, useContext, useEffect} from 'react'
import {
    Box
} from "@mui/material"
import {getUpdateStatus} from "./../utils/config"
import PageContext from "./../PageContext"

const ConfigStatus = (props: {serverid: string, initStatus: string}) =>{
    const context = useContext(PageContext)
    const [status, setStatus] = useState(props.initStatus)
    let intervalId: null | ReturnType<typeof setInterval> = null
    const watchStatus = async () =>{
        setStatus(await getUpdateStatus(context.accessToken, props.serverid))
    }
    if(status === "pending"){
        console.log("Pending")
        intervalId = setInterval(watchStatus, 2000)
    }
    useEffect(()=>{
        if(intervalId !== null && status !== "pending"){
            clearInterval(intervalId)
            console.log("Status Changed!")
        }
    },[status, intervalId])
    if(status === "success"){
        return (
             <Box sx={{
                marginBottom: "2px",
                marginRight: "8px",
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: "#94E185",
                borderColor: "#78D965",
                boxShadow: "0px 0px 5px 1px #94E185"
            }} >
            </Box>
        )
    }
    if(status === "pending"){
        return (
             <Box sx={{
                marginBottom: "2px",
                marginRight: "8px",
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: "#FFB161",
                borderColor: "#FFC182",
                boxShadow: "0px 0px 5px 1px #FFB161"
            }} >
            </Box>
        )
    }
    if(status === "failed"){
        return (
             <Box sx={{
                marginBottom: "2px",
                marginRight: "8px",
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: "#C9404D",
                borderColor: "#C42C3B",
                boxShadow: "0px 0px 5px 1px #C9404D"
            }} >
            </Box>
        )
    }
    return null

}
export default ConfigStatus
