export async function getServer(serverid :string){
    try{
        const res = await fetch("http://web.localhost:8080/server/getServer", {
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
