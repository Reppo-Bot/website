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

const BanOptions = (props: {command: command, index: number, permType: string, handleBack:()=>void, handleClose:()=>void}) => {
	const [amount, setAmount] = useState<string>('')
	const [amountError, setAmountError] = useState<string>('')
	const [cooldown, setCooldown] = useState<string>('')
	const [cooldownError, setCooldownError] = useState<string>('')
	const botContext = useContext(ConfigContext)
	const handleSave = () => {
		const _amount = parseInt(amount)
		const _cooldown = parseInt(cooldown)
		let errors = 0
		if(isNaN(_amount)){
			setAmountError("Must set amount!")
			errors += 1
		} else setAmountError('')
		if(isNaN(_cooldown) || _cooldown < -1){
			setCooldownError("Must set cooldown!")
			errors += 1
		} else setCooldownError('')
		if(errors) return
		if(botContext.bot === undefined) return
		const command = {
			...props.command,
			otherOptions: {
				amount: _amount,
				cooldown: _cooldown,
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
		!!amountError && setAmountError('')
	},[amount])
	useEffect(()=>{
		!!cooldownError && setCooldownError('')
	},[cooldown])
	useEffect(()=>{
		if(props.command.otherOptions === undefined){
			setAmount('')
			setCooldown('')
			return
		}
		const opts = props.command.otherOptions
		setAmount(opts.amount ? opts.amount.toString() : '')
		setCooldown(opts.cooldown ? opts.cooldown.toString() : '')
	},[props.command])
	return (
		<>
		<Grid sx={{padding: '10px'}} container spacing={2}>
			<Grid item xs={6}>
				<TextField
					onChange={(e)=> setAmount(e.target.value.replace(/[^\-0-9]|(\d\-)/g, ''))}
					label="Duration"
					helperText={amountError}
					error={!!amountError.length}
					value={amount}
					/>
			</Grid>
			<Grid item xs={6}>
				<TextField
					onChange={(e)=>setCooldown(e.target.value.replace(/[^\-0-9]|(\d\-)/g, ''))}
					label="Cooldown"
					helperText={cooldownError}
					error={!!cooldownError.length}
					value={cooldown}
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
export default BanOptions