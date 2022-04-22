import ENV_URL from "./env"

export async function getUser(userid :string){
    try{
        const res = await fetch(`http://web.${ENV_URL}/user/getUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            	userid
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

export async function getReps(userid :string){
    try{
        const res = await fetch(`http://web.${ENV_URL}/user/getReps`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userid
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

export async function getRecentTransactions(userid :string, num: number){
    try{
        const res = await fetch(`http://web.${ENV_URL}/user/getRecentTransactions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userid,
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

export async function getActivityForDay(userid :string){
    try{
        const res = await fetch(`http://web.${ENV_URL}/user/getActivityForDay`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userid
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

export async function getActivityForMonth(userid :string){
    try{
        const res = await fetch(`http://web.${ENV_URL}/user/getActivityForMonth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userid
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

export async function getActivityForYear(userid :string){
    try{
        const res = await fetch(`http://web.${ENV_URL}/user/getActivityForYear`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userid
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
