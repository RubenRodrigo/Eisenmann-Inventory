import React from 'react'
import { useSelector } from 'react-redux'

import moment from 'moment'

import { Stock } from '../../ui/Stock'

const ProductInfo = () => {

	const { productStock } = useSelector(state => state.productStockActive)

	const {
		id,
		product_detail,
		created_at,
		init_stock,
		total_stock,
		real_stock,
		total_stock_entries,
		total_stock_price,
		difference_stock,
		current_price,
		medium_value,
		minium_value,
	} = productStock

	return (
		<div className="shadow-md p-4 my-5">
			<div className="grid grid-cols-2 gap-4 mt-5">
				<div className="col-span-1 border border-gray-300 rounded-lg">
					<div className="border-b border-gray-300 p-2">
						<h3 className="text-lg font-bold">
							Informacion del Producto
						</h3>
					</div>
					<div className="p-2">
						<div className="flex p-2">
							<h3 className="font-bold">Producto:</h3>
							<p className="ml-2">{product_detail.name}</p>
						</div>
						<div className="flex p-2">
							<h3 className="font-bold">Tipo:</h3>
							<p className="ml-2">{product_detail.type_detail?.name}</p>
						</div>
						<div className="flex p-2">
							<h3 className="font-bold">Unidad:</h3>
							<p className="ml-2">{product_detail.unit_detail?.name}</p>
						</div>
						<div className="flex p-2">
							<h3 className="font-bold">Descripcion:</h3>
							<p className="ml-2 break-all">{product_detail.description}</p>
						</div>
					</div>
				</div>
				<div className="col-span-1 border border-gray-300 rounded-lg">
					<div className="border-b border-gray-300 p-2">
						<h3 className="text-lg font-bold">
							Estado del Producto
						</h3>
					</div>
					<div className="p-2">
						<div className="mt-4 border border-gray-300 rounded-lg py-2">
							<table className="w-full table-fixed">
								<thead className="border-b">
									<tr>
										<th className="text-left p-2 w-1/3">
											<h3 className="font-bold">Stock Actual</h3>
										</th>
										<th className="text-left p-2 w-1/3">
											<h3 className="font-bold">Stock Real</h3>
										</th>
										<th className="text-left p-2 w-1/3">
											<h3 className="font-bold">Precio Actual</h3>
										</th>
									</tr>
								</thead>
								<tbody>
									<tr className="hover:bg-gray-50 border-b border-t">
										<td className="text-left p-2">
											<Stock value={total_stock} range={[medium_value, minium_value]} />
										</td>
										<td className="text-left p-2">
											{real_stock}
										</td>
										<td className="text-left p-2">
											S/. {current_price}
										</td>
									</tr>
								</tbody>
							</table>
						</div>

						<br />
						<div className="mt-4 border border-gray-300 rounded-lg py-2">
							<table className="w-full table-fixed">
								<thead className="border-b">
									<tr>
										<th className="text-left p-2 w-1/4">
											<h3 className="font-bold">Diferencia</h3>
										</th>
										<th className="text-left p-2 w-1/4">
											<h3 className="font-bold">Stock Inicial</h3>
										</th>
										<th className="text-left p-2 w-1/4">
											<h3 className="font-bold">Stock Ingresado</h3>
										</th>
										<th className="text-left p-2 w-1/4">
											<h3 className="font-bold">Precio Total</h3>
										</th>
									</tr>
								</thead>
								<tbody>
									<tr className="hover:bg-gray-50 border-b border-t">
										<td className="text-left p-2">
											{difference_stock}
										</td>
										<td className="text-left p-2">
											{init_stock}
										</td>
										<td className="text-left p-2">
											{total_stock_entries}
										</td>
										<td className="text-left p-2">
											S/. {total_stock_price}
										</td>
									</tr>
								</tbody>
							</table>
						</div>
						<br />
						<hr />

						<div className="flex p-2">
							<h3 className="font-bold">Fecha de Creación:</h3>
							<div className="ml-2">
								<span className="pr-4">
									{moment(created_at).format('DD-MM-YYYY')}
								</span>
								<span className="pr-4">
									{moment(created_at).format('HH:mm')}
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ProductInfo
