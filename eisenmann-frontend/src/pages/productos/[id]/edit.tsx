import { Layout } from '@/components/Layout';
import { GetServerSideProps } from 'next';
import { getServerSession, Session } from 'next-auth';
import { ParsedUrlQuery } from 'querystring';
import React, { ReactElement } from 'react'
import { getProduct } from 'src/services/products';
import { authOptions } from '../../api/auth/[...nextauth]';

const Index = () => {
	return (
		<div>Index Edit</div>
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


type PageProps = {
	session: Session | null,
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
		const res = await getProduct({ token, id })
		console.log(res.data);
	}

	return {
		props: {
			session,
		},
	}
}

export default Index;