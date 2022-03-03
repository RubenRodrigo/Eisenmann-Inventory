import { axiosInstanceServerSide } from "@/helpers/axiosInstance";
import { ProductTypeBase } from "@/interfaces/ProductType";

interface Props {
	token: string;
}

export const getTypeList = async ({ token }: Props) => {
	return await axiosInstanceServerSide(token).get('/product/type/')
}

interface CreateProductTypeProps extends Props {
	productType: ProductTypeBase
}

export const createProductType = async ({ token, productType }: CreateProductTypeProps) => {
	return await axiosInstanceServerSide(token).post('/product/type/', {
		...productType
	})
}

interface EditProductTypeProps extends Props {
	id: number;
	productType: ProductTypeBase;
}

export const editProductType = async ({ token, id, productType }: EditProductTypeProps) => {
	return await axiosInstanceServerSide(token).patch(`/product/type/${id}/`, {
		...productType
	})
}

interface DeleteProductTypeProps extends Props {
	id: number;
}

export const deleteProductType = async ({ token, id }: DeleteProductTypeProps) => {
	return await axiosInstanceServerSide(token).delete(`/product/type/${id}/`)
}