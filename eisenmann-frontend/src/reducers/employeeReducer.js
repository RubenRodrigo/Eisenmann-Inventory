import { types } from "../types/types"

export const employeeList = (state = { employees: [] }, action) => {

	switch (action.type) {

		case types.employeeSetData:
			return {
				...state,
				employees: [...action.payload]
			}

		case types.employeeAddNew:
			return {
				...state,
				employees: [action.payload, ...state.employees]
			}

		case types.employeeDeleted:
			return {
				...state,
				employees: state.employees.filter(e => e.id !== action.payload)
			}

		case types.employeeUpdated:
			return {
				...state,
				employees: state.employees.map((e) => (e.id === action.payload.id) ? action.payload : e)
			}

		case types.employeeClearData:
			return { employees: [] }

		default:
			return state

	}
}

export const employeeActive = (state = { employee: null, loading: true }, action) => {

	switch (action.type) {

		case types.employeeSetActive:
			return {
				...state,
				loading: false,
				employee: action.payload
			}

		case types.employeeClearActive:
			return { employee: null, loading: true }

		default:
			return state

	}
}
