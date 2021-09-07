import { useSelector } from 'react-redux'
import { TableRow } from './TableRow'

export const TableType = () => {

	const { types } = useSelector(state => state.typeList)

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
							Description
						</th>
						<th className="text-center p-2">
							Acciones
						</th>
					</tr>
				</thead>
				<tbody>
					{
						types.map((type, index) => (
							<TableRow
								key={type.id}
								currentType={type}
								index={index + 1}
							/>
						))
					}
				</tbody>
			</table>
		</div>
	)
}
