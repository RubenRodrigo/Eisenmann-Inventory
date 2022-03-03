import { TableUnitContext } from "@/context/TableUnitContext"
import { useContext } from "react"

export const useProductUnitTable = () => {
	const {
		productUnitState,
		startLoadingProductUnit,
		setLoadedProductUnit,
		addProductUnit,
		updateProductUnit,
		removeProductUnit
	} = useContext(TableUnitContext)
	return {
		...productUnitState,
		startLoadingProductUnit,
		setLoadedProductUnit,
		addProductUnit,
		updateProductUnit,
		removeProductUnit
	}
}
