import { axiosInstanceServerSide } from "@/helpers/axiosInstance";
import { ServiceProductBase } from "@/interfaces/ServiceProduct";

interface Props {
	token: string;
}

interface GetServiceProductListProps extends Props {
	queryParams?: string;
}
export const getServiceProductList = async ({ token, queryParams }: GetServiceProductListProps) => {
	return await axiosInstanceServerSide(token).get(
		'/service/service_product/' + (queryParams !== undefined ? queryParams : '')
	)
}

interface CreateServiceProductProps extends Props {
	serviceProduct: ServiceProductBase
}

export const createServiceProduct = async ({ token, serviceProduct }: CreateServiceProductProps) => {
	return await axiosInstanceServerSide(token).post('/service/service_product/', {
		...serviceProduct
	})
}

interface DeleteServiceProductProps extends Props {
	id: number;
}

export const deleteServiceProduct = async ({ token, id }: DeleteServiceProductProps) => {
	return await axiosInstanceServerSide(token).delete(`/service/service_product/${id}/`)
}