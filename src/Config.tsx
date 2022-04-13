import {Typography} from "@mui/material"
import PageContext from "./PageContext"
import {useContext, useEffect, useState} from "react"
import { useNavigate } from "react-router-dom";
import Sidebar from "./config/Sidebar"
import ConfigContext, {bot} from "./config/ConfigContext"

const Config = () => {
    const navigate = useNavigate()
	const context = useContext(PageContext)
	const [bot, _setBot] = useState<bot | undefined>(undefined)
	const setBot = (bot: bot) => {_setBot(bot)}
	return (
		<>
			<ConfigContext.Provider value={{
				bot: bot,
				setBot: setBot
			}}>
				<Sidebar/>
			</ConfigContext.Provider>
		</>
	)
}

export default Config
