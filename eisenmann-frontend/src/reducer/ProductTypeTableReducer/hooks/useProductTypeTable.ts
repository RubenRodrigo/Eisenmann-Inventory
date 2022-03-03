import { TableTypeContext } from "@/context/TableTypeContext"
import { useContext } from "react"

export const useProductTypeTable = () => {
	const {
		productTypeState,
		startLoadingProductType,
		setLoadedProductType,
		addProductType,
		updateProductType,
		removeProductType
	} = useContext(TableTypeContext)
	return {
		...productTypeState,
		startLoadingProductType,
		setLoadedProductType,
		addProductType,
		updateProductType,
		removeProductType
	}
}
