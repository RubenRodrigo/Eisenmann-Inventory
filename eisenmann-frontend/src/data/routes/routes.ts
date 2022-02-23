import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import GroupIcon from '@mui/icons-material/Group';
import BadgeIcon from '@mui/icons-material/Badge';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import { NavRouteType } from "@/interfaces/Route";

export const routes: NavRouteType[] = [
	{
		name: 'Inventario',
		routes: [
			{
				path: '/productos',
				name: 'Productos',
				IconComponent: ProductionQuantityLimitsIcon
			},
			{
				path: '/productos-stock',
				name: 'Producto Stock',
				IconComponent: ProductionQuantityLimitsIcon
			},
			{
				path: '/utilidades-producto',
				name: 'Utilidades',
				IconComponent: LibraryBooksIcon
			}
		]
	},
	{
		name: 'Administración',
		routes: [
			{
				path: '/servicios',
				name: 'Servicios',
				IconComponent: LocalLibraryIcon
			},
			{
				path: '/utilidades-servicio',
				name: 'Utilidades',
				IconComponent: LibraryBooksIcon
			},
			{
				path: '/clientes',
				name: 'Clientes',
				IconComponent: BadgeIcon
			},
			{
				path: '/empleados',
				name: 'Empleados',
				IconComponent: GroupIcon
			},
		]
	},
]