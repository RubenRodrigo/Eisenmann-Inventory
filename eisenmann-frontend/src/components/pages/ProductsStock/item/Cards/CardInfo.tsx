import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { StateButton } from '@/components/StateButton';
import { ProductStockDetail } from '@/interfaces/ProductStock';
import { dateToString } from '@/helpers/utils';

interface Props {
	data: ProductStockDetail
}

export const CardInfo = ({ data }: Props) => {

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
							<Typography variant='subtitle2'>Producto</Typography>
							<Typography
								variant='body1'
								color={theme.palette.grey[600]}
							>
								{data.product_detail.name}
							</Typography>
						</ListItemText>
					</ListItem>
					<ListItem>
						<ListItemText>
							<Typography variant='subtitle2'>Stock Inicial</Typography>
							<Typography
								variant='body1'
								color={theme.palette.grey[600]}
							>
								{data.init_stock}
							</Typography>
						</ListItemText>
					</ListItem>
					<ListItem>
						<ListItemText>
							<Typography variant='subtitle2'>Stock Real</Typography>
							<Typography
								variant='body1'
								color={theme.palette.grey[600]}
							>
								{data.real_stock}
							</Typography>
						</ListItemText>
					</ListItem>
					<ListItem>
						<ListItemText>
							<Typography variant='subtitle2'>Fecha de creación</Typography>
							<Typography
								variant='body1'
								color={theme.palette.grey[600]}
							>
								{dateToString(data.created_at)}
							</Typography>
						</ListItemText>
					</ListItem>
				</List>
			</Box>
			<Box
				sx={{
					flex: '1',
				}}
			>
				<List>
					<ListItem>
						<ListItemText>
							<Typography variant='subtitle2'>Stock mínimo permitido</Typography>
							<Typography
								variant='body1'
								color={theme.palette.grey[600]}
							>
								{data.minium_stock}
							</Typography>
						</ListItemText>
					</ListItem>
					<ListItem>
						<ListItemText>
							<Typography variant='subtitle2'>Stock medio permitido</Typography>
							<Typography
								variant='body1'
								color={theme.palette.grey[600]}
							>
								{data.medium_stock}
							</Typography>
						</ListItemText>
					</ListItem>
					<ListItem>
						<ListItemText>
							<Typography pb={1} variant='subtitle2'>Estado</Typography>
							<Typography
								variant='body1'
								color={theme.palette.grey[600]}
							>
								<StateButton
									state={data ? data.state : false}
									buttonSx={{
										px: 1,
										py: 0.5
									}}
									textSx={{
										fontSize: 12,
									}}
								/>
							</Typography>
						</ListItemText>
					</ListItem>
				</List>
			</Box>
		</Box>
	)
}
