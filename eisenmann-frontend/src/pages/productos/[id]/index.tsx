import { ParsedUrlQuery } from 'querystring';
import { ReactElement } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getServerSession, Session } from 'next-auth';

import { Box, Button, Card, CardContent, CardHeader, Divider, Grid, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { authOptions } from '../../api/auth/[...nextauth]';
import { ProductDetail } from '@/interfaces/Product';
import { getProduct } from 'src/services/products';

import { CardInfo } from '@/components/Products/product/Cards/CardInfo';
import { CardResume } from '@/components/Products/product/Cards/CardResume';
import { Header } from '@/components/Header';
import { Layout } from '@/components/Layout';
import { TableProductStock } from '@/components/Products/product/TableProductStock';

const Index = ({ session, data }: InferGetServerSidePropsType<typeof getServerSideProps>) => {

	return (
		<Box>
			<Header title={`${data?.name ? data.name : 'Productos'}`} />
			<Box>
				<Box sx={{ mb: 5 }}>
					<Grid container spacing={2}>
						<Grid item xs={7}>
							<Card>
								<CardHeader
									title="Información Básica"
									action={
										<Button>Editar</Button>
									}
								/>
								<Divider light />
								<CardInfo data={data} />
							</Card>
						</Grid>
						<Grid item xs={5}>
							<Card>
								<CardHeader title="Resumen" />
								<Divider light />
								<CardResume data={data} />
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
						<TableProductStock data={data?.product_stock} />
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
	data?: ProductDetail
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
			const data: ProductDetail = res.data
			return {
				props: {
					session,
					data: data
				},
			}
		} catch (error) {

		}
	}

	return {
		props: {
			session,
		},
	}
}

export default Index;