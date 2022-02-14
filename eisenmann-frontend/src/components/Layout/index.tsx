import { useState } from 'react';

import { Box } from '@mui/material';
import { AppBarComponent } from './AppBar/AppBarComponent';
import { SideBar } from './SideBar/SideBar';
import { DrawerHeader } from './DrawerHeader';

interface Props {
	children: JSX.Element | JSX.Element[]
}
export const Layout = ({ children }: Props) => {
	const [open, setOpen] = useState(true);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<Box sx={{ display: 'flex' }}>
			<AppBarComponent
				drawerWidth={280}
				handleDrawerOpen={handleDrawerOpen}
				open={open}
			/>
			<SideBar
				drawerWidth={280}
				handleDrawerClose={handleDrawerClose}
				handleDrawerOpen={handleDrawerOpen}
				open={open}
			/>

			<Box component="main" sx={{ flexGrow: 1, px: 5, py: 3 }}>
				<DrawerHeader />
				{children}
			</Box>
		</Box>
	)
};
