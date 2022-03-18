import { ParsedUrlQuery } from 'querystring';
import { ReactElement } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getServerSession, Session } from 'next-auth';

import { authOptions } from '../api/auth/[...nextauth]';
import { ProductStockDetail } from '@/interfaces/ProductStock';
import { getProductStock } from 'src/services/product-stock';

import { Layout } from '@/components/Layout';

import { ProductStockProvider } from 'src/providers/ProductStockProvider';
import { ProductStock } from '@/components/pages/ProductsStock/item/ProductStock';

const Index = ({ session, data }: InferGetServerSidePropsType<typeof getServerSideProps>) => {

	return (
		<ProductStockProvider INITIAL_STATE={data}>
			<ProductStock />
		</ProductStockProvider>
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
			const res = await getProductStock({ token, id: parseInt(id) })
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