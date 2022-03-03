import { createContext } from "react";

import { ProductUnit } from "@/interfaces/ProductUnit";
import { ProductUnitTableState } from "@/reducer/ProductUnitTableReducer/interfaces/interfaces";

type TableUnitProps = {
	productUnitState: ProductUnitTableState
	startLoadingProductUnit: () => Promise<void>;
	setLoadedProductUnit: (value: ProductUnit[]) => void
	addProductUnit: (value: ProductUnit) => void
	updateProductUnit: (value: ProductUnit) => void
	removeProductUnit: (value: number) => void
}

export const TableUnitContext = createContext<TableUnitProps>({} as TableUnitProps);