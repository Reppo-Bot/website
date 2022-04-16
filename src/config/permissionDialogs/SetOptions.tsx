import {
    TextField,
    Grid,
    DialogActions,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    Typography,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    SelectChangeEvent
} from "@mui/material"
import {command, rank, role} from "./../../types"
import {useState, useEffect, useContext} from "react"
import {Add} from '@mui/icons-material'
import ConfigContext from "./../ConfigContext"
import AllowedForm from "./AllowedForm"

const SetOptions = (props: {open: boolean, index: number, permType: string, onClose:()=>void}) => {
    const [maxAmount, setMaxAmount] = useState<string>('')
    const [maxAmountError, setMaxAmountError] = useState<string>('')
    const [minAmount, setMinAmount] = useState<string>('')
    const [minAmountError, setMinAmountError] = useState<string>('')
    const [cooldown, setCooldown] = useState<string>('')
    const [cooldownError, setCooldownError] = useState<string>('')
    const [maxCalls, setMaxCalls] = useState<string>('')
    const [maxCallsError, setMaxCallsError] = useState<string>('')
    const [allowed, setAllowed] = useState<string>('')
    const [allowedOn, setAllowedOn] = useState<string[]>([])
    const [allowedError, setAllowedError] = useState<string>('')
    const botContext = useContext(ConfigContext)
    const handleAllowedOnChange = (event: SelectChangeEvent<string>) => {
        const {target: { value },} = event;
        setAllowedOn(typeof value === 'string' ? value.split(',') : value);
    };
    const handleSave = () => {
        const _maxAmount = parseInt(maxAmount)
        const _minAmount = parseInt(minAmount)
        const _cooldown = parseInt(cooldown)
        const _maxCalls = parseInt(maxCalls)
        let errors = 0
        if(isNaN(_maxAmount)){
            setMaxAmountError("Must set amount!")
            errors += 1
        } else setMaxAmountError('')
        if(isNaN(_minAmount)){
            setMinAmountError("Must set amount!")
            errors += 1
        } else setMinAmountError('')
        if(isNaN(_cooldown) || _cooldown < -1){
            setCooldownError("Must set cooldown!")
            errors += 1
        } else setCooldownError('')
        if(isNaN(_maxCalls) || _maxCalls <= 0){
            setMaxCallsError("Must max calls must be greater than 0!")
            errors += 1
        } else setMaxCallsError('')
        if(errors) return
        if(botContext.bot === undefined) return
        const opts = {
            maxAmount: _maxAmount,
            minAmount: _minAmount,
            cooldown: _cooldown,
            maxCalls: _maxCalls
        }
        let newPermissionsList = botContext.bot!
        if(props.permType !== 'all'){
            newPermissionsList.config.permissions[props.index].allowed = allowed
            newPermissionsList.config.permissions[props.index].on = allowedOn
        } else {
            newPermissionsList.config.permissions[props.index].allowed = 'all'
            newPermissionsList.config.permissions[props.index].on = []
        }
        newPermissionsList.config.permissions[props.index].opts = opts
        botContext.setBot({...newPermissionsList})
        props.onClose()
    }
    useEffect(()=>{
        setMaxAmountError('')
    },[maxAmount])
    useEffect(()=>{
        setMinAmountError('')
    },[minAmount])
    useEffect(()=>{
        setCooldownError('')
    },[cooldown])
    useEffect(()=>{
        setMaxCallsError('')
    },[maxCalls])
    useEffect(()=>{
        setAllowedError('')
    },[allowed])
    useEffect(()=>{
        const perm = botContext.bot!.config.permissions[props.index]
        setAllowed(perm.allowed)
        setAllowedOn(perm.on)
        setMaxAmount(perm.opts.maxAmount ? perm.opts.maxAmount.toString() : '')
        setMinAmount(perm.opts.minAmount ? perm.opts.minAmount.toString() : '')
        setCooldown(perm.opts.cooldown ? perm.opts.cooldown.toString() : '')
        setMaxCalls(perm.opts.maxCalls ? perm.opts.maxCalls.toString() : '')
    },[props])
    return (
        <Dialog
            open={props.open}
            onClose={props.onClose}
        >
        <DialogTitle>{botContext.bot!.config.permissions[props.index].command[0].toUpperCase() + botContext.bot!.config.permissions[props.index].command.slice(1)}</DialogTitle>
        <DialogContent>
        <Grid sx={{padding: '10px'}} container spacing={2}>
            <AllowedForm
                permType={props.permType}
                allowed={allowed}
                allowedError={allowedError}
                allowedOn={allowedOn}
                handleAllowedOnChange={handleAllowedOnChange}
                setAllowed={setAllowed}
                />
            <Grid item xs={12}>
                 <Typography>
                    Options
                </Typography>
            </Grid>
            <Grid item xs={3}>
                <TextField
                    onChange={(e)=> setMaxAmount(e.target.value.replace(/[^-0-9]|(\d-)/g, ''))}
                    label="Max Amount"
                    helperText={maxAmountError}
                    error={!!maxAmountError.length}
                    value={maxAmount}
                    />
            </Grid>
            <Grid item xs={3}>
                <TextField
                    onChange={(e)=> setMinAmount(e.target.value.replace(/[^-0-9]|(\d-)/g, ''))}
                    label="Min Amount"
                    helperText={minAmountError}
                    error={!!minAmountError.length}
                    value={minAmount}
                    />
            </Grid>
            <Grid item xs={3}>
                <TextField
                    onChange={(e)=>setCooldown(e.target.value.replace(/[^-0-9]|(\d-)/g, ''))}
                    label="Cooldown"
                    helperText={cooldownError}
                    error={!!cooldownError.length}
                    value={cooldown}
                    />
            </Grid>
            <Grid item xs={3}>
                <TextField
                    onChange={(e)=>setMaxCalls(e.target.value.replace(/[^-0-9]|(\d-)/g, ''))}
                    label="Max Calls"
                    helperText={maxCallsError}
                    error={!!maxCallsError.length}
                    value={maxCalls}
                    />
            </Grid>
        </Grid>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleSave}>
                Save
            </Button>
            <Button onClick={props.onClose}>
                Cancel
            </Button>
        </DialogActions>
        </Dialog>
    )
}
export default SetOptions
