import { useSelector } from 'react-redux'
import { TableRow } from './TableRow'

export const TableEmployee = () => {

	const { employees } = useSelector(state => state.employeeList)

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
						<th className="text-center p-2">
							Acciones
						</th>
					</tr>
				</thead>
				<tbody>
					{
						employees.map((employee, index) => (
							<TableRow
								key={employee.id}
								currentEmployee={employee}
								index={index + 1}
							/>
						))
					}
				</tbody>
			</table>
		</div>
	)
}
