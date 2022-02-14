import { axiosInstanceServerSide } from "@/helpers/axiosInstance";

interface Props {
	token?: any;
	queryParams?: string;
}

export const getProductList = async ({ token, queryParams }: Props) => {
	return await axiosInstanceServerSide(token).get(
		'/product/product/' + (queryParams !== undefined ? queryParams : '')
	)
}

