import {useTheme} from "@mui/material"
import {useEffect, useState} from "react"
import Sidebar from "./Sidebar"
import ConfigContext, {bot} from "./ConfigContext"
import EditConfig from "./EditConfig"
import {permission, rank, role} from "./../types"
const Config = () => {
    const theme = useTheme();
    const [bot, _setBot] = useState<bot | undefined>(undefined)
    const setBot = (bot: bot) => {
        bot.config.permissions.sort((a:permission, b:permission)=>{
            if(a.command < b.command) return -1
            if(a.command > b.command) return 1
            return 0
        })
        bot.config.roles.sort((a:role, b:role)=>{
            if(a.name < b.name) return -1
            if(a.name > b.name) return 1
            return 0
        })
        bot.config.ranks.sort((a:rank, b:rank)=>{
            if(a.name < b.name) return -1
            if(a.name > b.name) return 1
            return 0
        })
        _setBot(bot)
    }
    useEffect(()=>{
        let color = theme.palette.text.primary
        if(theme.palette.mode === 'light'){
            color = theme.palette.secondary.main
        }
        document.body.style.background = color
    },[theme])
    const prettyCorner = (
    <>
        <div style={{
            position: 'absolute',
            background: theme.palette.mode === "light" ? theme.palette.secondary.main : "white",
            borderRadius: '25px 0 0 0',
            width: '100px',
            height: '100px',
            marginLeft: '175px',
            marginTop: '76px',
            zIndex: -1
        }}/>
        <div style={{
            position: 'absolute',
            background: theme.palette.background.default,
            width: '100px',
            height: '100px',
            marginLeft: '175px',
            marginTop: '76px',
            zIndex: -2
        }}/>
    </>
    )
    return (
        <>
            <ConfigContext.Provider value={{
                bot: bot,
                setBot: setBot
            }}>
                <Sidebar/>
                {prettyCorner}
                <EditConfig/>
            </ConfigContext.Provider>
        </>
    )
}

export default Config
