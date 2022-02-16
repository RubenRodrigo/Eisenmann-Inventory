import { Product } from "@/interfaces/Products";
import { HeadCell } from "@/interfaces/TableInterface";

export const headCellsProduct: readonly HeadCell<Product>[] = [
	{
		id: 'name',
		numeric: false,
		disablePadding: true,
		label: 'Producto',
		isAllowed: false,
	},
	{
		id: 'type',
		numeric: false,
		disablePadding: false,
		label: 'Tipo',
		isAllowed: true,
	},
	{
		id: 'unit',
		numeric: false,
		disablePadding: false,
		label: 'Unidad',
		isAllowed: true,
	},
	{
		id: 'code',
		numeric: true,
		disablePadding: false,
		label: 'Codigo',
		isAllowed: true,
	},
	{
		id: 'total_price',
		numeric: true,
		disablePadding: false,
		label: 'Precio Total',
		isAllowed: false,
	},
	{
		id: 'total_stock',
		numeric: true,
		disablePadding: false,
		label: 'Stock Total',
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
		id: 'actions',
		numeric: false,
		disablePadding: false,
		label: 'Acciones',
		isAllowed: false,
		isAction: true
	},
];