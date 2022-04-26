import {
    Button,
    Paper,
    Alert,
    CircularProgress,
    Backdrop,
    AlertColor
} from "@mui/material"
import ConfigContext from "./ConfigContext"
import {useContext, useState} from 'react'
import {getBots, updateConfig} from "./../utils/config"
import PageContext from "./../PageContext"

const SubmitPane = () => {
    const botContext = useContext(ConfigContext)
    const context = useContext(PageContext)
    const [status, setStatus] = useState<AlertColor | null>(null)
    const [statusMessage, setStatusMessage] = useState<string>('')
    const resetStatus = () => {
        setTimeout(()=> setStatus(null), 5000)
        setTimeout(()=> setStatusMessage(''), 5000)
    }
    const handleCancel = () => {
        setStatus('warning')
        getBots(context.accessToken).then((bots: Bot[])=>{
            if(!bots){
                setStatus('error')
                setStatusMessage('Failed to grab config from database')
                resetStatus()
                return
            }
            // This maddness is so that oldbot is technically the same memory address as is in bots from
            // sidebar. This needs to be migrated to a state store later on
            const newBot =  bots.find((bot: Bot) => bot.serverid === botContext.bot!.serverid)
            const oldBot = botContext.bot!
            oldBot.config.ranks = newBot!.config.ranks
            oldBot.config.roles = newBot!.config.roles
            oldBot.config.commands = newBot!.config.commands
            oldBot.config.permissions = newBot!.config.permissions
            oldBot.updateStatus = "pending"
            botContext.setBot({...oldBot})
            setStatus('success')
            setStatusMessage('Successfully reverted to stored config')
            resetStatus()
        })
    }
    const handleSave = async () => {
        setStatus('warning')
        const res = await updateConfig(context.accessToken, botContext.bot!.serverid, botContext.bot!.config)
        if(res){
            setStatus('success')
            setStatusMessage('Successfully updated and registered config')
        } else{
            setStatus('error')
            setStatusMessage('Error updating config, reverting to currently stored config')
        }
        resetStatus()
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
            <Backdrop
                sx={{color: '#fff'}}
                open={status === 'warning'}
                >
                <CircularProgress color="inherit" />
            </Backdrop>
            {status !== null && status !== 'warning' ? (
                <>
                    <Alert sx={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        padding: '15px',
                        margin: '40px',
                        marginBottom: '120px'
                    }} severity={status}>{statusMessage}</Alert>
                </>
                    ): null}
        </>
    )
}

export default SubmitPane
