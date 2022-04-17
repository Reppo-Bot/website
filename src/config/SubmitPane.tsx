import {
    Typography,
    Button,
    Paper
} from "@mui/material"
import ConfigContext, {bot} from "./ConfigContext"
import {useContext} from 'react'
import {getBots} from "./../utils/config"
import PageContext from "./../PageContext"

const SubmitPane = () => {
    const botContext = useContext(ConfigContext)
    const context = useContext(PageContext)
    const handleCancel = () => {
        getBots(context.accessToken).then((bots: bot[])=>{
            // This maddness is so that oldbot is technically the same memory address as is in bots from
            // sidebar. This needs to be migrated to a state store later on
            let newBot =  bots.find((bot: bot) => bot.serverid === botContext.bot!.serverid)
            let oldBot = botContext.bot!
            oldBot.config.ranks = newBot!.config.ranks
            oldBot.config.roles = newBot!.config.roles
            oldBot.config.commands = newBot!.config.commands
            oldBot.config.permissions = newBot!.config.permissions
            botContext.setBot({...oldBot})
        })
    }
    const handleSave = () => {
        console.log(botContext.bot)
    }
    if(!botContext.bot){
        return null
    }

    return (
        <>
            <Paper elevation={12} sx={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                padding: '15px',
                margin: '40px'
            }}>
                <Button onClick={handleSave} sx={{marginRight: '10px'}} disableElevation variant='contained'>
                    Save changes
                </Button>
                <Button onClick={handleCancel} disableElevation variant='contained'>
                    Cancel changes
                </Button>
            </Paper>
        </>
    )
}

export default SubmitPane
