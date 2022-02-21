import { Header } from '@/components/Header';
import { Layout } from '@/components/Layout';
import { FormCreateProduct } from '@/components/Products/create/FormCreateProduct';
import { Box, Paper } from '@mui/material';
import { ReactElement } from 'react'

const Index = () => {
	return (
		<Box>
			<Header title="Crear Producto" />
			<Box>
				<Paper
					elevation={1}
					sx={{
						p: 2,
					}}
				>
					<FormCreateProduct />
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