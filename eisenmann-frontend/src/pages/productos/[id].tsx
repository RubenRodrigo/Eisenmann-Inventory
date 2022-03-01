import { ParsedUrlQuery } from 'querystring';
import { ReactElement, useState } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getServerSession, Session } from 'next-auth';

import { Alert, Box, Button, Card, CardHeader, Divider, Grid, Snackbar } from '@mui/material';

import { authOptions } from '../api/auth/[...nextauth]';
import { ProductDetail } from '@/interfaces/Product';
import { getProduct } from 'src/services/products';

import { CardInfo } from '@/components/pages/Products/product/Cards/CardInfo';
import { CardResume } from '@/components/pages/Products/product/Cards/CardResume';
import { Header } from '@/components/Header';
import { Layout } from '@/components/Layout';
import { TableProductStock } from '@/components/pages/Products/product/TableProductStock';
import { DialogCustom } from '@/components/Dialog/DialogCustom';
import { FormEditProduct } from '@/components/pages/Products/edit/FormEditProduct';
import { ActionProduct } from '@/components/pages/Products/product/ActionProduct';

const Index = ({ session, data }: InferGetServerSidePropsType<typeof getServerSideProps>) => {

	const [product, setProduct] = useState<ProductDetail>(data)
	const [openDialog, setOpenDialog] = useState(false);

	const handleOpenDialog = () => setOpenDialog(true);
	const handleCloseDialog = () => setOpenDialog(false);

	return (
		<Box>
			<Header title={`${product.name ? product.name : 'Productos'}`}>
				<ActionProduct productId={product.id} />
			</Header>
			<DialogCustom
				title='Editar Producto'
				open={openDialog}
				handleClose={handleCloseDialog}
				handleOpen={handleOpenDialog}
			>
				{
					data &&
					<FormEditProduct
						setProduct={setProduct}
						product={product}
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
								<CardInfo data={product} />
							</Card>
						</Grid>
						<Grid item xs={5}>
							<Card>
								<CardHeader title="Resumen" />
								<Divider light />
								<CardResume data={product} />
							</Card>
						</Grid>
					</Grid>
				</Box>
				<Box>
					<Card>
						<CardHeader
							title="Productos Stock"
							subheader="Todos los ProductosStock de este producto. Solo se muestran los 10 últimos creados."
						/>
						<Divider light />
						<TableProductStock data={product.product_stock} />
					</Card>
				</Box>
			</Box>
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
	data: ProductDetail
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
			const res = await getProduct({ token, id })
			if (res.status !== 200) {
				return {
					notFound: true,
				}
			}
			const data: ProductDetail = res.data
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