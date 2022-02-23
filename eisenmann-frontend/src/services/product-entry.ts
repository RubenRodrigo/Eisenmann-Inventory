
import { axiosInstanceServerSide } from "@/helpers/axiosInstance";
import { ProductEntryBase } from "@/interfaces/ProductEntry";

interface Props {
	token: string;
}

interface GetProductEntryListProps extends Props {
	queryParams?: string;
}
export const getProductEntryList = async ({ token, queryParams }: GetProductEntryListProps) => {
	return await axiosInstanceServerSide(token).get(
		'/product/product_entry/' + (queryParams !== undefined ? queryParams : '')
	)
}

interface CreateProductEntryProps extends Props {
	productEntry: ProductEntryBase
}

export const createProductEntry = async ({ token, productEntry }: CreateProductEntryProps) => {
	return await axiosInstanceServerSide(token).post('/product/product_entry/', {
		...productEntry
	})
}