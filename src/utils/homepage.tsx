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

export async function getTotalServerCount(){
    try{
        const res = await fetch("http://web.localhost:8080/homepage/getTotalServerCount", {
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
        const res = await fetch("http://web.localhost:8080/homepage/search", {
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
        const res = await fetch("http://web.localhost:8080/homepage/getHourTransactions", {
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
