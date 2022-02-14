import { ReactElement } from "react";
import { Header } from "@/components/Header";
import { Layout } from "@/components/Layout";
import { Box, Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

const Index = () => {
	return (
		<Box>
			<Header title="SubProducto" >
				<Button
					variant="contained"
					startIcon={<AddIcon />}
					sx={{
						fontWeight: 'bold',
						textTransform: 'none',
						boxShadow: 0,
					}}
				>Nuevo Producto</Button>
			</Header>
		</Box>
	)
};

Index.getLayout = function getLayout(page: ReactElement) {
	return (
		<Layout>
			{page}
		</Layout>
	)
};

export default Index;

