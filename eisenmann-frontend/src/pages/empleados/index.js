import { PlusIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { employeeClearActive, employeeClearData, employeeSetData } from '../../actions/employee';
import { uiOpenEmployeeModal } from '../../actions/ui';
import { EmployeeModalForm } from '../../components/Employee/Form/EmployeeModalForm';
import { TableEmployee } from '../../components/Employee/Table/TableEmployee'
import { fetchSinToken } from '../../helpers/fetch';

export async function getServerSideProps() {
	const resp = await fetchSinToken(`employee`);
	const initialState = await resp.json();

	return {
		props: { initialState }
	}

}

const Employee = ({ initialState }) => {
	const dispatch = useDispatch()

	// Set data in the store
	useEffect(() => {
		dispatch(employeeSetData(initialState))
		return () => {
			dispatch(employeeClearData())
		}
	}, [dispatch, initialState])

	return (
		<>
			<Navigation />
			<div>
				<TableEmployee />
			</div>
		</>
	)
}

const Navigation = () => {

	const dispatch = useDispatch()

	const handleOpenModal = () => {
		dispatch(employeeClearActive())
		dispatch(uiOpenEmployeeModal())
	}

	return (
		<div className="flex justify-between">
			<EmployeeModalForm />
			<div>
				<h1 className="text-3xl	font-semibold">Lista de Empleados</h1>
			</div>
			<div>
				<button
					onClick={handleOpenModal}
					className="bg-blue-800 px-3 py-2 rounded-lg block hover:bg-blue-900 transition duration-300"
				>
					<div className="flex text-white ">
						<PlusIcon className="h-5 w-5 self-center" />
						<span className="pl-2 font-semibold">Nuevo Empleado</span>
					</div>
				</button>
			</div>
		</div>
	)
}

export default Employee
