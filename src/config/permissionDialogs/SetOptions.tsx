import {
	TextField,
	Grid,
	Dialog,
	DialogTitle,
	DialogActions,
	DialogContent,
	Button,
	IconButton
} from "@mui/material"
import {command} from "./../../types"
import {useState, useEffect, useContext} from "react"
import {Add} from '@mui/icons-material'
import ConfigContext from "./../ConfigContext"

const SetOptions = (props: {command: command, index: number, permType: string, handleBack:()=>void, handleClose:()=>void}) => {
	const [maxAmount, setMaxAmount] = useState<string>('')
	const [maxAmountError, setMaxAmountError] = useState<string>('')
	const [minAmount, setMinAmount] = useState<string>('')
	const [minAmountError, setMinAmountError] = useState<string>('')
	const [cooldown, setCooldown] = useState<string>('')
	const [cooldownError, setCooldownError] = useState<string>('')
	const [maxCalls, setMaxCalls] = useState<string>('')
	const [maxCallsError, setMaxCallsError] = useState<string>('')
	const botContext = useContext(ConfigContext)

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
		const command = {
			...props.command,
			otherOptions: {
				maxAmount: _maxAmount,
				minAmount: _minAmount,
				cooldown: _cooldown,
				maxCalls: _maxCalls
			}
		}
		let newCommandList = botContext.bot.config.commands
		newCommandList[props.index] = command
		botContext.setBot({
			...botContext.bot,
			config: {
				...botContext.bot.config,
				commands: newCommandList
			}
		})
		props.handleClose()

	}
	useEffect(()=>{
		!!maxAmountError && setMaxAmountError('')
	},[maxAmount])
	useEffect(()=>{
		!!minAmountError && setMinAmountError('')
	},[minAmount])
	useEffect(()=>{
		!!cooldownError && setCooldownError('')
	},[cooldown])
	useEffect(()=>{
		!!maxCallsError && setMaxCallsError('')
	},[maxCalls])
	useEffect(()=>{
		if(props.command.otherOptions === undefined) {
			setMaxAmount('')
			setMinAmount('')
			setCooldown('')
			setMaxCalls('')
			return
		}
		const opts = props.command.otherOptions
		setMaxAmount(opts.maxAmount ? opts.maxAmount.toString() : '')
		setMinAmount(opts.minAmount ? opts.minAmount.toString() : '')
		setCooldown(opts.cooldown ? opts.cooldown.toString() : '')
		setMaxCalls(opts.maxCalls ? opts.maxCalls.toString() : '')
	},[props.command])
	return (
		<>
		<Grid sx={{padding: '10px'}} container spacing={2}>
			<Grid item xs={3}>
				<TextField
					onChange={(e)=> setMaxAmount(e.target.value.replace(/[^\-0-9]|(\d\-)/g, ''))}
					label="Max Amount"
					helperText={maxAmountError}
					error={!!maxAmountError.length}
					value={maxAmount}
					/>
			</Grid>
			<Grid item xs={3}>
				<TextField
					onChange={(e)=> setMinAmount(e.target.value.replace(/[^\-0-9]|(\d\-)/g, ''))}
					label="Min Amount"
					helperText={minAmountError}
					error={!!minAmountError.length}
					value={minAmount}
					/>
			</Grid>
			<Grid item xs={3}>
				<TextField
					onChange={(e)=>setCooldown(e.target.value.replace(/[^\-0-9]|(\d\-)/g, ''))}
					label="Cooldown"
					helperText={cooldownError}
					error={!!cooldownError.length}
					value={cooldown}
					/>
			</Grid>
			<Grid item xs={3}>
				<TextField
					onChange={(e)=>setMaxCalls(e.target.value.replace(/[^\-0-9]|(\d\-)/g, ''))}
					label="Max Calls"
					helperText={maxCallsError}
					error={!!maxCallsError.length}
					value={maxCalls}
					/>
			</Grid>
			<Grid container justifyContent="center">
				{props.permType !== 'all' ? (
				<Button fullWidth variant="contained" >
					<Add/>
				</Button>
					) : null}
			</Grid>
		</Grid>
		<DialogActions>
			<Button sx={{marginRight: 'auto'}} onClick={props.handleBack}>
				Back
			</Button>
			<Button onClick={handleSave}>
				Save
			</Button>
			<Button onClick={props.handleClose}>
				Cancel
			</Button>
		</DialogActions>
		</>
	)
}
export default SetOptions
