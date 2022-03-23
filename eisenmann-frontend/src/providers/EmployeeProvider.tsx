import React, { useReducer } from 'react'
import { getSession } from 'next-auth/react'

import { EmployeeContext } from '@/context/EmployeeContext'
import { Employee, EmployeeBase } from '@/interfaces/Employee'
import { employeeReducer } from '@/reducer/EmployeeReducer/state/employeeReducer'
import { addEmployeeAction, removeEmployeeAction, setLoadedEmployeeAction, updateEmployeeAction } from "@/reducer/EmployeeReducer/action/actions"
import { useLayout } from '@/hooks/useLayout'
import { createEmployeeService, deleteEmployeeService, updateEmployeeService } from 'src/services/employee'
import axios from 'axios'

const { Provider } = EmployeeContext

interface Props {
	children: JSX.Element | JSX.Element[];
	INITIAL_STATE: Employee[]
}
export const EmployeeProvider = ({ children, INITIAL_STATE }: Props) => {


	const { handleOpenToast, handleToastInfo } = useLayout()
	const [employeeState, dispatch] = useReducer(employeeReducer, {
		employees: INITIAL_STATE,
	})

	const setLoadedEmployees = (value: Employee[]) => {
		dispatch(setLoadedEmployeeAction(value))
	}
	const addEmployee = async (value: EmployeeBase) => {
		try {
			const session = await getSession()
			if (session) {
				const res = await createEmployeeService({ token: session.accessToken, employee: value })
				if (res.status === 201) {
					handleToastInfo({
						code: res.status,
						message: 'El empleado se creo correctamente.'
					})
					dispatch(addEmployeeAction(res.data))
				}
			}
		} catch (err) {
			if (axios.isAxiosError(err)) {
				handleToastInfo({
					code: err.response ? err.response.status : 500,
					message: 'Hubo un error'
				})
			}
			console.log(err);
		} finally {
			handleOpenToast()
		}
	}
	const updateEmployee = async (value: EmployeeBase, id: number) => {
		try {
			const session = await getSession()
			if (session) {
				const res = await updateEmployeeService({ token: session.accessToken, employee: value, id })
				if (res.status === 200) {
					handleToastInfo({
						code: res.status,
						message: 'El empleado se actualizo correctamente.'
					})
					dispatch(updateEmployeeAction(res.data))
				}
			}
		} catch (err) {
			if (axios.isAxiosError(err)) {
				handleToastInfo({
					code: err.response ? err.response.status : 500,
					message: 'Hubo un error'
				})
			}
			console.log(err);
		} finally {
			handleOpenToast()
		}
	}
	const removeEmployee = async (value: number) => {
		try {
			const session = await getSession()
			if (session) {
				const res = await deleteEmployeeService({ token: session.accessToken, id: value })
				if (res.status === 204) {
					handleToastInfo({
						code: res.status,
						message: 'El empleado se elimino correctamente.'
					})
					dispatch(removeEmployeeAction(value))
				}
			}
		} catch (err) {
			if (axios.isAxiosError(err)) {
				handleToastInfo({
					code: err.response ? err.response.status : 500,
					message: 'Hubo un error'
				})
			}
			console.log(err);
		} finally {
			handleOpenToast()
		}
	}

	return (
		<Provider value={{
			employeeState,
			setLoadedEmployees,
			addEmployee,
			updateEmployee,
			removeEmployee,
		}}>
			{children}
		</Provider>
	)
}