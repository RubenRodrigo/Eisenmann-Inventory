import { Product } from "@/interfaces/Product";
import { ProductStock } from "@/interfaces/ProductStock";
import { HeadCell } from "@/interfaces/TableInterface";

export const headCellsProduct: readonly HeadCell<Product>[] = [
	{
		id: 'name',
		numeric: false,
		disablePadding: false,
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


export const headCellsProductStock: readonly HeadCell<ProductStock>[] = [
	{
		id: 'created_at',
		numeric: false,
		disablePadding: false,
		label: 'Fecha de cración',
		isAllowed: true,
	},
	{
		id: 'init_stock',
		numeric: true,
		disablePadding: false,
		label: 'Stock Inicial',
		isAllowed: true,
	},
	{
		id: 'real_stock',
		numeric: true,
		disablePadding: false,
		label: 'Stock Real',
		isAllowed: true,
	},
	{
		id: 'state',
		numeric: false,
		disablePadding: false,
		label: 'Estado',
		isAllowed: true,
		isAction: false
	},
	{
		id: 'medium_stock',
		numeric: true,
		disablePadding: false,
		label: 'Stock Medio permitido ',
		isAllowed: false,
	},
	{
		id: 'minium_stock',
		numeric: true,
		disablePadding: false,
		label: 'Stock Minimo permitido',
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
		id: 'total_price',
		numeric: true,
		disablePadding: false,
		label: 'Precio Total',
		isAllowed: false,
	},
	{
		id: 'difference_stock',
		numeric: true,
		disablePadding: false,
		label: 'Diferencia de Stock',
		isAllowed: false,
	}, {
		id: 'current_price',
		numeric: true,
		disablePadding: false,
		label: 'Precio Actual',
		isAllowed: false,
	}, {
		id: 'actions',
		numeric: true,
		disablePadding: false,
		label: 'Acciones',
		isAllowed: false,
	},
];