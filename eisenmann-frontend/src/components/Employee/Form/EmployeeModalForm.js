import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'

import { AnnotationIcon } from '@heroicons/react/outline'

import { uiCloseEmployeeModal } from '../../../actions/ui'

import Modal from '../../Modal/Modal'
import { TextField } from '../../ui/TextField'
import { employeeStartCreate, employeeStartUpdate } from '../../../actions/employee'

export const EmployeeModalForm = () => {

	const dispatch = useDispatch()
	const { open } = useSelector(state => state.uiEmployeeModal)
	const { employee } = useSelector(state => state.employeeActive)

	const { register, handleSubmit, setValue, formState: { errors } } = useForm();

	useEffect(() => {
		if (employee) {
			setValue('name', employee.name, { shouldValidate: true })
		} else {
			setValue('name', "", { shouldValidate: true })
		}
	}, [setValue, employee])

	// Save data from modal.
	const handleSubmitModalForm = (data) => {
		if (employee) {
			data.id = employee.id
			dispatch(employeeStartUpdate(data))
		} else {
			dispatch(employeeStartCreate(data))
		}
		dispatch(uiCloseEmployeeModal())
	}

	return (
		<div>
			<Modal open={open} setOpen={() => dispatch(uiCloseEmployeeModal())} >
				<form onSubmit={handleSubmit(handleSubmitModalForm)}>
					{/* Modal Header */}
					<div className="bg-gray-50 px-4 py-3 sm:px-6 ">
						<h3 className="text-2xl">Añadir nuevo Empleado</h3>
					</div>

					{/* Modal Body */}
					<div className="bg-white px-6 py-4">
						<div className="pb-5">
							<div className="mb-5">
								<label className="mb-2 block text-md text-gray-600">Nombre</label>
								<TextField
									type="text"
									placeholder="Nombre"
									name="name"
									register={register}
									required
									error={errors.name}
								>
									<AnnotationIcon className="h-5 self-center pl-2" />
								</TextField>
								{errors.name && <span className="text-red-500 text-sm">Este campo es requerido</span>}
							</div>
						</div>
					</div>

					{/* Modal Footer */}
					<div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
						<button
							type="button"
							className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
							onClick={() => dispatch(uiCloseEmployeeModal())}
						>
							Cancel
						</button>
						<button
							type="submit"
							className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
						>
							Guardar
						</button>
					</div>
				</form>
			</Modal>
		</div>
	)
}
