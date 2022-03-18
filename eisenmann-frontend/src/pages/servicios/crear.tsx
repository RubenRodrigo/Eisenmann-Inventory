import { Header } from '@/components/Header';
import { Layout } from '@/components/Layout';
import { FormService } from '@/components/pages/Service/forms/FormService';
import { useLayout } from '@/hooks/useLayout';
import { ServiceBase, ServiceFormValues } from '@/interfaces/Service';
import { Paper } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react'
import { createService } from 'src/services/service';


const INITIAL_VALUES: ServiceFormValues = {
	client: null,
	code: "150015",
	estimated_price: "5000",
	init_date: new Date(),
	end_date: new Date(),
	observations: "",
	name: "Corte en CNC",
	state: false,
}

const Index = () => {


	const { handleOpenToast, handleToastInfo } = useLayout()
	const router = useRouter()

	const handleCreateService = async (values: ServiceBase) => {
		try {
			const session = await getSession()
			const res = await createService({ token: session?.accessToken ?? '', service: values })
			if (res.status = 201) {
				router.push('/servicios')
				handleToastInfo({
					code: res.status,
					message: 'El Servicio se creo correctamente.'
				})
			}
		} catch (err) {
			if (axios.isAxiosError(err)) {
				handleToastInfo({
					code: err.response ? err.response.status : 500,
					message: 'Hubo un error'
				})
			}
		} finally {
			handleOpenToast()
		}
	}

	return (
		<Box>
			<Header title="Crear Producto Stock" />
			<Box>
				<Paper
					elevation={1}
					sx={{
						p: 2,
					}}
				>
					<FormService
						INITIAL_VALUES={INITIAL_VALUES}
						saveData={handleCreateService}
					/>
				</Paper>
			</Box>
		</Box>
	)
}

export default Index

Index.auth = true
Index.getLayout = function getLayout(page: ReactElement) {
	return (
		<Layout>
			{page}
		</Layout>
	)
};