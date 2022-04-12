import {Typography} from "@mui/material"
import PageContext from "./PageContext"
import {useContext, useEffect} from "react"
import { useNavigate } from "react-router-dom";

const Config = () => {
    const navigate = useNavigate()
	const context = useContext(PageContext)
	return (
		<>
			<Typography variant="h1" sx={{paddingTop: 20}}>
				Hello world
			</Typography>
		</>
	)
}

export default Config
