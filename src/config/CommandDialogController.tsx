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
import {command} from "./../types"
import AdjustOptions from "./permissionDialogs/AdjustOptions"

const CommandDialogController = (props: {open: number, selected: command | null, onClose: () => void}) => {
	const [step, setStep] = useState<number>(0)
	const [command, setCommand] = useState<command | null>(props.selected)

	const [name, setName] = useState<string>('')
	const [nameError, setNameError] = useState<string>('')
	const [commandType, setCommandType] = useState<string>('')
	const [commandTypeError, setCommandTypeError] = useState<string>('')
	const [desc, setDesc] = useState<string>('')
	const [descError, setDescError] = useState<string>('')
	const [permType, setPermType] = useState<string>('all')
	const [permTypeError, setPermTypeError] = useState<string>('')
	const [permissionDialog, setPermissionDialog] = useState<any>(null)

	useEffect(()=>{
		!!nameError && setNameError('')
	},[name])
	useEffect(()=>{
		!!descError && setDescError('')
	},[desc])
	useEffect(()=>{
		!!permTypeError && setPermTypeError('')
	},[permType])
	useEffect(()=>{
		!!commandTypeError && setCommandTypeError('')
	},[commandType])

	useEffect(()=>{
		if(props.open === -1){
			setStep(0)
		}
		if(props.selected === null){
			setName('')
			setCommandType('')
			setDesc('')
			//setPermType('')
			return
		}
		setName(props.selected.name)
		setCommandType(props.selected.type)
		setDesc(props.selected.description)
		//setPermType(props.selected.permissionsType)
		setCommand(props.selected)
	},[props])

	const onNext = () => {
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
		if(errors) return false
		const newCommand = {
			...command,
			name: name.toLowerCase().trim(),
			description: desc.trim(),
			type: commandType,
			permissionsType: permType
		}
		if(commandType === 'adjust'){
			setPermissionDialog(<AdjustOptions
				command={newCommand}
				index={props.open}
				permType={permType}
				handleBack={()=>setStep(0)}
				handleClose={props.onClose}
			/>)
		}
		setCommand({
			...newCommand
		})
		return true
	}

	const handleNext = ()=>{
		if(!onNext()) return
		setStep(1)
		return
	}
	return (
		<>
		{props.open === -1 ? (
			<Dialog open={false}/>
			) : (
			<Dialog
				open={true}
				onClose={() => props.onClose()}
				>
				<DialogTitle>{props.selected === null ? "Add" : "Edit"} Command</DialogTitle>
				{!step ? (
					<>
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
								<MenuItem value="info">Info</MenuItem>
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
								disabled
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
					<Button onClick={handleNext}>
						Next
					</Button>
					<Button onClick={() => props.onClose()}>
						Cancel
					</Button>
				</DialogActions>
				</>
					):(
				<DialogContent>
						{permissionDialog}
				</DialogContent>
					)}
			</Dialog>
			)}
		</>
	)
}

export default CommandDialogController
