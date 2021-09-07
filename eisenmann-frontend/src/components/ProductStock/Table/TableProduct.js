import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { productStockTableStartAddEntry } from '../../../actions/productEntry'
import { productStockStartUpdate } from '../../../actions/productStock'
import { ProductEntryModalForm } from '../Form/ProductEntryModalForm'
import { ProductRealModalForm } from '../Form/ProductRealModalForm'
import { TableNav } from './TableNav'
import { TableRow } from './TableRow'

export const TableProduct = () => {

	const dispatch = useDispatch()
	// const { filteredProducts } = useSelector(state => state.productStockList)
	const { productStocks } = useSelector(state => state.productStockList)

	const [openEntry, setOpenEntry] = useState(false)
	const [openReal, setOpenReal] = useState(false)
	const [formValuesEntry, setFormValuesEntry] = useState({})
	const [formValuesReal, setFormValuesReal] = useState({})

	// Set current product to state. This is to set data in modal
	const handleOpenEntryModal = (currentProduct) => {
		setFormValuesEntry(currentProduct)
		setOpenEntry(true)
	}

	const handleOpenRealModal = (currentProduct) => {
		setFormValuesReal(currentProduct)
		setOpenReal(true)
	}

	// Save data from modal.
	const handleSubmitModalEntryForm = (data) => {
		data.product = formValuesEntry.id
		data.init_stock = data.stock
		dispatch(productStockTableStartAddEntry(data))
		setOpenEntry(false)
	}

	const handleSubmitModalRealForm = (data) => {
		data.id = formValuesReal.id
		dispatch(productStockStartUpdate(data))
		setOpenReal(false)
	}

	return (
		<div className="mt-4 border border-gray-300 rounded-lg py-3">
			<ProductEntryModalForm
				open={openEntry}
				setOpen={setOpenEntry}
				initialValues={formValuesEntry}
				handleSubmitForm={handleSubmitModalEntryForm}
			/>
			<ProductRealModalForm
				open={openReal}
				setOpen={setOpenReal}
				initialValues={formValuesReal}
				handleSubmitForm={handleSubmitModalRealForm}
			/>
			<TableNav />
			<table className="w-full">
				<thead className="border-b">
					<tr>
						<th className="text-left p-2">
							Codigo
						</th>
						<th className="text-left p-2">
							Nombre
						</th>
						<th className="text-left p-2">
							Tipo
						</th>
						<th className="text-left p-2">
							Unidad
						</th>
						<th className="text-left p-2">
							Stock
						</th>
						<th className="text-left p-2">
							Real
						</th>
						<th className="text-left p-2">
							Diferencia
						</th>
						<th className="text-center p-2">
							Acciones
						</th>
					</tr>
				</thead>
				<tbody>
					{
						productStocks.map(product => (
							<TableRow
								key={product.id}
								currentProduct={product}
								handleOpenEntryModal={handleOpenEntryModal}
								handleOpenRealModal={handleOpenRealModal}
							/>
						))
					}
				</tbody>
			</table>
		</div>
	)
}
