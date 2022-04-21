interface otherOptions {
    cooldown?: number,
    maxAmount?: number,
    maxCalls?: number,
    minAmount?: number,
    amount?: number
}
interface command {
    type: string,
    permType: string,
    description: string,
}
interface role {
    name: string,
    roleid: string,
    priority: string
}
interface rank {
    name: string,
    minRep: number
}
interface permission {
    command: string,
    allowed: string,
    on: Array<string>,
    opts: otherOptions
}
