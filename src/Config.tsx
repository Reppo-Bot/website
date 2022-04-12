import {Typography} from "@mui/material"
import PageContext from "./PageContext"
import {useContext, useEffect} from "react"

const Config = () => {
	const context = useContext(PageContext)

	return (
		<>
			<Typography variant="h1">
				Hello world
			</Typography>
		</>
	)
}

export default Config
