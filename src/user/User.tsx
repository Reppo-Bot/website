import {useEffect} from 'react'
import {
    useTheme
} from "@mui/material"

const User = () => {
    const theme = useTheme()
    useEffect(()=>{
        document.body.style.background = theme.background.secondary
    },[theme])
    return (
        <div>
        </div>
    )
}

export default User
