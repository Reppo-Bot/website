import {PaletteMode} from "@mui/material"

export async function getUser(accessToken: string, tokenType: string) {
    try{
        const res = await fetch('https://discord.com/api/users/@me', {
            headers: {
                authorization: `${tokenType} ${accessToken}`
            }
        })
        if(res.status !== 200){
            throw new Error("Request failed!")
        }
        return await res.json()
    }
    catch (e){
        return undefined
    }
}

export const getDesignTokens = (mode: PaletteMode)=> ({
    palette: {
        mode,
        ...(mode === 'light' ? {
            // Light Mode Colors
            primary: {
                main: '#4851c3'
            },
            secondary: {
                main: '#3a48e8'
            },
            text: {
                primary: '#ffffff',
                secondary: '#ffffff'
            },
            background: {
                default: '#fdfcff',
                paper: '#fdfcff'
            },
            error: {
                main: '#be002d'
            },
            success: {
                main: '#6fdc8e'
            }
        } : {
            // Dark mode colors
            primary: {
                main :'#bcc2ff'
            },
            secondary: {
                main: '#bcc2ff'
            },
            text: {
                primary: '#111a95',
                secondary: '#0001ad'
            },
            background: {
                default: '#1a1c1e',
                paper: '#1a1c1e'
            },
            error: {
                main: '#be002d'
            },
            success: {
                main: '#6fdc8e'
            }
        })
    }
})
