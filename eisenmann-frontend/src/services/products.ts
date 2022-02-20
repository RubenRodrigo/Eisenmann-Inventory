import { axiosInstanceServerSide } from "@/helpers/axiosInstance";
import { ProductBase } from "@/interfaces/Product";

interface Props {
	token: string;
}

interface GetProductListProps extends Props {
	queryParams?: string;
}

export const getProductList = async ({ token, queryParams }: GetProductListProps) => {
	return await axiosInstanceServerSide(token).get(
		'/product/product/' + (queryParams !== undefined ? queryParams : '')
	)
}


interface GetProductProps extends Props {
	id: string;
}

export const getProduct = async ({ token, id }: GetProductProps) => {
	return await axiosInstanceServerSide(token).get('/product/product/' + id)
}



interface CreateProductProps extends Props {
	product: ProductBase
}

export const createProduct = async ({ token, product }: CreateProductProps) => {
	return await axiosInstanceServerSide(token).post('/product/product/', {
		...product
	})
}