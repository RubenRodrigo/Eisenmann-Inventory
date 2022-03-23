import React, { ReactElement } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getServerSession, Session } from 'next-auth';

import { Layout } from '@/components/Layout';
import { getQueryParams } from '@/helpers/utils';

import { authOptions } from '../api/auth/[...nextauth]';
import { getEmployeeList } from 'src/services/employee';
import { Employee } from '@/interfaces/Employee';
import { EmployeeProvider } from 'src/providers/EmployeeProvider';
import { EmployeeContainer } from '@/components/pages/Employee/EmployeeContainer';

const Index = ({ session, data }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	return (
		<EmployeeProvider INITIAL_STATE={data}>
			<EmployeeContainer />
		</EmployeeProvider>
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
	data: Employee[]
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
	const query = context.query;

	const session = await getServerSession(context, authOptions)
	const token = session?.accessToken

	if (token) {
		try {
			const res = await getEmployeeList({ token, queryParams: '?' + getQueryParams(query) })
			if (res.status !== 200) {
				return {
					notFound: true,
				}
			}
			const data: Employee[] = res.data
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
