import { axiosInstanceServerSide } from "@/helpers/axiosInstance";

interface GetProductListProps {
	token: string;
	queryParams?: string;
}

export const getProductList = async ({ token, queryParams }: GetProductListProps) => {
	return await axiosInstanceServerSide(token).get(
		'/product/product/' + (queryParams !== undefined ? queryParams : '')
	)
}


interface GetProductProps {
	token: string;
	id: string;
}

export const getProduct = async ({ token, id }: GetProductProps) => {
	return await axiosInstanceServerSide(token).get('/product/product/' + id)
}