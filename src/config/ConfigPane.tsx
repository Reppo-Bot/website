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
import RoleDialog from "./RoleDialog"
import RankDialog from "./RankDialog"
import {command} from "./../types"

type configType = 'Ranks' | 'Roles' | 'Commands'
const ConfigPane = (props: {type: configType}) => {
	const botContext = useContext(ConfigContext)
	const [selected, setSelected] = useState<any>(null)
	const [open, setOpen] = useState<number>(-1)
	const ThisTypeDialog = () =>{
		const _type = props.type.toLowerCase()
		if(_type === 'commands'){
			return <CommandDialogController open={open} selected={selected} onClose={closeDialog}/>
		}
		if(_type === 'ranks'){
			return <RankDialog open={open} selected={selected} onClose={closeDialog}/>
		}
		if(_type === 'roles'){
			return <RoleDialog open={open} selected={selected} onClose={closeDialog}/>
		}
	}
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
		if(props.type.toLowerCase() === 'commands'){
			let newCommandList = botContext.bot.config.commands
			delete newCommandList[index]
			botContext.setBot({
				...botContext.bot,
				config: {
					...botContext.bot.config,
					commands: newCommandList
				}
			})
			return
		}
		if(props.type.toLowerCase() === 'roles'){
			let newrolesList = botContext.bot.config.roles
			delete newrolesList[index]
			botContext.setBot({
				...botContext.bot,
				config: {
					...botContext.bot.config,
					roles: newrolesList
				}
			})
			return
		}
		if(props.type.toLowerCase() === 'ranks'){
			let newRanksList = botContext.bot.config.ranks
			delete newRanksList[index]
			botContext.setBot({
				...botContext.bot,
				config: {
					...botContext.bot.config,
					ranks: newRanksList
				}
			})
			return
		}
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
					<IconButton onClick={()=>openDialog(null,-2)}>
						<Add/>
					</IconButton>
				</Grid>
			</Grid>
			{ThisTypeDialog()}
		</>
	)
}

export default ConfigPane
