import React, { useEffect, useState } from 'react'

import Modal from '../../Modal/Modal'
import { useForm } from 'react-hook-form'
import { Select } from '../../ui/Select'
import { useDispatch, useSelector } from 'react-redux'
import { uiCloseProductStockModal } from '../../../actions/ui'
import { productClearData, productStartLoadingData } from '../../../actions/product'
import { TextField } from '../../ui/TextField'
import { CalculatorIcon } from '@heroicons/react/outline'
import { productStockStartCreate, productStockStartUpdate } from '../../../actions/productStock'

export const ProductStockModalForm = () => {

	const dispatch = useDispatch()
	const { modalOpen } = useSelector(state => state.uiProductStockModal)
	const { products } = useSelector(state => state.productList)
	const { productStock } = useSelector(state => state.productStockActive)

	const { register, handleSubmit, setValue, formState: { errors } } = useForm();

	useEffect(() => {
		if (productStock) {
			setValue('product', productStock.product_detail?.id, { shouldValidate: true })
			setValue('medium_value', productStock.medium_value, { shouldValidate: true })
			setValue('minium_value', productStock.minium_value, { shouldValidate: true })
		} else {
			setValue('product', 0, { shouldValidate: true })
			setValue('medium_value', 30, { shouldValidate: true })
			setValue('minium_value', 15, { shouldValidate: true })
		}
	}, [setValue, productStock])

	// Save data from modal.
	const handleSubmitModalForm = (data) => {
		if (productStock) {
			data.id = productStock.id
			delete data.product
			dispatch(productStockStartUpdate(data, false))
		} else {
			dispatch(productStockStartCreate(data))
		}
		dispatch(uiCloseProductStockModal())
	}

	return (
		<div>
			<Modal open={modalOpen} setOpen={() => dispatch(uiCloseProductStockModal())} >
				<form onSubmit={handleSubmit(handleSubmitModalForm)}>
					{/* Modal Header */}
					<div className="bg-gray-50 px-4 py-3 sm:px-6 ">
						<h3 className="text-2xl">Producto Stock</h3>
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
									disabled={productStock?.id ? true : false}
									error={errors.product}
								>
									<option
										value={0}
										disabled
									>
										Selecciona una opcion
									</option>
									{
										products.map((product, index) => (
											<option
												key={product.id}
												value={product.id}
											>
												{product.name}
											</option>
										))
									}
								</Select>
								{errors.product && <span className="text-red-500 text-sm">Este campo es requerido</span>}
							</div>
							<div className="mb-5">
								<label className="mb-2 block text-md text-gray-600">Valor medio</label>
								<TextField
									type="number"
									placeholder="30"
									name="medium_value"
									register={register}
									required
									error={errors.medium_value}
								>
									<CalculatorIcon className="h-5 self-center pl-2" />
								</TextField>
								{errors.medium_value && <span className="text-red-500 text-sm">Este campo es requerido</span>}
							</div>
							<div className="mb-5">
								<label className="mb-2 block text-md text-gray-600">Valor minimo</label>
								<TextField
									type="number"
									placeholder="15"
									name="minium_value"
									register={register}
									required
									error={errors.minium_value}
								>
									<CalculatorIcon className="h-5 self-center pl-2" />
								</TextField>
								{errors.minium_value && <span className="text-red-500 text-sm">Este campo es requerido</span>}
							</div>
						</div>
					</div>

					{/* Modal Footer */}
					<div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
						<button
							type="button"
							className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
							onClick={() => dispatch(uiCloseProductStockModal())}
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
