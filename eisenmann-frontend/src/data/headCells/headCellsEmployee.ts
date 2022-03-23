import { Employee } from "@/interfaces/Employee";
import { HeadCell } from "@/interfaces/TableInterface";

export const headCellsEmployee: readonly HeadCell<Employee>[] = [
	{
		id: 'firts_name',
		numeric: false,
		disablePadding: false,
		label: 'Nombres',
		isAllowed: false,
	},
	{
		id: 'last_name',
		numeric: false,
		disablePadding: false,
		label: 'Apellidos',
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
];