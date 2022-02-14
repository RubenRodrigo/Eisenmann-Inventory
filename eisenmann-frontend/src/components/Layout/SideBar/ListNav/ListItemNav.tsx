import MuiListItemButton, { ListItemButtonProps as MuiListItemButtonProps } from '@mui/material/ListItemButton';
import { ListItemIcon, ListItemText } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { NavRoute } from '@/interfaces/Route';
import Link from '@/components/Link';
import { useRouter } from 'next/router';


const ListItemButton = styled(MuiListItemButton, {
	shouldForwardProp: (prop) => prop !== 'selected'
})<MuiListItemButtonProps>(
	({ theme, selected }) => ({
		borderRadius: 8,
		margin: theme.spacing(1, 0),
		...(selected && {
			color: theme.palette.primary.main,
			backgroundColor: alpha(theme.palette.primary.main, 0.08),
		}),
		...(!selected && {
			color: theme.palette.secondary.main,
		}),

		'&:hover': {
			textDecoration: 'none',
			backgroundColor: alpha(theme.palette.secondary.light, 0.08),
			// Reset on touch devices, it doesn't add specificity
			'@media (hover: none)': {
				backgroundColor: 'transparent'
			}
		},
	})
)

interface Props {
	route: NavRoute
}

export const ListItemNav = ({ route }: Props) => {
	const router = useRouter()

	return (
		<Link
			href={{
				pathname: route.path,
			}}
			underline="none"
		>
			<ListItemButton
				selected={router.pathname === route.path}
			>
				<ListItemIcon
					sx={{
						color: 'inherit'
					}}
				>
					<route.IconComponent />
				</ListItemIcon>
				<ListItemText
					primary={route.name}
					primaryTypographyProps={{
						fontWeight: 'bold',
						variant: 'subtitle2',
					}}
				/>
			</ListItemButton >
		</Link>
	)
};
