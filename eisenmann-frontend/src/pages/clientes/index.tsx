import React, { ReactElement } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getServerSession, Session } from 'next-auth';

import { Layout } from '@/components/Layout';
import { getQueryParams } from '@/helpers/utils';

import { authOptions } from '../api/auth/[...nextauth]';
import { Client } from '@/interfaces/Client';
import { getClientListService } from 'src/services/client';
import { ClientProvider } from 'src/providers/ClientProvider';
import { ClientContainer } from '@/components/pages/Client/ClientContainer';

const Index = ({ session, data }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	return (
		<ClientProvider INITIAL_STATE={data}>
			<ClientContainer />
		</ClientProvider>
	);
};
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
	data: Client[]
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
	const query = context.query;

	const session = await getServerSession(context, authOptions)
	const token = session?.accessToken

	if (token) {
		try {
			const res = await getClientListService({ token, queryParams: '?' + getQueryParams(query) })
			if (res.status !== 200) {
				return {
					notFound: true,
				}
			}
			const data: Client[] = res.data
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
