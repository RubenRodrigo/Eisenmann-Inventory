import React from 'react'
import { useSelector } from 'react-redux'

import moment from 'moment'

import { Stock } from '../../ui/Stock'

export const ProductInfo = () => {

	const { product } = useSelector(state => state.productActive)

	const {
		id,
		name,
		code,
		description,
		created_at,
		updated_at,
		total_stock,
		total_price,
		type_detail,
		unit_detail,
	} = product

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
							<p className="ml-2">{name}</p>
						</div>
						<div className="flex p-2">
							<h3 className="font-bold">Código:</h3>
							<p className="ml-2">{code}</p>
						</div>
						<div className="flex p-2">
							<h3 className="font-bold">Tipo:</h3>
							<p className="ml-2">{type_detail?.name}</p>
						</div>
						<div className="flex p-2">
							<h3 className="font-bold">Unidad:</h3>
							<p className="ml-2">{unit_detail?.name}</p>
						</div>
						<div className="flex p-2">
							<h3 className="font-bold">Descripcion:</h3>
							<p className="ml-2 break-all">{description}</p>
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
						<div className="flex p-2 gap-x-2">
							<h3 className="font-bold self-center">Stock Total:</h3>
							<Stock value={total_stock} />
						</div>
						<div className="flex p-2 gap-x-2">
							<h3 className="font-bold self-center">Precio Total:</h3>
							<span>{total_price}</span>
						</div>
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

