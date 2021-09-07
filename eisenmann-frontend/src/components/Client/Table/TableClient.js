import { useSelector } from 'react-redux'
import { TableRow } from './TableRow'

export const TableClient = () => {

	const { clients } = useSelector(state => state.clientList)

	return (
		<div className="mt-4 border border-gray-300 rounded-lg py-3">
			<table className="w-full">
				<thead className="border-b">
					<tr>
						<th className="text-left p-2">
							Nro
						</th>
						<th className="text-left p-2">
							Nombre
						</th>
						<th className="text-left p-2">
							Identificador
						</th>
						<th className="text-left p-2">
							Servicios totales
						</th>
						<th className="text-center p-2">
							Acciones
						</th>
					</tr>
				</thead>
				<tbody>
					{
						clients.map((client, index) => (
							<TableRow
								key={client.id}
								currentClient={client}
								index={index + 1}
							/>
						))
					}
				</tbody>
			</table>
		</div>
	)
}
