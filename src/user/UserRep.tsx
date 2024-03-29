import {
    Paper,
    Typography,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Divider,
    Avatar
} from "@mui/material"
import {getReps} from "./../utils/user"
import {getServer} from "./../utils/server"
import {useParams} from "react-router-dom"
import React, {useState, useEffect} from 'react'
import {useNavigate} from "react-router-dom"

const UserRep = () => {
    const navigate = useNavigate()
    const params = useParams()
    const [reps, setReps] = useState<Rep[]>([])
    const [servers, setServers] = useState<{[id: string] : Server}>({})

    const getServerAvatar = (serverid: string) => {
        if(!servers[serverid]) return null
        if(servers[serverid].avatar === ""){
            return (
                <Avatar>
                    {servers[serverid].name[0]}
                </Avatar>
            )
        }
        return <Avatar src={`https://cdn.discordapp.com/icons/${serverid}/${servers[serverid].avatar}?size=480`} alt={servers[serverid].name}/>
    }

    useEffect(()=>{
        if(params.id === undefined){
            setReps([])
            return
        }
        getReps(params.id)
        .then((reps)=>{
            setReps(reps)
        })
    },[params])

    useEffect(()=>{
        let _servers = {}
        reps.forEach(rep => {
            getServer(rep.serverid)
            .then((server)=> _servers = {..._servers, [rep.serverid]: server})
            .then(()=>setServers(_servers))
        })
    },[reps])

    return (
        <Paper variant="outlined" sx={{
            padding: '20px',
            marginRight: '5vw',
            right: 0,
            width: '300px',
            float: "right"
        }} >
            <Typography variant="h4">
                Reputations
            </Typography>
            <List>
            {reps.map((rep)=>
                <React.Fragment key={rep.serverid}>
                <ListItem sx={{
                        padding: 0,
                        margin: 0
                    }} >
                    <ListItemButton onClick={()=>navigate(`/server/${rep.serverid}`)}>
                        <ListItemIcon>
                            {getServerAvatar(rep.serverid)}
                        </ListItemIcon>
                        <ListItemText>
                            {servers[rep.serverid] ? servers[rep.serverid].name : null}
                        </ListItemText>
                        <ListItemText primaryTypographyProps={{variant: "h6"}} sx={{marginLeft: 'auto', textAlign: 'end'}} >
                            {rep.rep}
                        </ListItemText>
                    </ListItemButton>
                </ListItem>
                <Divider/>
                </React.Fragment>
                )}
            </List>
        </Paper>
    )
}
export default UserRep
