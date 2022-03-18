import React, { ReactElement } from 'react'

import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { getServerSession, Session } from 'next-auth'

import { Layout } from '@/components/Layout'
import { Service } from '@/components/pages/Service/item/Service'
import { ServiceProvider } from 'src/providers/ServiceProvider'
import { ServiceDetail } from '@/interfaces/Service'
import { getService } from 'src/services/service'
import { authOptions } from '../api/auth/[...nextauth]'

const Index = ({ session, data }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	return (
		<ServiceProvider INITIAL_STATE={data}>
			<Service />
		</ServiceProvider>
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
	data: ServiceDetail
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {

	const params = context.params;

	const session = await getServerSession(context, authOptions)
	const token = session?.accessToken

	if (token) {
		try {
			const res = await getService({ token, id: params?.id as string ?? '' })
			if (res.status !== 200) {
				return {
					notFound: true,
				}
			}
			const data: ServiceDetail = res.data
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


export default Index