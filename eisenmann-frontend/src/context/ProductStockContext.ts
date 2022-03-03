import { createContext } from "react";

import { ProductStockDetail } from "@/interfaces/ProductStock";
import { ProductStockState } from "@/reducer/ProductStockReducer/interfaces/interfaces";
import { ProductEntry } from "@/interfaces/ProductEntry";

type ProductStockContextProps = {
	productStockState: ProductStockState
	loadProductStock: (value: ProductStockDetail) => void
	addProductEntry: (value: ProductEntry) => void
	removeProductEntry: (value: number) => void
	updateSummaryValues: () => void
}

export const ProductStockContext = createContext<ProductStockContextProps>({} as ProductStockContextProps);