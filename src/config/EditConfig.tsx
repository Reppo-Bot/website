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
import ConfigPane from './ConfigPane'

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
			{botContext.bot !== undefined ? (
			<>
				<Grid container justifyContent='center'>
					<Typography variant="h3">
						{botContext.bot.config.name}
					</Typography>
				</Grid>
				<Grid container xs={12} justifyContent="space-around" spacing={4} sx={{padding: '20px'}}>
					<Grid item xs={3}>
						<PrettyPaper elevation={12}>
							<ConfigPane type="Ranks"/>
						</PrettyPaper>
					</Grid>
					<Grid item xs={3}>
						<PrettyPaper elevation={12}>
							<ConfigPane type="Roles"/>
						</PrettyPaper>
					</Grid>
					<Grid item xs={3}>
						<PrettyPaper elevation={12}>
							<ConfigPane type="Commands"/>
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
