import {
    Button,
    Paper,
    Alert,
    CircularProgress,
    Backdrop
} from "@mui/material"
import ConfigContext, {bot} from "./ConfigContext"
import {useContext, useState} from 'react'
import {getBots, updateConfig} from "./../utils/config"
import PageContext from "./../PageContext"

const SubmitPane = () => {
    const botContext = useContext(ConfigContext)
    const context = useContext(PageContext)
    const [status, setStatus] = useState<string | null>(null)
    const [statusMessage, setStatusMessage] = useState<string>('')
    const resetStatus = () => {
        setTimeout(()=> setStatus(null), 5000)
        setTimeout(()=> setStatusMessage(''), 5000)
    }
    const handleCancel = () => {
        setStatus('loading')
        getBots(context.accessToken).then((bots: bot[])=>{
            if(!bots){
                setStatus('error')
                setStatusMessage('Failed to grab config from database')
                resetStatus()
                return
            }
            // This maddness is so that oldbot is technically the same memory address as is in bots from
            // sidebar. This needs to be migrated to a state store later on
            let newBot =  bots.find((bot: bot) => bot.serverid === botContext.bot!.serverid)
            let oldBot = botContext.bot!
            oldBot.config.ranks = newBot!.config.ranks
            oldBot.config.roles = newBot!.config.roles
            oldBot.config.commands = newBot!.config.commands
            oldBot.config.permissions = newBot!.config.permissions
            botContext.setBot({...oldBot})
            setStatus('success')
            setStatusMessage('Successfully reverted to stored config')
            resetStatus()
        })
    }
    const handleSave = async () => {
        setStatus('loading')
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
                open={status === 'loading'}
                >
                <CircularProgress color="inherit" />
            </Backdrop>
            {status !== null && status !== 'loading' ? (
                <>
                    <Alert sx={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        padding: '15px',
                        margin: '40px',
                        marginBottom: '120px'
                    // @ts-expect-error
                    }} severity={status}>{statusMessage}</Alert>
                </>
                    ): null}
        </>
    )
}

export default SubmitPane
