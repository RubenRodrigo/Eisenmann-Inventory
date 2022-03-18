import { Header } from '@/components/Header'
import { Box, Button, Card, CardHeader, Divider, Grid } from '@mui/material'
import React, { useState } from 'react'
import { useService } from '@/reducer/ServiceReducer/hooks/useService'
import { CardInfo } from './Cards/CardInfo'
import { CardResume } from './Cards/CardResume'
import { ServiceProductTable } from './ServiceProductTable'
import { ActionService } from './ActionService'
import { DialogCustom } from '@/components/Dialog/DialogCustom'
import { FormService } from '../forms/FormService'
import { ServiceBase } from '@/interfaces/Service'
import { getSession } from 'next-auth/react'
import { updateService } from 'src/services/service'
import { useLayout } from '@/hooks/useLayout'
import axios from 'axios'

export const Service = () => {

	const { handleOpenToast, handleToastInfo } = useLayout()
	const { service, loadService } = useService()
	const [openDialog, setOpenDialog] = useState(false);

	const handleOpenDialog = () => setOpenDialog(true);
	const handleCloseDialog = () => setOpenDialog(false);

	const handleUpdateService = async (values: ServiceBase) => {
		try {
			const session = await getSession()
			const res = await updateService({ token: session?.accessToken ?? '', id: service.id, service: values })
			if (res.status = 200) {
				loadService(res.data)
				handleToastInfo({
					code: res.status,
					message: 'El Servicio se actualizo correctamente.'
				})
			}
		} catch (err) {
			if (axios.isAxiosError(err)) {
				handleToastInfo({
					code: err.response ? err.response.status : 500,
					message: 'Hubo un error'
				})
			}
			console.log(err);
		} finally {
			handleOpenToast()
			handleCloseDialog()
		}
	}

	return (
		<Box>
			<Header title={`${service.name ? service.name : 'Servicios'}`}>
				<ActionService />
			</Header>
			<DialogCustom
				title='Editar Producto'
				open={openDialog}
				handleClose={handleCloseDialog}
				handleOpen={handleOpenDialog}
			>
				<FormService
					saveData={handleUpdateService}
					INITIAL_VALUES={{
						client: service.client_detail,
						code: service.code,
						estimated_price: service.estimated_price,
						init_date: new Date(service.init_date),
						end_date: new Date(service.end_date),
						observations: service.observations,
						name: service.name,
						state: service.state
					}}
				/>
			</DialogCustom>
			<Box>
				<Box sx={{ mb: 5 }}>
					<Grid container spacing={2}>
						<Grid item xs={6}>
							<Card>
								<CardHeader
									title="Información Básica"
									action={
										<Button onClick={handleOpenDialog}>Editar</Button>
									}
								/>
								<Divider light />
								<CardInfo data={service} />
							</Card>
						</Grid>
						<Grid item xs={6}>
							<Card>
								<CardHeader title="Resumen" />
								<Divider light />
								<CardResume data={service} />
							</Card>
						</Grid>
					</Grid>
				</Box>
				{/* Product Services  */}
				<Box>
					<Card>
						<CardHeader
							title="Productos del servicio"
							subheader="Todos los productos usados en el servicio."
						/>
						<Divider light />
						<ServiceProductTable data={service.service_product} />
					</Card>
				</Box>
				{/* Product Entries */}
			</Box>
		</Box>
	)
}
