import { useReducer } from "react"

import { TableUnitContext } from "@/context/TableUnitContext"
import { ProductUnit } from "@/interfaces/ProductUnit"
import { addProductUnitAction, removeProductUnitAction, setLoadedProductUnitAction, setLoadingStateAction, updateProductUnitAction } from "@/reducer/ProductUnitTableReducer/action/actions"
import { productUnitTableReducer } from "@/reducer/ProductUnitTableReducer/state/state"
import { getSession, signOut } from "next-auth/react"
import { getUnitList } from "src/services/product-unit"

const { Provider } = TableUnitContext


interface Props {
	children: JSX.Element | JSX.Element[];
}

export const TableUnitProvider = ({ children }: Props) => {

	const [productUnitState, dispatch] = useReducer(productUnitTableReducer, {
		productUnit: [],
		isLoading: false
	})

	const startLoadingProductUnit = async () => {
		try {
			setLoadingState(true)
			const session = await getSession()
			if (session && session.error) {
				signOut()
			}
			if (session?.accessToken) {
				const res = await getUnitList({ token: session.accessToken })
				const data: ProductUnit[] = res.data
				setLoadedProductUnit(data)
			}
		} catch (error) {
			console.log(error);
		} finally {

			setLoadingState(false)
		}
	}

	const setLoadingState = (value: boolean) => {
		dispatch(setLoadingStateAction(value))
	}

	const setLoadedProductUnit = (value: ProductUnit[]) => {
		dispatch(setLoadedProductUnitAction(value))
	}

	const addProductUnit = (value: ProductUnit) => {
		dispatch(addProductUnitAction(value))
	}

	const updateProductUnit = (value: ProductUnit) => {
		dispatch(updateProductUnitAction(value))
	}

	const removeProductUnit = (value: number) => {
		dispatch(removeProductUnitAction(value))
	}


	return (
		<Provider value={{
			productUnitState,
			startLoadingProductUnit,
			setLoadedProductUnit,
			addProductUnit,
			updateProductUnit,
			removeProductUnit,
		}}>
			{children}
		</Provider>
	)
}
