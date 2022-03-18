import { ServiceDetail } from '@/interfaces/Service'
import { useTheme } from '@mui/material/styles';
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material'
import React from 'react'
import { StateButton } from '@/components/StateButton';
import { dateToString } from '@/helpers/utils';

interface Props {
	data: ServiceDetail
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
							<Typography variant='subtitle2'>Precio estimado</Typography>
							<Typography
								variant='body1'
								color={theme.palette.grey[600]}
							>
								{data.estimated_price}
							</Typography>
						</ListItemText>
					</ListItem>
					<ListItem>
						<ListItemText>
							<Typography pb={1} variant='subtitle2'>Fecha de Inicio</Typography>
							<Typography
								variant='body1'
								color={theme.palette.grey[600]}
							>
								{data.init_date}
							</Typography>
						</ListItemText>
					</ListItem>

				</List>
			</Box>
			<Box
				sx={{
					flex: '1'
				}}
			>
				<List>
					<ListItem>
						<ListItemText>
							<Typography variant='subtitle2'>Precio Final</Typography>
							<Typography
								variant='body1'
								color={theme.palette.grey[600]}
							>
								{data.final_price}
							</Typography>
						</ListItemText>
					</ListItem>
					<ListItem>
						<ListItemText>
							<Typography pb={1} variant='subtitle2'>Fecha de Termino</Typography>
							<Typography
								variant='body1'
								color={theme.palette.grey[600]}
							>
								{data.end_date}
							</Typography>
						</ListItemText>
					</ListItem>
				</List>
			</Box>
		</Box>
	)
}
