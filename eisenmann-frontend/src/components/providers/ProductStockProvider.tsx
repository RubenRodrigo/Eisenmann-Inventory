import { ProductStockContext } from "@/context/ProductStockContext"
import { ProductEntry } from "@/interfaces/ProductEntry"
import { ProductStockDetail } from "@/interfaces/ProductStock"
import { addProductEntryAction, removeProductEntryAction, setLoadedProductStock, updateSummaryValuesAction } from "@/reducer/ProductStockReducer/action/actions"
import { productStockReducer } from "@/reducer/ProductStockReducer/state/productStockReducer"
import { useReducer } from "react"

const { Provider } = ProductStockContext


interface Props {
	children: JSX.Element | JSX.Element[]
	INITIAL_STATE: ProductStockDetail
}

export const ProductStockProvider = ({ children, INITIAL_STATE }: Props) => {

	const [productStockState, dispatch] = useReducer(productStockReducer, {
		productStock: INITIAL_STATE
	})

	const loadProductStock = (value: ProductStockDetail) => {
		dispatch(setLoadedProductStock(value))
	}

	const addProductEntry = (value: ProductEntry) => {
		dispatch(addProductEntryAction(value))
	}

	const removeProductEntry = (value: number) => {
		dispatch(removeProductEntryAction(value))
	}

	const updateSummaryValues = () => {
		dispatch(updateSummaryValuesAction())
	}

	return (
		<Provider value={{
			productStockState,
			loadProductStock,
			addProductEntry,
			removeProductEntry,
			updateSummaryValues,
		}}>
			{children}
		</Provider>
	)
}
