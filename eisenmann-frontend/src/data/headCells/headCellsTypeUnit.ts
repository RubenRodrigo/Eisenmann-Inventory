import { ProductType } from "@/interfaces/ProductType";
import { ProductUnit } from "@/interfaces/ProductUnit";
import { HeadCell } from "@/interfaces/TableInterface";

export const headCellsProductType: readonly HeadCell<ProductType>[] = [
	{
		id: 'name',
		numeric: false,
		disablePadding: false,
		label: 'Nombre',
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
		id: 'actions',
		numeric: false,
		disablePadding: false,
		label: 'Acciones',
		isAllowed: false,
		isAction: true
	},
];

export const headCellsProductUnit: readonly HeadCell<ProductUnit>[] = [
	{
		id: 'name',
		numeric: false,
		disablePadding: false,
		label: 'Nombre',
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
		id: 'abr',
		numeric: false,
		disablePadding: false,
		label: 'Abreviatura',
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