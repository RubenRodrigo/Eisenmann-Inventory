import React, { useEffect, useState } from 'react'

import { AnnotationIcon, CalculatorIcon } from '@heroicons/react/outline'
import { TextField } from '../../ui/TextField'
import Modal from '../../Modal/Modal'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { Select } from '../../ui/Select'

export const ServiceProductModal = ({ open, setOpen, initialValues, handleSubmitForm }) => {

	const { productStocks } = useSelector(state => state.productStockList)
	const { employees } = useSelector(state => state.employeeList)
	const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();

	const watchProduct = watch("product", initialValues.product); // you can supply default value as second argument
	const watchQuantity = watch("quantity", initialValues.quantity); // you can supply default value as second argument
	const [price, setPrice] = useState(0)
	const [total, setTotal] = useState(0)

	useEffect(() => {
		setValue('product', initialValues.product, { shouldValidate: true })
		setValue('employee', initialValues.employee, { shouldValidate: true })
		setValue('description', initialValues.description, { shouldValidate: true })
		setValue('quantity', initialValues.quantity, { shouldValidate: true })
	}, [setValue, initialValues])

	useEffect(() => {
		if (initialValues.id) {
			if (watchQuantity) {
				const product = productStocks.find(e => e.id == initialValues.product)

				const unitPrice = product.current_price ? product.current_price : 0

				setPrice(unitPrice)

				const totalPrice = parseFloat(unitPrice) * parseFloat(watchQuantity)
				setTotal(totalPrice)
			} else {
				setPrice(0)
				setTotal(0)
			}

		} else {
			if (watchProduct && watchQuantity) {
				console.log(watchProduct);
				if (watchProduct > 0) {
					const product = productStocks.find(e => e.id == watchProduct)

					const unitPrice = product.current_price ? product.current_price : 0

					setPrice(unitPrice)

					const totalPrice = parseFloat(unitPrice) * parseFloat(watchQuantity)
					setTotal(totalPrice)
				} else {
					setPrice(0)
					setTotal(0)
				}
			}
		}
	}, [initialValues.id, initialValues.product, productStocks, watchProduct, watchQuantity])

	return (
		<div>
			<Modal open={open} setOpen={setOpen} >
				<form onSubmit={handleSubmit(handleSubmitForm)}>
					{/* Modal Header */}
					<div className="bg-gray-50 px-4 py-3 sm:px-6 ">
						<h3 className="text-2xl">Añadir Producto</h3>
					</div>

					{/* Modal Body */}
					<div className="bg-white px-6 py-4">
						<div className="pb-5">
							<div className="mb-5">
								<label className="mb-2 block text-md text-gray-600">Producto</label>
								<Select
									name="product"
									register={register}
									required
									disabled={initialValues.id ? true : false}
									error={errors.product}
								>
									<option
										value={0}
										disabled
									>
										Selecciona una opcion
									</option>
									{
										productStocks.map((product) => (
											<option
												key={product.id}
												value={product.id}
												disabled={product.total_stock <= 0 ? true : false}
											>
												{product.product_detail?.name}
											</option>
										))
									}
								</Select>
								{errors.product && <span className="text-red-500 text-sm">Este campo es requerido</span>}
							</div>
							<div className="mb-5">
								<label className="mb-2 block text-md text-gray-600">Empleado</label>
								<Select
									name="employee"
									register={register}
									required
									error={errors.empoloyee}
								>
									<option
										value={0}
										disabled
									>
										Selecciona una opcion
									</option>
									{
										employees.map((employee) => (
											<option
												key={employee.id}
												value={employee.id}
											>
												{employee.name}
											</option>
										))
									}
								</Select>
								{errors.employee && <span className="text-red-500 text-sm">Este campo es requerido</span>}
							</div>
							<div className="mb-5">
								<label className="mb-2 block text-md text-gray-600">Cantidad</label>
								<TextField
									type="number"
									placeholder="15"
									name="quantity"
									register={register}
									required
									error={errors.quantity}
								>
									<CalculatorIcon className="h-5 self-center pl-2" />
								</TextField>
								{errors.quantity && <span className="text-red-500 text-sm">Este campo es requerido</span>}
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
						</div>
						<div className="pb-5">
							<div className="grid grid-cols-2 gap-4">
								<div className="col-span-1">
									<label className="mb-2 block text-lg text-gray-600">Precio Unitario</label>
									<p className="border-b border-black pb-2"><span>S/.</span> {price}</p>
								</div>
								<div className="col-span-1">
									<label className="mb-2 block text-lg text-gray-600">Sub Total</label>
									<p className="border-b border-black pb-2"><span>S/.</span> {total}</p>
								</div>
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
		</div>
	)
}
