import { ClientAction } from "../action/actions"
import { ClientState } from "../interfaces/interfaces"

export const clientReducer = (state: ClientState, action: ClientAction): ClientState => {
	const { clients } = state

	switch (action.type) {
		case 'loaded':
			return {
				...state,
				clients: action.payload,
			}
		case 'addClient':
			return {
				...state,
				clients: [
					action.payload,
					...clients,
				]
			}
		case 'updateClient':
			return {
				...state,
				clients: clients.map(e => (e.id === action.payload.id) ? action.payload : e)
			}
		case 'removeClient':
			return {
				...state,
				clients: clients.filter(e => e.id !== action.payload)
			}
		default:
			return state;
	}
}
