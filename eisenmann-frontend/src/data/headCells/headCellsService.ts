import { Service } from "@/interfaces/Service";
import { ServiceProduct } from "@/interfaces/ServiceProduct";
import { HeadCell } from "@/interfaces/TableInterface";

export const headCellsService: readonly HeadCell<Service>[] = [
	{
		id: 'name',
		numeric: false,
		disablePadding: false,
		label: 'Nombre',
		isAllowed: false,
	},
	{
		id: 'client',
		numeric: false,
		disablePadding: false,
		label: 'Cliente',
		isAllowed: false,
	},
	{
		id: 'state',
		numeric: false,
		disablePadding: false,
		label: 'Estado',
		isAllowed: false,
		isAction: true
	},
	{
		id: 'code',
		numeric: true,
		disablePadding: false,
		label: 'Código',
		isAllowed: false,
	},
	{
		id: 'estimated_price',
		numeric: true,
		disablePadding: false,
		label: 'Precio estimado',
		isAllowed: true,
	},
	{
		id: 'init_date',
		numeric: true,
		disablePadding: false,
		label: 'Precio Unitario',
		isAllowed: false,
	},
	{
		id: 'end_date',
		numeric: true,
		disablePadding: false,
		label: 'Costo Total',
		isAllowed: false,
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

export const headCellsServiceProduct: readonly HeadCell<ServiceProduct>[] = [
	{
		id: 'product_stock',
		numeric: false,
		disablePadding: false,
		label: 'Producto',
		isAllowed: false,
	},
	{
		id: 'employee',
		numeric: false,
		disablePadding: false,
		label: 'Empleado',
		isAllowed: false,
	},
	{
		id: 'description',
		numeric: false,
		disablePadding: false,
		label: 'Descripción',
		isAllowed: false,
	},
	{
		id: 'current_price',
		numeric: true,
		disablePadding: false,
		label: 'Precio Unitario',
		isAllowed: false,
	},
	{
		id: 'quantity',
		numeric: true,
		disablePadding: false,
		label: 'Cantidad',
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
		numeric: false,
		disablePadding: false,
		label: 'Fecha de creación',
		isAllowed: false,
	},
	{
		id: 'actions',
		numeric: false,
		disablePadding: false,
		label: 'Acciones',
		isAllowed: false,
		isAction: true
	},
]