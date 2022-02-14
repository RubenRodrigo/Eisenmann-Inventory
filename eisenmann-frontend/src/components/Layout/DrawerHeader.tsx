import { styled } from '@mui/material/styles';

export const DrawerHeader = styled('div')(({ theme }) => ({
	position: 'relative',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end',
	padding: theme.spacing(1, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}));