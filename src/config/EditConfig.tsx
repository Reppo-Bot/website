import ConfigContext from "./ConfigContext"
import PageContext from "./../PageContext"
import {
	Typography,
	Box,
	useTheme
} from "@mui/material"
import {useContext} from "react"

const EditConfig = () => {
	const botContext = useContext(ConfigContext)
	const context = useContext(PageContext)
	const theme = useTheme()
	return (
		<Box sx={{paddingLeft: "175px", marginLeft: "10px", paddingTop: "76px", color: (theme.palette.mode === "light" ? "white" : "black")}}>
			{botContext.bot !== undefined? (
			<>
				{console.log(botContext.bot)}
				<Typography variant="h3">
					{botContext.bot.config.name}
				</Typography>
				<Typography variant="h6">
					Ranks
				</Typography>
				{botContext.bot.config.ranks.map((rank: {name: string, minRep: number})=>
					<Typography key={rank.name} variant="body1">
						{rank.name}: {rank.minRep}
					</Typography>
				)}
				<Typography variant="h6">
					Roles
				</Typography>
				{botContext.bot.config.roles.map((role: {name: string, roleid: string, priority: number})=>
					<Typography key={role.name} variant="body1">
						{role.name}: {role.roleid}, {role.priority}
					</Typography>
				)}
				<Typography variant="h6">
					Commands
				</Typography>
				{botContext.bot.config.commands.map((command: {name: string, description: string, permissionsType: string, type: string, permissions: any})=>
					<Typography key={command.name} variant="body1">
						{command.name}: {command.description}, {command.type}
						{command.permissionsType}: {JSON.stringify(command.permissions)}
					</Typography>
				)}
			</>
				):(
			<Typography variant="h3">
				Select a bot
			</Typography>
				)}
		</Box>
	)
}

export default EditConfig
