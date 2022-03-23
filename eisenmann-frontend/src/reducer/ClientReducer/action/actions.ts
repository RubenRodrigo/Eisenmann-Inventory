import { Client } from "@/interfaces/Client"

export type ClientAction =
	| { type: 'loaded', payload: Client[] }
	| { type: 'addClient', payload: Client }
	| { type: 'removeClient', payload: number }
	| { type: 'updateClient', payload: Client }

export const setLoadedClientAction = (value: Client[]): ClientAction => ({
	type: 'loaded',
	payload: value
})

export const addClientAction = (value: Client): ClientAction => ({
	type: 'addClient',
	payload: value
})

export const updateClientAction = (value: Client): ClientAction => ({
	type: 'updateClient',
	payload: value
})

export const removeClientAction = (value: number): ClientAction => ({
	type: 'removeClient',
	payload: value
})


