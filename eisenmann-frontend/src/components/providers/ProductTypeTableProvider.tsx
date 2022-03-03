import { useReducer } from "react"

import { TableTypeContext } from "@/context/TableTypeContext"
import { ProductType } from "@/interfaces/ProductType"
import { addProductTypeAction, removeProductTypeAction, setLoadedProductTypeAction, setLoadingStateAction, updateProductTypeAction } from "@/reducer/ProductTypeTableReducer/action/actions"
import { productTypeTableReducer } from "@/reducer/ProductTypeTableReducer/state/state"
import { getSession, signOut } from "next-auth/react"
import { getTypeList } from "src/services/product-type"

const { Provider } = TableTypeContext


interface Props {
	children: JSX.Element | JSX.Element[];
}

export const TableTypeProvider = ({ children }: Props) => {

	const [productTypeState, dispatch] = useReducer(productTypeTableReducer, {
		productType: [],
		isLoading: false
	})

	const startLoadingProductType = async () => {
		try {
			setLoadingState(true)
			const session = await getSession()
			if (session && session.error) {
				signOut()
			}
			if (session?.accessToken) {
				const res = await getTypeList({ token: session.accessToken })
				const data: ProductType[] = res.data
				setLoadedProductType(data)
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

	const setLoadedProductType = (value: ProductType[]) => {
		dispatch(setLoadedProductTypeAction(value))
	}

	const addProductType = (value: ProductType) => {
		dispatch(addProductTypeAction(value))
	}

	const updateProductType = (value: ProductType) => {
		dispatch(updateProductTypeAction(value))
	}

	const removeProductType = (value: number) => {
		dispatch(removeProductTypeAction(value))
	}


	return (
		<Provider value={{
			productTypeState,
			startLoadingProductType,
			setLoadedProductType,
			addProductType,
			updateProductType,
			removeProductType,
		}}>
			{children}
		</Provider>
	)
}
