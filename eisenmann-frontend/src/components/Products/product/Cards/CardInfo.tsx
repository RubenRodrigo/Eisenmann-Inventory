import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { ProductDetail } from '@/interfaces/Product';
import { StateButton } from '@/components/StateButton';

interface Props {
	data?: ProductDetail
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
							<Typography variant='subtitle2'>Nombre</Typography>
							<Typography
								variant='body1'
								color={theme.palette.grey[600]}
							>
								{data?.name}
							</Typography>
						</ListItemText>
					</ListItem>
					<ListItem>
						<ListItemText>
							<Typography variant='subtitle2'>Código</Typography>
							<Typography
								variant='body1'
								color={theme.palette.grey[600]}
							>
								{data?.code}
							</Typography>
						</ListItemText>
					</ListItem>
					<ListItem>
						<ListItemText>
							<Typography variant='subtitle2'>Fecha de Creación</Typography>
							<Typography
								variant='body1'
								color={theme.palette.grey[600]}
							>
								{data?.created_at}
							</Typography>
						</ListItemText>
					</ListItem>
					<ListItem>
						<ListItemText>
							<Typography variant='subtitle2'>Última actualización</Typography>
							<Typography
								variant='body1'
								color={theme.palette.grey[600]}
							>
								{data?.updated_at}
							</Typography>
						</ListItemText>
					</ListItem>
					<ListItem>
						<ListItemText>
							<Typography variant='subtitle2'>Descripción</Typography>
							<Typography
								variant='body1'
								color={theme.palette.grey[600]}
							>
								{data?.description}
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
							<Typography variant='subtitle2'>Tipo</Typography>
							<Typography
								variant='body1'
								color={theme.palette.grey[600]}
							>
								{data?.type_detail?.name}
							</Typography>
						</ListItemText>
					</ListItem>
					<ListItem>
						<ListItemText>
							<Typography variant='subtitle2'>Unidad</Typography>
							<Typography
								variant='body1'
								color={theme.palette.grey[600]}
							>
								{data?.unit_detail?.name}
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
