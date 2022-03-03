import { ProductType } from "@/interfaces/ProductType";

export interface ProductTypeTableState {
	productType: ProductType[],
	isLoading: boolean
}