import { types } from "../types/types"

export const typeList = (state = { types: [] }, action) => {

	switch (action.type) {

		case types.typeSetData:
			return {
				...state,
				types: [...action.payload]
			}

		case types.typeAddNew:
			return {
				...state,
				types: [action.payload, ...state.types]
			}

		case types.typeDeleted:
			return {
				...state,
				types: state.types.filter(e => e.id !== action.payload)
			}

		case types.typeUpdated:
			return {
				...state,
				types: state.types.map((e) => (e.id === action.payload.id) ? action.payload : e)
			}

		case types.typeClearData:
			return { types: [] }


		default:
			return state

	}
}

export const typeActive = (state = { type: null, loading: true }, action) => {

	switch (action.type) {

		case types.typeSetActive:
			return {
				...state,
				loading: false,
				type: action.payload
			}

		case types.typeClearActive:
			return { type: null, loading: true }

		default:
			return state

	}
}
