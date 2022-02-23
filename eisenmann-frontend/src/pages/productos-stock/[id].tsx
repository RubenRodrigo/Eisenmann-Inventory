import { ParsedUrlQuery } from 'querystring';
import { ReactElement, useState } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getServerSession, Session } from 'next-auth';

import { Alert, Box, Button, Card, CardHeader, Divider, Grid, Snackbar } from '@mui/material';

import { authOptions } from '../api/auth/[...nextauth]';
import { ProductStockDetail } from '@/interfaces/ProductStock';
import { getProductStock } from 'src/services/product-stock';

import { Header } from '@/components/Header';
import { Layout } from '@/components/Layout';
import { ActionProductStock } from '@/components/pages/ProductsStock/item/ActionProductStock';
import { CardInfo } from '@/components/pages/ProductsStock/item/Cards/CardInfo';
import { CardResume } from '@/components/pages/ProductsStock/item/Cards/CardResume';
import { TableProductEntries } from '@/components/pages/ProductsStock/item/TableProductEntries';
import { DialogCustom } from '@/components/Dialog/DialogCustom';
import { FormEditProductStock } from '@/components/pages/ProductsStock/edit/FormEditProductStock';

const Index = ({ session, data }: InferGetServerSidePropsType<typeof getServerSideProps>) => {

	const [productStock, setProductStock] = useState<ProductStockDetail>(data)
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
				{
					data &&
					<FormEditProductStock
						handleOpenToast={handleOpenToast}
						setProductStock={setProductStock}
						productStock={productStock}
					/>
				}
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

Index.auth = true
Index.getLayout = function getLayout(page: ReactElement) {
	return (
		<Layout>
			{page}
		</Layout>
	)
};

interface PageProps {
	session: Session | null,
	data: ProductStockDetail
}

interface Params extends ParsedUrlQuery {
	id: string
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
	const params = context.params as Params;

	const session = await getServerSession(context, authOptions)
	const token = session?.accessToken

	const { id } = params

	if (token && params && params.id) {
		try {
			const res = await getProductStock({ token, id })
			if (res.status !== 200) {
				return {
					notFound: true,
				}
			}
			const data: ProductStockDetail = res.data
			return {
				props: {
					session,
					data: data
				},
			}
		} catch (error) {
			return {
				notFound: true,
			}
		}
	}
	return {
		notFound: true,
	}
}

export default Index;