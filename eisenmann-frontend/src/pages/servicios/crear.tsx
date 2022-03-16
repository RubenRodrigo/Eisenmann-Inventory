import { Header } from '@/components/Header';
import { Layout } from '@/components/Layout';
import { FormCreateService } from '@/components/pages/Service/forms/FormCreateService';
import { Paper } from '@mui/material';
import { Box } from '@mui/system';
import React, { ReactElement } from 'react'

const Index = () => {
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
					<FormCreateService />
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