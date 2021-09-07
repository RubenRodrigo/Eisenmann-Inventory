import { types } from "../types/types"

export const unitList = (state = { units: [] }, action) => {

	switch (action.type) {

		case types.unitSetData:
			return {
				...state,
				units: [...action.payload]
			}

		case types.unitAddNew:
			return {
				...state,
				units: [action.payload, ...state.units]
			}

		case types.unitDeleted:
			return {
				...state,
				units: state.units.filter(e => e.id !== action.payload)
			}

		case types.unitUpdated:
			return {
				...state,
				units: state.units.map((e) => (e.id === action.payload.id) ? action.payload : e)
			}

		case types.unitClearData:
			return { units: [] }

		default:
			return state

	}
}

export const unitActive = (state = { unit: null, loading: true }, action) => {

	switch (action.type) {

		case types.unitSetActive:
			return {
				...state,
				loading: false,
				unit: action.payload
			}

		case types.unitClearActive:
			return { unit: null, loading: true }

		default:
			return state

	}
}
