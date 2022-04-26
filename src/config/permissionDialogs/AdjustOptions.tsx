import {
    TextField,
    Grid,
    DialogActions,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    Typography,
    SelectChangeEvent
} from "@mui/material"
import {useState, useEffect, useContext} from "react"
import ConfigContext from "./../ConfigContext"
import AllowedForm from "./AllowedForm"

const AdjustOptions = (props: {open: boolean, index: number, permType: string, onClose:()=>void}) => {
    const [amount, setAmount] = useState<string>('')
    const [amountError, setAmountError] = useState<string>('')
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
        const _amount = parseInt(amount)
        const _cooldown = parseInt(cooldown)
        const _maxCalls = parseInt(maxCalls)
        let errors = 0
        if(isNaN(_amount)){
            setAmountError("Must set amount!")
            errors ++
        } else setAmountError('')
        if(isNaN(_cooldown) || _cooldown < -1){
            setCooldownError("Must set cooldown!")
            errors ++
        } else setCooldownError('')
        if(isNaN(_maxCalls) || _maxCalls < 0){
            setMaxCallsError("Must max calls must be greater than 0!")
            errors ++
        } else setMaxCallsError('')
        if(props.permType !== 'all' && allowed === ''){
            setAllowedError(`Must select allowed ${props.permType}`)
            errors++
        }
        if(errors) return
        if(botContext.bot === undefined) return
        const opts = {
            amount: _amount,
            cooldown: _cooldown,
            maxCalls: _maxCalls
        }
        const newPermissionsList = botContext.bot!
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
        setAmountError('')
    },[amount])
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
        setAmount(perm.opts.amount ?? '')
        setCooldown(perm.opts.cooldown ?? '')
        setMaxCalls(perm.opts.maxCalls ?? '')
    },[props, botContext.bot])
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
            <Grid item xs={4}>
                <TextField
                    onChange={(e)=> setAmount(e.target.value.replace(/[^-0-9]|(\d-)/g, ''))}
                    label="Adjust Amount"
                    helperText={amountError}
                    error={!!amountError.length}
                    value={amount}
                    />
            </Grid>
            <Grid item xs={4}>
                <TextField
                    onChange={(e)=>setCooldown(e.target.value.replace(/[^-0-9]|(\d-)/g, ''))}
                    label="Cooldown"
                    helperText={cooldownError}
                    error={!!cooldownError.length}
                    value={cooldown}
                    />
            </Grid>
            <Grid item xs={4}>
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
export default AdjustOptions
