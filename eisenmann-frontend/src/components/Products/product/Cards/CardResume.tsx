import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { ProductDetail } from '@/interfaces/Product';

interface Props {
	data?: ProductDetail
}

export const CardResume = ({ data }: Props) => {

	const theme = useTheme()

	return (
		<Box
			sx={{
				display: 'flex',
				width: '100%',
			}}
		>
			<Box
				sx={{
					flex: '1',
				}}
			>
				<List>
					<ListItem>
						<ListItemText>
							<Typography variant='subtitle2'>Stock Total</Typography>
							<Typography
								variant='body1'
								color={theme.palette.grey[600]}
							>
								{data?.summary?.total_stock}
							</Typography>
						</ListItemText>
					</ListItem>
					<ListItem>
						<ListItemText>
							<Typography variant='subtitle2'>Precio Total</Typography>
							<Typography
								variant='body1'
								color={theme.palette.grey[600]}
							>
								S/ {data?.summary?.total_price}
							</Typography>
						</ListItemText>
					</ListItem>
				</List>
			</Box>
		</Box>
	)
}
