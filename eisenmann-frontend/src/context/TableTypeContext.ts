import { createContext } from "react";

import { ProductType } from "@/interfaces/ProductType";
import { ProductTypeTableState } from "@/reducer/ProductTypeTableReducer/interfaces/interfaces";

type TableTypeProps = {
	productTypeState: ProductTypeTableState
	startLoadingProductType: () => Promise<void>;
	setLoadedProductType: (value: ProductType[]) => void
	addProductType: (value: ProductType) => void
	updateProductType: (value: ProductType) => void
	removeProductType: (value: number) => void
}

export const TableTypeContext = createContext<TableTypeProps>({} as TableTypeProps);