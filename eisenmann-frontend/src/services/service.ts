import { axiosInstanceServerSide } from "@/helpers/axiosInstance"
import { ServiceBase } from "@/interfaces/Service"

interface Props {
	token: string;
}

interface GetServiceListProps extends Props {
	queryParams?: string;
}
export const getServiceList = async ({ token, queryParams }: GetServiceListProps) => {

	return await axiosInstanceServerSide(token).get(
		'/service/service/' + (queryParams !== undefined ? queryParams : '')
	)
}

interface CreateServiceProps extends Props {
	service: ServiceBase;
}
export const createService = async ({ token, service }: CreateServiceProps) => {
	return await axiosInstanceServerSide(token).post('/service/service/', {
		...service
	})
}

interface GetServiceProps extends Props {
	id: string;
}
export const getService = async ({ token, id }: GetServiceProps) => {
	return await axiosInstanceServerSide(token).get('/service/service/' + id)
}

interface UpdateServiceProps extends Props {
	id: number;
	service: ServiceBase;
}
export const updateService = async ({ token, id, service }: UpdateServiceProps) => {
	return await axiosInstanceServerSide(token).put(`/service/service/${id}/`, {
		...service
	})
}

interface DeleteServiceProps extends Props {
	id: number;
}
export const deleteService = async ({ token, id }: DeleteServiceProps) => {
	return await axiosInstanceServerSide(token).delete('/service/service/' + id)
}