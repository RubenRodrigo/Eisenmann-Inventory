import { Box, Typography } from "@mui/material";
import { useCallback } from "react";
import NextBreadcrumbs from "./NextBreadcumbs";

interface Props {
	children?: JSX.Element | JSX.Element[];
	title: string;
}


export const Header = ({ title, children }: Props) => {

	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'space-between',
				my: 4
			}}
		>
			<Box>
				<Typography color="text.primary" variant="h5" sx={{ fontWeight: 'bold', mb: 2, textTransform: 'capitalize' }}>{title}</Typography>
				<NextBreadcrumbs />
				{/* <Breadcrumbs aria-label="breadcrumb">
					{links.map((item, index) => (
						<Link
							key={item}
							color={`${links.length === index + 1 ? 'inherit' : 'text.primary'}`}
							href={router.pathname}
							underline="hover"
						>
							{item}
						</Link>
					))}
				</Breadcrumbs> */}
			</Box>
			<Box sx={{ alignSelf: 'center' }}>
				{children}
			</Box>
		</Box>
	);
};
