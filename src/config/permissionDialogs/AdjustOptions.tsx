import {
	TextField,
	Grid,
	DialogActions,
	Button,
} from "@mui/material"
import {command} from "./../../types"
import {useState, useEffect, useContext} from "react"
import {Add} from '@mui/icons-material'
import ConfigContext from "./../ConfigContext"

const AdjustOptions = (props: {command: command, index: number, permType: string, handleBack:()=>void, handleClose:()=>void}) => {
	const [amount, setAmount] = useState<string>('')
	const [amountError, setAmountError] = useState<string>('')
	const [cooldown, setCooldown] = useState<string>('')
	const [cooldownError, setCooldownError] = useState<string>('')
	const [maxCalls, setMaxCalls] = useState<string>('')
	const [maxCallsError, setMaxCallsError] = useState<string>('')
	const botContext = useContext(ConfigContext)

	const handleSave = () => {
		const _amount = parseInt(amount)
		const _cooldown = parseInt(cooldown)
		const _maxCalls = parseInt(maxCalls)
		let errors = 0
		if(isNaN(_amount)){
			setAmountError("Must set amount!")
			errors += 1
		} else setAmountError('')
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
				amount: _amount,
				cooldown: _cooldown,
				maxCalls: _maxCalls
			}
		}
		let newCommandList = botContext.bot.config.commands
		if(props.index === -2){
			newCommandList.push(command)
		} else newCommandList[props.index] = command
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
		!!amountError && setAmountError('')
	},[amount, amountError])
	useEffect(()=>{
		!!cooldownError && setCooldownError('')
	},[cooldown, cooldownError])
	useEffect(()=>{
		!!maxCallsError && setMaxCallsError('')
	},[maxCalls, maxCallsError])
	useEffect(()=>{
		if(props.command.otherOptions === undefined){
			setAmount('')
			setCooldown('')
			setMaxCalls('')
			return
		}
		const opts = props.command.otherOptions
		setAmount(opts.amount ? opts.amount.toString() : '')
		setCooldown(opts.cooldown ? opts.cooldown.toString() : '')
		setMaxCalls(opts.maxCalls ? opts.maxCalls.toString() : '')
	},[props.command])
	return (
		<>
		<Grid sx={{padding: '10px'}} container spacing={2}>
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
export default AdjustOptions
