import {role} from "./../types"
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Button,
    DialogActions,
    TextField,
    Grid,
} from "@mui/material"
import {useState, useEffect, useContext} from 'react'
import ConfigContext from "./ConfigContext"

const RoleDialog = (props: {open: number, selected: role | null, onClose: () => void}) => {
    const [nameError, setNameError] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [priorityError, setPriorityError] = useState<string>('')
    const [priority, setPriority] = useState<string>('')
    const [roleidError, setroleidError] = useState<string>('')
    const [roleid, setroleid] = useState<string>('')
    const botContext = useContext(ConfigContext)
    const handleSave = () => {
        let errors = 0
        if(!/^[\d]{1,32}$/.test(roleid)){
            setroleidError('Role ID must be numeric!')
            errors++
        }
        if(!/^[\d]{1,2}$/.test(priority)){
            setPriorityError('Priority must be a number!')
            errors++
        }
        if(!/^[\w\d]{1,32}$/.test(name)){
            setNameError('Name must be alphanumeric!')
            errors++
        }
        if(errors) return
        const role = {
            name,
            roleid,
            priority
        }
        if(!botContext.bot) return
        let newRoleList = botContext.bot.config.roles
        if(props.open === -2){
            newRoleList.push(role)
        } else newRoleList[props.open] = role
        botContext.setBot({
            ...botContext.bot,
            config: {
                ...botContext.bot.config,
                roles: newRoleList
            }
        })
        props.onClose()
    }
    useEffect(()=>{
        setNameError('')
    },[name])
    useEffect(()=>{
        setPriorityError('')
    },[priority])
    useEffect(()=>{
        setroleidError('')
    },[roleid])
    useEffect(()=>{
        if(props.selected === null){
            setName('')
            setPriority('')
            setroleid('')
            return
        }
        setName(props.selected.name)
        setPriority(props.selected.priority)
        setroleid(props.selected.roleid)
    },[props.selected])
    return (
        <>
        {props.open === -1 ? (
            <Dialog open={false}/>
            ) : (
            <Dialog
                open={true}
                onClose={() => props.onClose()}
                >
                <DialogTitle>{props.selected !== null ? "Edit" : "Add"} Role</DialogTitle>
                <DialogContent>
                    <Grid sx={{padding: '5px'}} container spacing={2}>
                        <Grid item xs={4}>
                            <TextField
                                label="Name"
                                value={name}
                                error={!!nameError}
                                helperText={nameError}
                                onChange={(e) => setName(e.target.value)}
                                />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                label="Priority"
                                value={priority}
                                error={!!priorityError}
                                helperText={priorityError}
                                onChange={(e) => setPriority(e.target.value)}
                                />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                label="Role Id"
                                value={roleid}
                                error={!!roleidError}
                                helperText={roleidError}
                                onChange={(e) => setroleid(e.target.value)}
                                />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSave}>
                        Save
                    </Button>
                    <Button onClick={props.onClose}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
            )}
        </>
    )
}
export default RoleDialog
