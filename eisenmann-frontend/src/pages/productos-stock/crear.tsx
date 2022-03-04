import { Box, Paper } from '@mui/material';
import { Header } from '@/components/Header';
import { Layout } from '@/components/Layout';
import { ReactElement } from 'react'
import { FormCreateProductStock } from '@/components/pages/ProductsStock/forms/create/FormCreateProductStock';

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
					<FormCreateProductStock />
				</Paper>
			</Box>
		</Box>
	)
}

Index.auth = true
Index.getLayout = function getLayout(page: ReactElement) {
	return (
		<Layout>
			{page}
		</Layout>
	)
};
export default Index