import { EmployeeContext } from "@/context/EmployeeContext"
import { useContext } from "react"

export const useEmployee = () => {
	const { employeeState, setLoadedEmployees, addEmployee, updateEmployee, removeEmployee } = useContext(EmployeeContext)
	const { employees } = employeeState
	return {
		employees,
		setLoadedEmployees,
		addEmployee,
		updateEmployee,
		removeEmployee
	}
}
