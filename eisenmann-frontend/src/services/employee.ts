import { axiosInstanceServerSide } from "@/helpers/axiosInstance"
import { EmployeeBase } from "@/interfaces/Employee"

interface Props {
	token: string;
}

interface GetEmployeeListProps extends Props {
	queryParams?: string;
}
export const getEmployeeList = async ({ token, queryParams }: GetEmployeeListProps) => {
	return await axiosInstanceServerSide(token).get(
		'/employee/employee/' + (queryParams !== undefined ? queryParams : '')
	)
}

interface CreateEmployeeProps extends Props {
	employee: EmployeeBase;
}
export const createEmployeeService = async ({ token, employee }: CreateEmployeeProps) => {
	return await axiosInstanceServerSide(token).post('/employee/employee/', {
		...employee
	})
}

interface UpdateEmployeeProps extends Props {
	id: number;
	employee: EmployeeBase;
}
export const updateEmployeeService = async ({ token, id, employee }: UpdateEmployeeProps) => {
	return await axiosInstanceServerSide(token).put(`/employee/employee/${id}/`, {
		...employee
	})
}

interface DeleteEmployeeProps extends Props {
	id: number;
}
export const deleteEmployeeService = async ({ token, id }: DeleteEmployeeProps) => {
	return await axiosInstanceServerSide(token).delete(`/employee/employee/${id}/`)
}