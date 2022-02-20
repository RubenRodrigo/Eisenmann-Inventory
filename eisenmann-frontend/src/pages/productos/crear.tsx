import { Header } from '@/components/Header';
import { Layout } from '@/components/Layout';
import { FromCreateProduct } from '@/components/Products/create/FromCreateProduct';
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
					<FromCreateProduct />
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