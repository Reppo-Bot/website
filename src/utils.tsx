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
                primary: '#000000',
                secondary: '#000000'
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
                primary: '#ffffff',
                secondary: '#ffffff'
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

export async function login(accessToken: string, expiration: string){
    try{
        const res = await fetch("http://web.localhost:8080/global/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                timestamp: expiration
            })
        })
        if(res.status !== 200){
            throw new Error("Invalid Login")
        }
        return await res.json()
    }
    catch (e){
        console.log(e)
        return undefined
    }
}

export async function logout(accessToken: string){
    try{
        const res = await fetch("http://web.localhost:8080/global/logout", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${accessToken}`
            }
        })
        if(res.status !== 200){
            throw new Error("Failed to logout!")
        }
        return true
    }
    catch (e){
        console.log(e)
        return false
    }
}

export async function getTotalUserCount(){
    try{
        const res = await fetch("http://web.localhost:8080/homepage/getTotalUserCount", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        if(res.status !== 200){
            throw new Error("Failed to get all users!")
        }
        return (await res.json()).success
    }
    catch (e){
        console.log(e)
        return undefined
    }
}

