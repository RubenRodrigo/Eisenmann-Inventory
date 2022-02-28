import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { ProductStockDetail } from '@/interfaces/ProductStock';

interface Props {
	data: ProductStockDetail
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
								{data.total_stock}
							</Typography>
						</ListItemText>
					</ListItem>
					<ListItem>
						<ListItemText>
							<Typography variant='subtitle2'>Diferencia (StockTotal - StockReal)</Typography>
							<Typography
								variant='body1'
								color={theme.palette.grey[600]}
							>
								{data.difference_stock}
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
								S/ {data.total_price}
							</Typography>
						</ListItemText>
					</ListItem>
					<ListItem>
						<ListItemText>
							<Typography variant='subtitle2'>Precio actual</Typography>
							<Typography
								variant='body1'
								color={theme.palette.grey[600]}
							>
								S/ {data.current_price}
							</Typography>
						</ListItemText>
					</ListItem>
				</List>
			</Box>
		</Box>
	)
}
