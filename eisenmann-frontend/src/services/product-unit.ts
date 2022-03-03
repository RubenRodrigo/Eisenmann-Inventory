import { axiosInstanceServerSide } from "@/helpers/axiosInstance";
import { ProductUnitBase } from "@/interfaces/ProductUnit";

interface Props {
	token: string;
}

export const getUnitList = async ({ token }: Props) => {
	return await axiosInstanceServerSide(token).get('/product/unit/')
}
interface CreateProductUnitProps extends Props {
	productUnit: ProductUnitBase
}

export const createProductUnit = async ({ token, productUnit }: CreateProductUnitProps) => {
	return await axiosInstanceServerSide(token).post('/product/unit/', {
		...productUnit
	})
}

interface EditProductUnitProps extends Props {
	id: number;
	productUnit: ProductUnitBase;
}

export const editProductUnit = async ({ token, id, productUnit }: EditProductUnitProps) => {
	return await axiosInstanceServerSide(token).patch(`/product/unit/${id}/`, {
		...productUnit
	})
}


interface DeleteProductUnitProps extends Props {
	id: number;
}

export const deleteProductUnit = async ({ token, id }: DeleteProductUnitProps) => {
	return await axiosInstanceServerSide(token).delete(`/product/unit/${id}/`)
}