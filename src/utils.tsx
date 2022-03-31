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
