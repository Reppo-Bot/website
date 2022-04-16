type otherOptions = {
	cooldown?: number,
	maxAmount?: number,
	maxCalls?: number,
	minAmount?: number,
	amount?: number
}
export type command = {
	name: string,
	type: string,
	permissionsType: string,
	description: string,
	otherOptions?: otherOptions
	permissions?: Array<{options: otherOptions, allowed: string, allowedOn: Array<string>}>,
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
