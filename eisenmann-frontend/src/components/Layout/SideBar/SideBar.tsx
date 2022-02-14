import MuiDrawer, { DrawerProps as MuiDrawerProps } from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import { DrawerHeader } from '../DrawerHeader';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Image from 'next/image';
import Logo from '@/public/images/logo.png'
import { useContext } from 'react';
import { ColorModeContext } from '@/context/ColorModeContext';
import { Box } from '@mui/material';
import { CardUser } from './CardUser';
import { ListNav } from './ListNav/ListNav';
import { routes } from 'src/data/routes/routes';

const openedMixin = (theme: Theme, drawerWidth: number): CSSObject => ({
	width: drawerWidth,
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: 'hidden',
	width: `calc(${theme.spacing(7)})`,
	[theme.breakpoints.up('sm')]: {
		width: `calc(${theme.spacing(11)})`,
	},
});


interface DrawerProps extends MuiDrawerProps {
	drawerWidth: number
}

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== 'open' && prop !== 'drawerWidth'
})<DrawerProps>(
	({ theme, open, drawerWidth }) => ({
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: 'nowrap',
		boxSizing: 'border-box',
		...(open && {
			...openedMixin(theme, drawerWidth),
			'& .MuiDrawer-paper': openedMixin(theme, drawerWidth),
		}),
		...(!open && {
			...closedMixin(theme),
			'& .MuiDrawer-paper': closedMixin(theme),
		}),
	}),
);

const ImageContainer = styled('div')(({ theme }) => ({
	position: 'relative',
	flex: 1,
	height: '100%',
	padding: theme.spacing(0, 1),
}))

interface Props {
	drawerWidth: number;
	handleDrawerClose: () => void;
	handleDrawerOpen: () => void;
	open: boolean;
}

export const SideBar = ({ drawerWidth, handleDrawerClose, handleDrawerOpen, open }: Props) => {
	const theme = useTheme();
	const colorMode = useContext(ColorModeContext);

	return (
		<Drawer
			variant="permanent"
			open={open}
			drawerWidth={drawerWidth}
			PaperProps={{ sx: { backgroundColor: 'secondary.dark' } }}
		>
			<DrawerHeader>
				<ImageContainer>
					<Image
						src={Logo}
						alt="GreenPure"
						layout="responsive"
					/>
				</ImageContainer>
				{/* <IconButton onClick={colorMode.toggleColorMode} color="secondary">
					{theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
				</IconButton> */}
				{/* {open
					?
					<IconButton onClick={handleDrawerClose} color="secondary">
						{theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
					</IconButton>
					:
					<IconButton onClick={handleDrawerOpen} color="secondary">
						{theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
					</IconButton>
				} */}
			</DrawerHeader>
			<Divider />
			<Box padding={2}>
				<CardUser />
			</Box>
			{
				routes.map((routeType) => (
					<ListNav
						key={routeType.name}
						routeType={routeType}
						open={open}
					/>
				))
			}
		</Drawer >
	);
};
