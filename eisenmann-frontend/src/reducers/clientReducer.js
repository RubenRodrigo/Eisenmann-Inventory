import { types } from "../types/types"

export const clientList = (state = { clients: [] }, action) => {

	switch (action.type) {

		case types.clientSetData:
			return {
				...state,
				clients: [...action.payload]
			}

		case types.clientAddNew:
			return {
				...state,
				clients: [action.payload, ...state.clients]
			}

		case types.clientDeleted:
			return {
				...state,
				clients: state.clients.filter(e => e.id !== action.payload)
			}

		case types.clientUpdated:
			return {
				...state,
				clients: state.clients.map((e) => (e.id === action.payload.id) ? action.payload : e)
			}

		case types.clientClearData:
			return { clients: [] }

		default:
			return state

	}
}

export const clientActive = (state = { client: null, loading: true }, action) => {

	switch (action.type) {

		case types.clientSetActive:
			return {
				...state,
				loading: false,
				client: action.payload
			}

		case types.clientClearActive:
			return { client: null, loading: true }

		default:
			return state

	}
}

