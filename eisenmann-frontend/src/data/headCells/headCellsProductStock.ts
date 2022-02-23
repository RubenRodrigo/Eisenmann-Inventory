import { ProductEntry } from "@/interfaces/ProductEntry";
import { ProductStock } from "@/interfaces/ProductStock";
import { HeadCell } from "@/interfaces/TableInterface";

export const headCellsProductStock: readonly HeadCell<ProductStock>[] = [
	{
		id: 'product',
		numeric: false,
		disablePadding: true,
		label: 'Producto',
		isAllowed: false,
	},
	{
		id: 'created_at',
		numeric: false,
		disablePadding: false,
		label: 'Fecha de creación',
		isAllowed: true,
	},
	{
		id: 'state',
		numeric: false,
		disablePadding: false,
		label: 'Estado',
		isAllowed: false,
		isAction: false
	},
	{
		id: 'total_stock',
		numeric: true,
		disablePadding: false,
		label: 'Stock Total',
		isAllowed: false,
	},
	{
		id: 'current_price',
		numeric: true,
		disablePadding: false,
		label: 'Precio Actual',
		isAllowed: false,
	},
	{
		id: 'real_stock',
		numeric: true,
		disablePadding: false,
		label: 'Stock Real',
		isAllowed: true,
	},
	{
		id: 'difference_stock',
		numeric: true,
		disablePadding: false,
		label: 'Diferencia de Stock',
		isAllowed: false,
	},
	{
		id: 'actions',
		numeric: true,
		disablePadding: false,
		label: 'Acciones',
		isAllowed: false,
	},
];


export const headCellsProductEntries: readonly HeadCell<ProductEntry>[] = [
	{
		id: 'description',
		numeric: false,
		disablePadding: false,
		label: 'Descripcion',
		isAllowed: false,
	},
	{
		id: 'init_stock',
		numeric: true,
		disablePadding: true,
		label: 'Stock Inicial',
		isAllowed: false,
	},
	{
		id: 'stock',
		numeric: true,
		disablePadding: false,
		label: 'Stock',
		isAllowed: true,
	},
	{
		id: 'unit_price',
		numeric: true,
		disablePadding: false,
		label: 'Precio Unitario',
		isAllowed: false,
	},
	{
		id: 'total_cost',
		numeric: true,
		disablePadding: false,
		label: 'Costo Total',
		isAllowed: false,
	},
	{
		id: 'created_at',
		numeric: true,
		disablePadding: false,
		label: 'Fecha de creación',
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