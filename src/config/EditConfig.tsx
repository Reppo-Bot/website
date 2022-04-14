import ConfigContext from "./ConfigContext"
import PageContext from "./../PageContext"
import {
	Typography,
	Box,
	useTheme,
	Paper,
	Grid,
} from "@mui/material"
import {styled} from "@mui/system"
import {useContext, useEffect} from "react"

const PrettyPaper = styled(Paper)({
	padding: '10px',
})

const EditConfig = () => {
	const botContext = useContext(ConfigContext)
	const context = useContext(PageContext)
	const theme = useTheme()
	useEffect(()=>{
		console.log(botContext.bot)
	},[botContext.bot])
	return (
		<Box sx={{
			paddingLeft: "175px",
			marginLeft: "10px",
			paddingTop: "100px",
			color: (theme.palette.mode === "light" ? "white" : "black")
		}}>
			{botContext.bot !== undefined? (
			<>
				<Grid container justifyContent='center'>
					<Typography variant="h3">
						{botContext.bot.config.name}
					</Typography>
				</Grid>
				<Grid container xs={12} spacing={4} sx={{padding: '20px'}}>
					<Grid item xs={4}>
						<PrettyPaper elevation={12}>
							<Typography variant="h6">
								Ranks
							</Typography>
							{botContext.bot.config.ranks.map((rank: {name: string, minRep: number})=>
								<Typography key={rank.name} variant="body1">
									{rank.name}: {rank.minRep}
								</Typography>
							)}
						</PrettyPaper>
					</Grid>
					<Grid item xs={4}>
						<PrettyPaper elevation={12}>
							<Typography variant="h6">
								Roles
							</Typography>
							{botContext.bot.config.roles.map((role: {name: string, roleid: string, priority: number})=>
								<Typography key={role.name} variant="body1">
									{role.name}: {role.roleid}, {role.priority}
								</Typography>
							)}
						</PrettyPaper>
					</Grid>
					<Grid item xs={4}>
						<PrettyPaper elevation={12}>
							<Typography variant="h6">
								Commands
							</Typography>
							{botContext.bot.config.commands.map((command: {name: string, description: string, permissionsType: string, type: string, permissions: any})=>
								<Typography key={command.name} variant="body1">
									{command.name}: {command.description}, {command.type}
									{command.permissionsType}: {JSON.stringify(command.permissions)}
								</Typography>
							)}
						</PrettyPaper>
					</Grid>
				</Grid>
			</>
				):(
		<Grid container justifyContent='center'>
			<Typography variant="h3">
				Select a bot
			</Typography>
		</Grid>
				)}
		</Box>
	)
}

export default EditConfig
