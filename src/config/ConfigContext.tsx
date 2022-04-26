import React from "react"
interface botConfig {
    bot?: Bot;
    setBot: (bot: Bot)=>void;
}
const ConfigContext = React.createContext<botConfig>({
    setBot: (bot: Bot)=>{return null}
})
export default ConfigContext
