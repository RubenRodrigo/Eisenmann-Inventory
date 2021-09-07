import { useSelector } from 'react-redux'
import { TableNav } from './TableNav'
import { TableRow } from './TableRow'

export const TableProduct = () => {

	const { products } = useSelector(state => state.productList)

	return (
		<div className="mt-4 border border-gray-300 rounded-lg py-3">
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
							Descripcion
						</th>
						<th className="text-left p-2">
							Tipo
						</th>
						<th className="text-left p-2">
							Unidad
						</th>
						<th className="text-left p-2">
							Fecha de creación
						</th>
						<th className="text-center p-2">
							Acciones
						</th>
					</tr>
				</thead>
				<tbody>
					{
						products.map(product => (
							<TableRow
								key={product.id}
								currentProduct={product}
							/>
						))
					}
				</tbody>
			</table>
		</div>
	)
}
