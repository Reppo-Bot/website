import ENV_URL from "./env"

export async function getTotalUserCount(){
    try{
        const res = await fetch(`http://web.${ENV_URL}/homepage/getTotalUserCount`, {
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

export async function getTotalServerCount(){
    try{
        const res = await fetch(`http://web.${ENV_URL}/homepage/getTotalServerCount`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        if(res.status !== 200){
            throw new Error("Failed to get all servers!")
        }
        return (await res.json()).success
    }
    catch (e){
        console.log(e)
        return undefined
    }
}

export async function search(searchString: string){
    try{
        const res = await fetch(`http://web.${ENV_URL}/homepage/search`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                searchString
            })
        })
        if(res.status !== 200){
            throw new Error("Failed to get search results!")
        }
        // First array is servers, second is users
        return (await res.json()).success
    }
    catch (e){
        console.log(e)
        return undefined
    }
}

export async function getHourTransactions(){
    try{
        const res = await fetch(`http://web.${ENV_URL}/homepage/getHourTransactions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        if(res.status !== 200){
            throw new Error("Failed to get Hour Transactions!")
        }
        return (await res.json()).success
    }
    catch (e){
        console.log(e)
        return undefined
    }
}
