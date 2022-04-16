import {
    Typography,
    Button,
    Grid,
    IconButton
} from "@mui/material"
import ConfigContext from "./ConfigContext"
import React, {useContext, useState} from "react"
import {Delete, Add, Edit} from "@mui/icons-material"
import {permission} from "./../types"
import AddNewPermissionDialog from "./permissionDialogs/AddNewPermissionDialog"
import AdjustOptions from "./permissionDialogs/AdjustOptions"
import BanOptions from "./permissionDialogs/BanOptions"
import SetOptions from "./permissionDialogs/SetOptions"

const PermissionConfigPane = () => {
    const botContext = useContext(ConfigContext)
    const [selected, setSelected] = useState<[permission | null, number]>([null, -1])
    const [dialogState, setDialogState] = useState<boolean>(false)
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const determinDialog = () => {
        if(selected[0] === null || selected[1] === null) return null
        // take selected permission & find command with that name
        const command = botContext.bot!.config.commands[selected[0].command.toLowerCase()]
        if(command.type === 'adjust'){
            return <AdjustOptions index={selected[1]} permType={command.permType} open={dialogState} onClose={closeDialog}/>
        }
        if(command.type === 'ban'){
            return <BanOptions index={selected[1]} permType={command.permType} open={dialogState} onClose={closeDialog}/>
        }
        if(command.type === 'set'){
            return <SetOptions index={selected[1]} permType={command.permType} open={dialogState} onClose={closeDialog}/>
        }
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
