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
import {command} from "./../types"

type configType = 'Ranks' | 'Roles'
const BasicConfigPane = () => {
    const botContext = useContext(ConfigContext)
    const [selected, setSelected] = useState<[command | null, string]>([null, ''])
    const [dialogOpen, setDialogOpen] = useState<boolean>(false)
    const closeDialog = () => {
        setSelected([null, ''])
        setDialogOpen(false)
    }
    const openDialog = (configItem: command | null, name: string) => {
        setDialogOpen(true)
        setSelected([configItem, name])
    }
    const handleDelete = (name: string) =>{
        let newCommandList = botContext.bot!
        delete newCommandList.config.commands[name]
        botContext.setBot({...newCommandList})
        return
    }
    if(botContext.bot === undefined){
        return null
    }
    return (
        <>
            <Grid container>
                <Grid container justifyContent="center">
                    <Typography variant="h4">
                        Commands
                    </Typography>
                </Grid>
                {Object.keys(botContext.bot.config.commands).sort().map((key: string)=>
                    <React.Fragment key={key}>
                        <Grid item xs={6}>
                            <Typography variant="h6">
                                {key[0].toUpperCase() + key.slice(1)}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Grid container justifyContent="flex-end">
                                <Button onClick={() => openDialog(botContext.bot!.config.commands[key], key)}>
                                    <Edit/>
                                </Button>
                                <IconButton onClick={() => handleDelete(key)}>
                                    <Delete/>
                                </IconButton>
                            </Grid>
                        </Grid>
                    </React.Fragment>
                )}
                <Grid container justifyContent="center" >
                    <IconButton onClick={()=>openDialog(null, '')}>
                        <Add/>
                    </IconButton>
                </Grid>
            </Grid>
            <CommandDialog open={dialogOpen} selected={selected} onClose={closeDialog}/>
        </>
    )
}

export default BasicConfigPane
