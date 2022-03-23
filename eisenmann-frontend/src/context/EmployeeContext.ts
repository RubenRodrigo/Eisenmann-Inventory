import { createContext } from "react";

import { Employee, EmployeeBase } from "@/interfaces/Employee";
import { EmployeeState } from "@/reducer/EmployeeReducer/interfaces/interfaces";

type EmployeeContextProps = {
	employeeState: EmployeeState
	setLoadedEmployees: (value: Employee[]) => void
	addEmployee: (value: EmployeeBase) => Promise<void>
	updateEmployee: (value: EmployeeBase, id: number) => Promise<void>
	removeEmployee: (id: number) => Promise<void>
}

export const EmployeeContext = createContext<EmployeeContextProps>({} as EmployeeContextProps);