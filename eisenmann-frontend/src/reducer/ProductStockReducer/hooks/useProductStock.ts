import { ProductStockContext } from "@/context/ProductStockContext"
import { useContext } from "react"

export const useProductStock = () => {
	const { productStockState, loadProductStock, addProductEntry, removeProductEntry, updateSummaryValues } = useContext(ProductStockContext)
	const { productStock } = productStockState
	return {
		productStock,
		loadProductStock,
		addProductEntry,
		removeProductEntry,
		updateSummaryValues,
	}
}
