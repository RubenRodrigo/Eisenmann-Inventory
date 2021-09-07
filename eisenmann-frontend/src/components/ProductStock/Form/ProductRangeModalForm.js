import { CalculatorIcon } from '@heroicons/react/outline'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Modal from '../../Modal/Modal'
import { TextField } from '../../ui/TextField'

export const ProductRealModalForm = ({ open, setOpen, initialValues, handleSubmitForm }) => {
	const { register, handleSubmit, setValue, formState: { errors } } = useForm();

	useEffect(() => {
		setValue('real_stock', initialValues.real)
	}, [setValue, initialValues])

	return (
		<Modal open={open} setOpen={setOpen}>
			<form onSubmit={handleSubmit(handleSubmitForm)}>

				{/* Modal Header */}
				<div className="bg-gray-50 px-4 py-3 sm:px-6 ">
					<h3 className="text-2xl">Stock Real</h3>
				</div>

				{/* Modal Body */}
				<div className="bg-white px-6 py-4">
					<div className="pb-5">
						<div className="mb-5">
							<label className="mb-2 block text-md text-gray-600">Real</label>
							<TextField
								type="number"
								placeholder="00"
								name="real_stock"
								register={register}
								required
								error={errors.real_stock}
							>
								<CalculatorIcon className="h-5 self-center pl-2" />
							</TextField>
							{errors.real_stock && <span className="text-red-500 text-sm">Este campo es requerido</span>}
						</div>
					</div>
				</div>

				{/* Modal Footer */}
				<div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
					<button
						type="button"
						className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
						onClick={() => setOpen(false)}
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
	)
}
