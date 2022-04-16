import {
	Typography,
	Button,
	Grid,
	IconButton
} from "@mui/material"
import ConfigContext from "./ConfigContext"
import React, {useContext, useState} from "react"
import {Delete, Add, Edit} from "@mui/icons-material"
import CommandDialog from "./CommandDialog"
import RoleDialog from "./RoleDialog"
import RankDialog from "./RankDialog"
import {permission} from "./../types"
import AddNewPermissionDialog from "./permissionDialogs/AddNewPermissionDialog"

type configType = 'Ranks' | 'Roles'
const PermissionConfigPane = () => {
	const botContext = useContext(ConfigContext)
	const [selected, setSelected] = useState<[permission | null, number]>([null, -1])
	const [dialogState, setDialogState] = useState<boolean>(false)
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const determinDialog = () => {
		return null
	}
	const handleAddClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget)
		setDialogState(true)
	}
	const closeDialog = () => {
		setSelected([null, -1])
		setDialogState(false)
		setAnchorEl(null)
	}
	const openDialog = (permItem: permission | null, index: number) => {
		setDialogState(true)
		setSelected([permItem, index])
	}
	const handleDelete = (index: number) =>{
		let newCommandList = botContext.bot!
		delete newCommandList.config.permissions[index]
		botContext.setBot({...newCommandList})
		return
	}

	return (
		<>
			<Grid container>
				<Grid container justifyContent="center">
					<Typography variant="h4">
						Permissions
					</Typography>
				</Grid>
				{botContext.bot!.config.permissions.map((perm: permission, index: number)=>
					<React.Fragment key={index}>
						<Grid item xs={6}>
							<Typography variant="h6">
								{perm.command[0].toUpperCase() + perm.command.slice(1)}
							</Typography>
						</Grid>
						<Grid item xs={6}>
							<Grid container justifyContent="flex-end">
								<Button onClick={() => openDialog(perm, index)}>
									<Edit/>
								</Button>
								<IconButton onClick={() => handleDelete(index)}>
									<Delete/>
								</IconButton>
							</Grid>
						</Grid>
					</React.Fragment>
				)}
				<Grid container justifyContent="flex-end" >
					<IconButton onClick={handleAddClick}>
						<Add/>
					</IconButton>
				</Grid>
			</Grid>
			<AddNewPermissionDialog anchor={anchorEl} open={dialogState} onClose={closeDialog}/>
			{determinDialog()}
		</>
	)
}

export default PermissionConfigPane
