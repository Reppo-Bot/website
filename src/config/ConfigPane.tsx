import {
	Typography,
	Button,
	Grid,
	IconButton
} from "@mui/material"
import ConfigContext from "./ConfigContext"
import React, {useContext, useState} from "react"
import {Delete, Add, Edit} from "@mui/icons-material"
import CommandDialogController from "./CommandDialogController"
import {command} from "./../types"

type rank = {name: string, minRep: number}
type configType = 'Ranks' | 'Roles' | 'Commands'
const ConfigPane = (props: {type: configType}) => {
	const botContext = useContext(ConfigContext)
	const [selected, setSelected] = useState<command|null>(null)
	const [open, setOpen] = useState<number>(-1)
	const closeDialog = () => {
		setSelected(null)
		setOpen(-1)
	}
	const openDialog = (command: command | null, index: number) => {
		setSelected(command)
		setOpen(index)
	}
	const handleDelete = (index: number) =>{
		if(botContext.bot === undefined) return
		let newCommandList = botContext.bot.config.commands
		newCommandList.splice(index)
		botContext.setBot({
			...botContext.bot,
			config: {
				...botContext.bot.config,
				commands: newCommandList
			}
		})
	}
	if(botContext.bot === undefined){
		return null
	}

	return (
		<>
			<Grid container>
				<Grid container justifyContent="center">
					<Typography variant="h4">
						{props.type}
					</Typography>
				</Grid>
				{botContext.bot.config[props.type.toLowerCase()].map((conf: command, index: number)=>
					<React.Fragment key={conf.name}>
						<Grid item xs={6}>
							<Typography variant="h6">
								{conf.name[0].toUpperCase() + conf.name.slice(1)}
							</Typography>
						</Grid>
						<Grid item xs={6}>
							<Grid container justifyContent="flex-end">
								<Button onClick={() => openDialog(conf, index)}>
									<Edit/>
								</Button>
								<IconButton onClick={() => handleDelete(index)}>
									<Delete/>
								</IconButton>
							</Grid>
						</Grid>
					</React.Fragment>
				)}
				<Grid container justifyContent="center" >
					<IconButton onClick={()=>openDialog(null,0)}>
						<Add/>
					</IconButton>
				</Grid>
			</Grid>
		<CommandDialogController open={open} selected={selected} onClose={closeDialog}/>
		</>
	)
}

export default ConfigPane
