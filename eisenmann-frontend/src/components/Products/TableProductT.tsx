import { Product } from '@/interfaces/Products';
import { HeadCell } from '@/interfaces/TableInterface';
import React from 'react'


const headCells: readonly HeadCell<Product>[] = [
	{
		id: 'name',
		numeric: false,
		disablePadding: true,
		label: 'Producto',
		isAllowed: false,
	},
	{
		id: 'created_at',
		numeric: true,
		disablePadding: false,
		label: 'Fecha de Creación',
		isAllowed: true,
	},
	{
		id: 'total_price',
		numeric: true,
		disablePadding: false,
		label: 'Precio Total',
		isAllowed: true,
	},
];

export const TableProductT = () => {
	return (
		<div>TableProductT</div>
	)
}
