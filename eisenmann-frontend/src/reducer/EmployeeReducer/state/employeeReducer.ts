import { EmployeeAction } from "../action/actions"
import { EmployeeState } from "../interfaces/interfaces"

export const employeeReducer = (state: EmployeeState, action: EmployeeAction): EmployeeState => {
	const { employees } = state

	switch (action.type) {
		case 'loaded':
			return {
				...state,
				employees: action.payload,
			}
		case 'addEmployee':
			return {
				...state,
				employees: [
					action.payload,
					...employees,
				]
			}
		case 'updateEmployee':
			return {
				...state,
				employees: employees.map(e => (e.id === action.payload.id) ? action.payload : e)
			}
		case 'removeEmployee':
			return {
				...state,
				employees: employees.filter(e => e.id !== action.payload)
			}
		default:
			return state;
	}
}
