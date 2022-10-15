import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { signOut, useSession } from 'next-auth/react';
import { postSignOut } from 'src/services/auth';


interface AppBarProps extends MuiAppBarProps {
	open?: boolean;
	drawerWidth: number
}

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open' && prop !== 'drawerWidth',
})<AppBarProps>(
	({ theme, open, drawerWidth }) => {
		return {
			zIndex: theme.zIndex.drawer + 1,
			transition: theme.transitions.create(['width', 'margin'], {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
			...(!open && {
				width: `calc(100% - ${theme.spacing(7)})`,
				[theme.breakpoints.up('sm')]: {
					width: `calc(100% - ${theme.spacing(11)})`,
				},
			}),
			...(open && {
				marginLeft: drawerWidth,
				width: `calc(100% - ${drawerWidth}px)`,
				transition: theme.transitions.create(['width', 'margin'], {
					easing: theme.transitions.easing.sharp,
					duration: theme.transitions.duration.enteringScreen,
				}),
			}),
		}
	}

);

interface Props {
	drawerWidth: number;
	handleDrawerOpen: () => void;
	open: boolean;
}

export const AppBarComponent = ({ drawerWidth, handleDrawerOpen, open }: Props) => {

	const { data: session, status } = useSession()
	const handleSignOut = async () => {
		try {
			const res = await postSignOut({ refreshToken: session?.refreshToken ?? '' })
			if (res.status === 205) {
				signOut()
			}
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<AppBar
			position="fixed"
			open={open}
			drawerWidth={drawerWidth}
			color="inherit"
			elevation={1}
		>
			<Toolbar sx={{
				px: 5,
			}}
				disableGutters
			>
				<Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
					Mini variant drawer
				</Typography>
				<Button
					color="inherit"
					onClick={handleSignOut}
				>
					Logout
				</Button>
			</Toolbar>
		</AppBar>
	)
};
