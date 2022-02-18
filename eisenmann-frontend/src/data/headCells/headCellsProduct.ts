import { Product } from "@/interfaces/Product";
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