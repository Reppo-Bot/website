import {useState, useContext, useEffect} from "react"
import {
    Box,
    Typography,
    Button,
    useTheme,
    Backdrop,
    CircularProgress
} from "@mui/material"
import {getBots} from "./../utils/config"
import PageContext from "./../PageContext"
import ConfigContext from "./ConfigContext"

const Sidebar = () => {
    const theme = useTheme();
    const context = useContext(PageContext)
    const botContext = useContext(ConfigContext)
    const [bots, setBots] = useState<any>(undefined)
    const [loading, setLoading] = useState<boolean>(true)
    useEffect(()=>{
        getBots(context.accessToken).then((bots)=>{
            setBots(bots)
            setLoading(false)
        })
    },[context.accessToken])
    if(loading){
        return (
            <Backdrop
                sx={{ color: '#fff'}}
                open={loading}
                >
                <CircularProgress color="inherit" />
            </Backdrop>
        )
    }
    return (
        <Box component="div" sx={{
                position: "fixed",
                width: '175px',
                bgcolor: theme.palette.background.default,
                height: '100%',
                color: theme.palette.text.primary,
                overflowX: 'hidden',
                marginTop: '76px',
            }}>

            {bots.length ? (
                <>
                <Typography variant="h6" sx={{paddingLeft: '10px'}}>
                    Bot List
                </Typography>
                {bots.map((bot: any)=>
                    <div key={bot.serverid}>
                        <Button fullWidth onClick={() => botContext.setBot(bot)} sx={{color: theme.palette.text.primary}}>
                            {bot.config.name}
                        </Button>
                    </div>
                )}
            </>
            ):(
            <Typography variant="h6" sx={{paddingLeft: '10px'}}>
                No Bots!
            </Typography>
            )}

        </Box>
    )
}

export default Sidebar