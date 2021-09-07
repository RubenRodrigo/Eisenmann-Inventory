import React from 'react'
import { useSelector } from 'react-redux'
import { TableNav } from './TableNav'
import { TableRow } from './TableRow'

export const TableService = () => {

	const { services } = useSelector(state => state.serviceList)

	return (
		<div className="mt-4 border border-gray-300 rounded-lg py-3">
			<TableNav />
			<table className="w-full">
				<thead className="border-b">
					<tr>
						<th className="text-left p-2">
							Servicio
						</th>
						<th className="text-left p-2">
							Cliente
						</th>
						<th className="text-left p-2">
							Placa
						</th>
						<th className="text-left p-2">
							Precio Estimado
						</th>
						<th className="text-left p-2">
							Fecha de Inicio
						</th>
						<th className="text-left p-2">
							Fecha de Termino
						</th>
						<th className="text-left p-2">
							Estado
						</th>
						<th className="text-center p-2">
							Acciones
						</th>
					</tr>
				</thead>
				<tbody>
					{
						services.map(service => (
							<TableRow
								key={service.id}
								currentService={service}
							/>
						))
					}

				</tbody>
			</table>
		</div>
	)
}
