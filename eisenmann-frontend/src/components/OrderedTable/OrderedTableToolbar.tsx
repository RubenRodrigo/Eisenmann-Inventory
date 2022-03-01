import { Toolbar, Typography } from "@mui/material";

interface CustomTableToolbarProps {
	name: string;
	children?: JSX.Element
}

export const OrderedTableToolbar = ({ name, children }: CustomTableToolbarProps) => {
	return (
		<Toolbar
			sx={{
				pl: { sm: 2 },
				pr: { xs: 1, sm: 1 },
			}}
		>

			<Typography
				sx={{ flex: '1 1 100%' }}
				variant="h6"
				id="tableTitle"
				component="div"
			>
				{name}
			</Typography>
			{children}
		</Toolbar>
	);
};