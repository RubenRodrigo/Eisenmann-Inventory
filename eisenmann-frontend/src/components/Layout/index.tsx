import { useState } from 'react';

import { Box } from '@mui/material';
import { AppBarComponent } from './AppBar/AppBarComponent';
import { SideBar } from './SideBar/SideBar';
import { DrawerHeader } from './DrawerHeader';
import { LayoutContext } from '@/context/LayoutContext';
import { CustomToast } from '../Toast/CustomToast';
import { useToast } from '@/hooks/useToast';

const { Provider } = LayoutContext;

interface Props {
	children: JSX.Element | JSX.Element[]
}
export const Layout = ({ children }: Props) => {
	const {
		openToast,
		toastInfo,
		handleCloseToast,
		handleOpenToast,
		handleToastInfo
	} = useToast()

	const [open, setOpen] = useState(true);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};
	return (
		<Provider
			value={{
				openToast,
				toastInfo,
				handleCloseToast,
				handleOpenToast,
				handleToastInfo
			}}
		>
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
			<CustomToast />
		</Provider>
	)
};
