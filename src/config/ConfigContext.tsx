import React from "react"
export type bot = {
	config: any,
	ownerid: string,
	serveravatar: string,
	serverid: string
}
interface botConfig {
	bot?: bot;
	setBot: (bot: bot)=>void;
}
const ConfigContext = React.createContext<botConfig>({
	setBot: (bot: bot)=>{}
})
export default ConfigContext
