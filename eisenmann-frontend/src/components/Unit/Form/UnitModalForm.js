import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'

import { AnnotationIcon } from '@heroicons/react/outline'


import Modal from '../../Modal/Modal'
import { TextField } from '../../ui/TextField'
import { uiCloseTypeModal, uiCloseUnitModal } from '../../../actions/ui'
import { unitStartCreate, unitStartUpdate } from '../../../actions/unit'

export const UnitModalForm = () => {

	const dispatch = useDispatch()
	const { open } = useSelector(state => state.uiUnitModal)
	const { unit } = useSelector(state => state.unitActive)

	const { register, handleSubmit, setValue, formState: { errors } } = useForm();

	useEffect(() => {
		if (unit) {
			setValue('name', unit.name, { shouldValidate: true })
			setValue('description', unit.description, { shouldValidate: true })
			setValue('abr', unit.abr, { shouldValidate: true })
		} else {
			setValue('name', "", { shouldValidate: true })
			setValue('description', "", { shouldValidate: true })
			setValue('abr', "", { shouldValidate: true })
		}
	}, [setValue, unit])

	// Save data from modal.
	const handleSubmitModalForm = (data) => {
		if (unit) {
			data.id = unit.id
			dispatch(unitStartUpdate(data))
		} else {
			dispatch(unitStartCreate(data))
		}
		dispatch(uiCloseUnitModal())
	}

	return (
		<div>
			<Modal open={open} setOpen={() => dispatch(uiCloseUnitModal())} >
				<form onSubmit={handleSubmit(handleSubmitModalForm)}>
					{/* Modal Header */}
					<div className="bg-gray-50 px-4 py-3 sm:px-6 ">
						<h3 className="text-2xl">Añadir nueva Unidad</h3>
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
							<div className="mb-5">
								<label className="mb-2 block text-md text-gray-600">Descripcion</label>
								<TextField
									type="text"
									placeholder="Descripcion"
									name="description"
									register={register}
									required
									error={errors.description}
								>
									<AnnotationIcon className="h-5 self-center pl-2" />
								</TextField>
								{errors.description && <span className="text-red-500 text-sm">Este campo es requerido</span>}
							</div>
							<div className="mb-5">
								<label className="mb-2 block text-md text-gray-600">Abreviacion</label>
								<TextField
									type="text"
									placeholder="Abreviacion"
									name="abr"
									register={register}
									required
									error={errors.abr}
								>
									<AnnotationIcon className="h-5 self-center pl-2" />
								</TextField>
								{errors.abr && <span className="text-red-500 text-sm">Este campo es requerido</span>}
							</div>
						</div>
					</div>

					{/* Modal Footer */}
					<div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
						<button
							type="button"
							className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
							onClick={() => dispatch(uiCloseTypeModal())}
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
