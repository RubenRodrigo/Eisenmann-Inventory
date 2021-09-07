import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import moment from 'moment'
import { ArrowRightIcon, PlusIcon, TrashIcon } from '@heroicons/react/outline'
import Link from 'next/link'

export const ProductStockTable = () => {

	const { product } = useSelector(state => state.productActive)

	const {
		id,
		product_stock
	} = product

	return (
		<div className="shadow-md p-4">
			<div>
				<div className="flex justify-between">
					<div>
						<h1 className="text-3xl	font-semibold">Entradas del Producto</h1>
					</div>
				</div>
			</div>
			<div className="mt-4 border border-gray-300 rounded-lg py-3">
				<table className="w-full table-fixed">
					<thead className="border-b">
						<tr>
							<th className="text-left p-2 w-1/8">
								Stock Inicial
							</th>
							<th className="text-left p-2 w-1/8">
								Stock Total
							</th>
							<th className="text-left p-2 w-1/8">
								Precio total
							</th>
							<th className="text-left p-2 w-1/8">
								Stock Total Actual
							</th>
							<th className="text-left p-2 w-1/8">
								Stock Real
							</th>
							<th className="text-left p-2 w-1/8">
								Diferencia
							</th>
							<th className="text-left p-2 w-1/8">
								Fecha de creación
							</th>
							<th className="text-left p-2 w-1/8">
								Acciones
							</th>
						</tr>
					</thead>
					<tbody>
						{
							product_stock.map((stock) => (
								<tr key={stock.id} className="hover:bg-gray-50 border-b border-t">
									<td className="text-left p-2">
										{stock.init_stock}
									</td>
									<td className="text-left p-2">
										{stock.total_stock_entries}
									</td>
									<td className="text-left p-2">
										S/. {stock.total_stock_price}
									</td>
									<td className="text-left p-2">
										{stock.total_stock}
									</td>
									<td className="text-left p-2">
										{stock.real_stock}
									</td>
									<td className="text-left p-2">
										{stock.difference_stock}
									</td>
									<td className="text-left p-2">
										<h2>
											{moment(stock.created_at).format('DD-MM-YYYY')}
										</h2>
										<h2>
											{moment(stock.created_at).format('HH:mm')}
										</h2>
									</td>
									<td className="text-left p-2">
										<Link
											href={`/product-stock/${stock.id}`}
										>
											<a
												className="p-3 hover:bg-gray-100 rounded-full transition duration-300"
											>
												<ArrowRightIcon className="h-5" />

											</a>
										</Link>
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
