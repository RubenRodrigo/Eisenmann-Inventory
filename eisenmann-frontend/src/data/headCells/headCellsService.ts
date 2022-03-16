import { Service } from "@/interfaces/Service";
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
		id: 'code',
		numeric: true,
		disablePadding: true,
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