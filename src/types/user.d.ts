interface User {
    avatar: string,
    discordid: string,
    id: string,
    name: string
}

interface Rep {
    locked: boolean,
    rep: int,
    serverid: string,
    unlocktime?: string,
    userid: string
}
interface Server {
    avatar: string,
    id: string,
    name: string
}
