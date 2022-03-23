import { Client } from "@/interfaces/Client";
import { HeadCell } from "@/interfaces/TableInterface";

export const headCellsClient: readonly HeadCell<Client>[] = [
	{
		id: 'name',
		numeric: false,
		disablePadding: false,
		label: 'Nombre',
		isAllowed: false,
	},
	{
		id: 'document_type',
		numeric: false,
		disablePadding: false,
		label: 'Tipo de documento',
		isAllowed: false,
	},
	{
		id: 'identifier',
		numeric: false,
		disablePadding: false,
		label: 'Identificador',
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