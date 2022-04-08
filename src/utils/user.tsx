export async function getUser(userid :string){
    try{
        const res = await fetch("http://web.localhost:8080/user/getUser", {
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
        const res = await fetch("http://web.localhost:8080/user/getReps", {
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
