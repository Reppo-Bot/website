import {useContext, useEffect} from "react"
import {useNavigate} from "react-router-dom";
import PageContext from "./PageContext"
import {Typography} from "@mui/material"

const Gatekeeper = (props:any) =>{
	const navigate = useNavigate()
	const context = useContext(PageContext)
	useEffect(()=>{
		if(context.accessToken === ''){
			navigate('/')
		}
	},[context.accessToken, navigate])
	return (
		<>
			{context.accessToken === '' ? (
				<Typography variant="h1" sx={{paddingTop: 20}}>
					403 Unathorized
				</Typography>
				):(
				<>
					{props.children}
				</>
			)}
		</>
	)
}
export default Gatekeeper
