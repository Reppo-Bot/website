import ENV_URL from "./env"

export async function getConfig(token: string, serverid :string){
    try{
        const res = await fetch(`http://web.${ENV_URL}/private/getConfig`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                serverid
                })
        })
        if(res.status !== 200){
            const payload = await res.json()
            throw new Error(payload.failed)
        }
        return (await res.json()).success
    }
    catch (e){
        console.log(e)
        return undefined
    }
}

export async function getBots(token: string){
    try{
        const res = await fetch(`http://web.${ENV_URL}/private/getBots`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            }
        })
        if(res.status !== 200){
            const payload = await res.json()
            throw new Error(payload.failed)
        }
        return (await res.json()).success
    }
    catch (e){
        console.log(e)
        return undefined
    }
}

export async function addServer(token: string, serverid: string){
    try{
        const res = await fetch(`http://web.${ENV_URL}/private/addServer`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                serverid
            })
        })
        if(res.status !== 200){
            const payload = await res.json()
            throw new Error(payload.failed)
        }
        return (await res.json()).success
    }
    catch (e){
        console.log(e)
        return undefined
    }
}

export async function removeServer(token: string, serverid: string){
    try{
        const res = await fetch(`http://web.${ENV_URL}/private/removeServer`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                serverid
            })
        })
        if(res.status !== 200){
            const payload = await res.json()
            throw new Error(payload.failed)
        }
        return (await res.json()).success
    }
    catch (e){
        console.log(e)
        return undefined
    }
}

export async function updateConfig(token: string, serverid: string, config: object){
    try{
        const res = await fetch(`http://web.${ENV_URL}/private/updateConfig`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                serverid,
                config
            })
        })
        if(res.status !== 200){
            const payload = await res.json()
            throw new Error(payload.failed)
        }
        return (await res.json()).success
    }
    catch (e){
        console.log(e)
        return undefined
    }
}
