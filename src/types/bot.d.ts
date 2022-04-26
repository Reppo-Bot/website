interface Bot {
    config: {
        defaultRep: number,
        name: string,
        permissions: Array[permission],
        ranks: Array[rank],
        roles: Array[role],
        commands: Array[command]
    },
    createdAt: Date,
    ownerid: string,
    serveravatar: string,
    serverid: string,
    servername: string,
    updateStatus: string,
    updatedAt: string
}
