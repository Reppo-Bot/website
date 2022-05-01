import ENV_URL from "./env"

export async function getServer(serverid :string){
    try{
        const res = await fetch(`${ENV_URL}/server/getServer`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
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

export async function getTopUsers(serverid :string, num: number){
    try{
        const res = await fetch(`${ENV_URL}/server/getTopUsers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                serverid,
                num
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

export async function getActivityForDay(serverid :string){
    try{
        const res = await fetch(`${ENV_URL}/server/getActivityForDay`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
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

export async function getActivityForMonth(serverid :string){
    try{
        const res = await fetch(`${ENV_URL}/server/getActivityForMonth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
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

export async function getActivityForYear(serverid :string){
    try{
        const res = await fetch(`${ENV_URL}/server/getActivityForYear`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
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

