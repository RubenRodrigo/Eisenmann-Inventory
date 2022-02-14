import { NavRouteType } from '@/interfaces/Route';
import { List, ListSubheader } from '@mui/material';
import React from 'react';
import { ListItemNav } from './ListItemNav';

interface Props {
	open: boolean
	routeType: NavRouteType
}

export const ListNav = ({ open, routeType }: Props) => {
	return (
		<List
			sx={
				(theme) => ({
					px: 0,
					[theme.breakpoints.up('sm')]: {
						px: 2,
					},
				})
			}
			subheader={
				<ListSubheader
					sx={{
						backgroundColor: 'secondary.dark',
						color: 'secondary.light',
						fontSize: 12,
						fontWeight: 'bold',
						textTransform: 'uppercase',
						visibility: !open ? 'hidden' : ''
					}}
				>
					{routeType.name}
				</ListSubheader>
			}
		>
			{routeType.routes.map((route, index) => (
				<ListItemNav
					key={route.path}
					route={route}
				/>
			))}
		</List>
	)
};
