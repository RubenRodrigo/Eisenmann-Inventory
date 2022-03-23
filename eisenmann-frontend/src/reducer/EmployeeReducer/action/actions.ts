import { Employee } from "@/interfaces/Employee"

export type EmployeeAction =
	| { type: 'loaded', payload: Employee[] }
	| { type: 'addEmployee', payload: Employee }
	| { type: 'removeEmployee', payload: number }
	| { type: 'updateEmployee', payload: Employee }

export const setLoadedEmployeeAction = (value: Employee[]): EmployeeAction => ({
	type: 'loaded',
	payload: value
})

export const addEmployeeAction = (value: Employee): EmployeeAction => ({
	type: 'addEmployee',
	payload: value
})

export const updateEmployeeAction = (value: Employee): EmployeeAction => ({
	type: 'updateEmployee',
	payload: value
})

export const removeEmployeeAction = (value: number): EmployeeAction => ({
	type: 'removeEmployee',
	payload: value
})


