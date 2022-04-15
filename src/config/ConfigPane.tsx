import {
	Typography,
	Button,
	Grid,
	IconButton
} from "@mui/material"
import ConfigContext from "./ConfigContext"
import {useContext} from "react"
import {Delete, Add, Edit} from "@mui/icons-material"

type rank = {name: string, minRep: number}
type configType = 'Ranks' | 'Roles' | 'Commands'
const ConfigPane = (props: {type: configType}) => {
	const botContext = useContext(ConfigContext)
	if(botContext.bot === undefined){
		return null
	}
	return (
		<>
			<Grid container xs={12}>
				<Grid container justifyContent="center" xs={12}>
					<Typography variant="h4">
						{props.type}
					</Typography>
				</Grid>
				{botContext.bot.config[props.type.toLowerCase()].map((conf: {name : string})=>
					<>
						<Grid item xs={6}>
						<Typography variant="h6">
							{conf.name[0].toUpperCase() + conf.name.slice(1)}
						</Typography>
						</Grid>
						<Grid container justifyContent="flex-end" xs={6}>
							<Button>
								<Edit/>
							</Button>
							<IconButton>
								<Delete/>
							</IconButton>
						</Grid>
					</>
				)}
				<Grid container justifyContent="center" >
					<IconButton>
						<Add/>
					</IconButton>
				</Grid>
			</Grid>
		</>
	)
}

export default ConfigPane
