import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import moment from 'moment'
import { PlusIcon, TrashIcon } from '@heroicons/react/outline'

import { ProductEntryModalForm } from '../Form/ProductEntryModalForm'
import { productStockStartAddEntry, productStockStartDeleteEntry } from '../../../actions/productEntry'

export const ProductEntryTable = () => {

	const dispatch = useDispatch()
	const { productStock } = useSelector(state => state.productStockActive)

	const {
		id,
		name,
		product_entry
	} = { ...productStock }

	const initialState = {
		stock: 20,
		description: name,
		unit_price: 10,
	}

	const [open, setOpen] = useState(false)
	const [formValues, setFormValues] = useState(initialState)

	const handleAddEntryProduct = () => {
		setFormValues(initialState)
		setOpen(true)
	}

	const handleDeleteEntryProduct = (entry_id) => {
		dispatch(productStockStartDeleteEntry(id, entry_id))
	}

	const handleSubmitForm = (data) => {
		data.product = id
		data.init_stock = data.stock
		dispatch(productStockStartAddEntry(data))
		setOpen(false)
	}

	return (
		<div className="shadow-md p-4">
			<ProductEntryModalForm
				open={open}
				setOpen={setOpen}
				initialValues={formValues}
				handleSubmitForm={handleSubmitForm}
			/>
			<div>
				<div className="flex justify-between">
					<div>
						<h1 className="text-3xl	font-semibold">Entradas del Producto</h1>
					</div>
					<div>
						<button
							className="bg-blue-800 px-3 py-2 rounded-lg block hover:bg-blue-900 transition duration-300"
							onClick={handleAddEntryProduct}
						>
							<div className="flex text-white ">
								<PlusIcon className="h-5 w-5 self-center" />
								<span className="pl-2 font-semibold">Añadir entrada</span>
							</div>
						</button>
					</div>
				</div>
			</div>
			<div className="mt-4 border border-gray-300 rounded-lg py-3">
				<table className="w-full table-fixed">
					<thead className="border-b">
						<tr>
							<th className="text-left p-2 w-2/6">
								Descripcion
							</th>
							<th className="text-left p-2 w-1/6">
								Stock de Ingreso
							</th>
							<th className="text-left p-2 w-1/6">
								Precio total
							</th>
							<th className="text-left p-2 w-1/6">
								Stock
							</th>
							<th className="text-left p-2 w-1/6">
								Precio unitario
							</th>
							<th className="text-left p-2 w-1/6">
								Fecha de creación
							</th>
							<th className="text-center p-2 w-1/6">
								Acciones
							</th>
						</tr>
					</thead>
					<tbody>
						{
							product_entry.map((entry) => (
								<tr key={entry.id} className="hover:bg-gray-50 border-b border-t">
									<td className="text-left p-2">
										{entry.description}
									</td>
									<td className="text-left p-2">
										{entry.init_stock}
									</td>
									<td className="text-left p-2">
										S/. {entry.total_cost}
									</td>
									<td className="text-left p-2">
										{entry.stock}
									</td>
									<td className="text-left p-2">
										S/. {entry.unit_price}
									</td>
									<td className="text-left p-2">
										<h2>
											{moment(entry.created_at).format('DD-MM-YYYY')}
										</h2>
										<h2>
											{moment(entry.created_at).format('HH:mm')}
										</h2>
									</td>
									<td className="p-2">
										<div className="flex justify-center p-2">
											<button
												className="p-3 hover:bg-gray-100 rounded-full transition duration-300"
												onClick={() => handleDeleteEntryProduct(entry.id)}
											>
												<TrashIcon className="h-5" />
											</button>
										</div>
									</td>
								</tr>
							))
						}
					</tbody>
				</table>
			</div>
		</div>
	)
}
