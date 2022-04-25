import {
    Dialog,
    DialogTitle,
    DialogContent,
    Button,
    DialogActions,
    TextField,
    Select,
    MenuItem,
    Grid,
    FormControl,
    InputLabel
} from "@mui/material"
import React, {useState, useEffect, useContext} from 'react'
import ConfigContext from "./ConfigContext"



const CommandDialogController = (props: {open: boolean, selected: [command | null, string], onClose: () => void}) => {
    const botContext = useContext(ConfigContext)

    const [name, setName] = useState<string>(props.selected[1])
    const [nameError, setNameError] = useState<string>('')
    const [commandType, setCommandType] = useState<string>('')
    const [commandTypeError, setCommandTypeError] = useState<string>('')
    const [desc, setDesc] = useState<string>('')
    const [descError, setDescError] = useState<string>('')
    const [permType, setPermType] = useState<string>('all')
    const [permTypeError, setPermTypeError] = useState<string>('')

    useEffect(()=>{
        setNameError('')
    },[name])
    useEffect(()=>{
        setDescError('')
    },[desc])
    useEffect(()=>{
        setPermTypeError('')
    },[permType])
    useEffect(()=>{
        setCommandTypeError('')
    },[commandType])

    useEffect(()=>{
        if(props.selected[0] === null){
            setName('')
            setCommandType('')
            setDesc('')
            setPermType('')
            return
        }
        setName(props.selected[1])
        setCommandType(props.selected[0].type)
        setDesc(props.selected[0].description)
        setPermType(props.selected[0].permType)
    },[props])

    const handleSave = () => {
        let errors = 0
        if(!/^[\w\d]{1,32}$/.test(name)){
            setNameError('Name must be alphanumeric!')
            errors++
        }
        if(!/^[\w\d ]{1,32}$/.test(desc)){
            setDescError('Name must be alphanumeric!')
            errors++
        }
        if(permType === ''){
            setPermTypeError('Required')
            errors++
        }
        if(commandType === ''){
            setCommandTypeError('Required')
            errors++
        }
        if(errors) return
        const newCommand = {
            description: desc.trim(),
            type: commandType,
            permType: permType
        }
        let newCommandList = botContext.bot!
        if(props.selected[1] !== ''){
            delete newCommandList.config.commands[props.selected[1]]
            newCommandList.config.permissions = newCommandList.config.permissions.filter((perm: permission) => {
                return !(perm.command === props.selected[1] || perm.command === name.toLowerCase().trim())
            })
        }
        newCommandList.config.commands[name.toLowerCase().trim()] = newCommand
        botContext.setBot({...newCommandList})
        props.onClose()
    }

    return (
        <>
        {!props.open ? (
            <Dialog open={false}/>
            ) : (
            <Dialog
                open={true}
                onClose={() => props.onClose()}
                >
                <DialogTitle>{props.selected[0] === null ? "Add" : "Edit"} Command</DialogTitle>
                <DialogContent>
                <Grid container spacing={2} sx={{padding: '5px'}}>
                    <Grid item xs={4}>
                        <TextField
                            label="Command Name"
                            value={name}
                            helperText={nameError}
                            error={!!nameError}
                            onChange={(e) => setName(e.target.value)}
                            />
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <InputLabel>Command Type</InputLabel>
                            <Select
                                label="Command Type"
                                value={commandType}
                                error={!!commandTypeError}
                                onChange={(e) => setCommandType(e.target.value)}>
                                <MenuItem value="adjust">Adjust</MenuItem>
                                <MenuItem value="ban">Ban</MenuItem>
                                <MenuItem value="set">Set</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <InputLabel>Permission Type</InputLabel>
                            <Select
                                fullWidth
                                error={!!permTypeError}
                                label="Permission Type"
                                value={permType}
                                onChange={(e) => setPermType(e.target.value)}>
                                <MenuItem value="all">All</MenuItem>
                                <MenuItem value="rank">Rank</MenuItem>
                                <MenuItem value="role">Role</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Description"
                            value={desc}
                            error={!!descError}
                            helperText={descError}
                            onChange={(e) => setDesc(e.target.value)}
                            />
                    </Grid>
                </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSave}>
                        Save
                    </Button>
                    <Button onClick={() => props.onClose()}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
            )}
        </>
    )
}

export default CommandDialogController
