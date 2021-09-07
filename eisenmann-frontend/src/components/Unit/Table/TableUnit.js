import { useSelector } from 'react-redux'
import { TableRow } from './TableRow'

export const TableUnit = () => {

	const { units } = useSelector(state => state.unitList)

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
							Descripcion
						</th>
						<th className="text-left p-2">
							Abreviación
						</th>
						<th className="text-center p-2">
							Acciones
						</th>
					</tr>
				</thead>
				<tbody>
					{
						units.map((unit, index) => (
							<TableRow
								key={unit.id}
								currentUnit={unit}
								index={index + 1}
							/>
						))
					}
				</tbody>
			</table>
		</div>
	)
}
