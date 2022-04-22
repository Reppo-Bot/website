import {Box, Typography, useTheme} from "@mui/material"
import SearchBox from "./SearchBox"
import {useEffect} from "react"

const Home = () => {
    const theme = useTheme()
    useEffect(()=>{
        let color = theme.palette.text.primary
        if(theme.palette.mode === 'light'){
            color = theme.palette.secondary.main
        }
        document.body.style.background = color
    },[theme])
    return(
        <>
            <Box
                sx={{
                    bgcolor: theme.palette.background.default,
                    color: theme.palette.text.primary,
                    minHeight: '50vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                <div>
                    <Typography variant="h1"
                        sx={{
                            fontSize: '10em',
                            paddingBottom: '50px',
                            paddingTop: '75px'

                        }}>
                        Reppo
                    </Typography>
                    <SearchBox/>
                </div>
            </Box>
            <div style={{
                top: '0',
                left: '0',
                width: '100',
                overflow: 'hidden',
                lineHeight: '0',
            }}>
                <svg
                    style={{
                        position: 'relative',
                        display: 'block',
                        width: 'calc(149% + 1.3px)',
                        height: '366px'
                    }}
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none">
                    <path
                        style={{fill: theme.palette.background.default}}
                        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
                </svg>
            </div>
        </>
    )
}

export default Home
