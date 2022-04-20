export type otherOptions = {
    cooldown?: number,
    maxAmount?: number,
    maxCalls?: number,
    minAmount?: number,
    amount?: number
}
export type command = {
    type: string,
    permType: string,
    description: string,
}
export type role = {
    name: string,
    roleid: string,
    priority: string
}
export type rank = {
    name: string,
    minRep: number
}
export type permission = {
    command: string,
    allowed: string,
    on: Array<string>,
    opts: otherOptions
}
