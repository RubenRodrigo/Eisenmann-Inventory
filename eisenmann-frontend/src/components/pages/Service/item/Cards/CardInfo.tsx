import { ServiceDetail } from '@/interfaces/Service'
import { useTheme } from '@mui/material/styles';
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material'
import React from 'react'
import { StateButton } from '@/components/StateButton';

interface Props {
	data: ServiceDetail
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
							<Typography variant='subtitle2'>Nombre del servicio</Typography>
							<Typography
								variant='body1'
								color={theme.palette.grey[600]}
							>
								{data.name}
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
								{data.code}
							</Typography>
						</ListItemText>
					</ListItem>
					<ListItem>
						<ListItemText>
							<Typography variant='subtitle2'>Observaciones</Typography>
							<Typography
								variant='body1'
								color={theme.palette.grey[600]}
							>
								{data.observations}
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
							<Typography variant='subtitle2'>Cliente</Typography>
							<Typography
								variant='body1'
								color={theme.palette.grey[600]}
							>
								{data.client_detail.name}
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
