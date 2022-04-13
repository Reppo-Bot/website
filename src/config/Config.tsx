import {Typography, useTheme} from "@mui/material"
import PageContext from "./../PageContext"
import {useContext, useEffect, useState} from "react"
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar"
import ConfigContext, {bot} from "./ConfigContext"
import EditConfig from "./EditConfig"
const Config = () => {
    const theme = useTheme();
    const navigate = useNavigate()
	const context = useContext(PageContext)
	const [bot, _setBot] = useState<bot | undefined>(undefined)
	const setBot = (bot: bot) => {_setBot(bot)}
	const prettyCorner = (
	<>
		<div style={{
			position: 'absolute',
			background: 'white',
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
