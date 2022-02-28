import { useState } from 'react';
import { Alert, Box, Button, Card, CardHeader, Divider, Grid, Snackbar } from '@mui/material';

import { DialogCustom } from '@/components/Dialog/DialogCustom';
import { Header } from '@/components/Header';
import { ActionProductStock } from './ActionProductStock';
import { CardInfo } from './Cards/CardInfo';
import { CardResume } from './Cards/CardResume';
import { TableProductEntries } from './TableProductEntries';
import { FormEditProductStock } from '../edit/FormEditProductStock';
import { useProductStock } from '@/reducer/ProductStockReducer/hooks/useProductStock';

export const ProductStock = () => {

	const { productStock } = useProductStock()

	const [openToast, setOpenToast] = useState(false);
	const [openDialog, setOpenDialog] = useState(false);

	const handleOpenDialog = () => setOpenDialog(true);
	const handleCloseDialog = () => setOpenDialog(false);

	const handleOpenToast = () => setOpenToast(true);
	const handleCloseToast = () => setOpenToast(false);

	return (
		<Box>
			<Header title={`${productStock.product_detail.name ? productStock.product_detail.name : 'Producto Stock'}`}>
				<ActionProductStock productStockId={productStock.id} />
			</Header>
			<DialogCustom
				title='Editar Producto'
				open={openDialog}
				handleClose={handleCloseDialog}
				handleOpen={handleOpenDialog}
			>
				<FormEditProductStock
					handleOpenToast={handleOpenToast}
				/>
			</DialogCustom>
			<Box>
				<Box sx={{ mb: 5 }}>
					<Grid container spacing={2}>
						<Grid item xs={7}>
							<Card>
								<CardHeader
									title="Información Básica"
									action={
										<Button onClick={handleOpenDialog}>Editar</Button>
									}
								/>
								<Divider light />
								<CardInfo data={productStock} />
							</Card>
						</Grid>
						<Grid item xs={5}>
							{/* Resume info like total stock, total price, etc.  */}
							<Card>
								<CardHeader title="Resumen" />
								<Divider light />
								<CardResume data={productStock} />
							</Card>
							{/* Resume info like total stock, total price, etc.  */}
						</Grid>
					</Grid>
				</Box>
				{/* Product Entries */}
				<Box>
					<Card>
						<CardHeader
							title="Entradas de Productos"
							subheader="Todas las entradas de un producto por més."
						/>
						<Divider light />
						<TableProductEntries data={productStock.product_entry} />
					</Card>
				</Box>
				{/* Product Entries */}
			</Box>
			<Snackbar
				open={openToast}
				autoHideDuration={6000}
				onClose={handleCloseToast}
			>
				<Alert onClose={handleCloseToast} severity="success" sx={{ width: '100%' }}>
					Producto Stock actualizado
				</Alert>
			</Snackbar>
		</Box >
	)
}
