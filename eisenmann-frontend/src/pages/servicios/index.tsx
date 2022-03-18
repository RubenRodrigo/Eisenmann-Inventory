import React, { ReactElement } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getServerSession, Session } from 'next-auth';
import { Box, Button, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { Header } from '@/components/Header';
import { Layout } from '@/components/Layout';
import { NextLinkComposed } from '@/components/Link';
import { TableService } from '@/components/pages/Service/tables/TableService';
import { ServiceResponse } from '@/interfaces/Service';
import { getQueryParams } from '@/helpers/utils';

import { getServiceList } from 'src/services/service';
import { authOptions } from '../api/auth/[...nextauth]';

const Index = ({ session, data }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	return (
		<Box>
			<Header title="Servicios">
				<Button
					component={NextLinkComposed}
					variant="contained"
					startIcon={<AddIcon />}
					to='/servicios/crear'
					sx={{
						fontWeight: 'bold',
						textTransform: 'none',
						boxShadow: 0,
					}}
				>Nuevo Servicio</Button>
			</Header>
			<Box>
				<Paper
					elevation={1}
					sx={{
						p: 2,
					}}
				>
					<TableService data={data} />
				</Paper>
			</Box>
		</Box>
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
	data: ServiceResponse
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
	const query = context.query;

	const session = await getServerSession(context, authOptions)
	const token = session?.accessToken

	if (token) {
		try {
			const res = await getServiceList({ token, queryParams: '?' + getQueryParams(query) })
			if (res.status !== 200) {
				return {
					notFound: true,
				}
			}
			const data: ServiceResponse = res.data
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

