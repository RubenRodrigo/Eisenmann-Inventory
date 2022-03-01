import { LayoutContext } from "@/context/LayoutContext"
import { useContext } from "react"

export const useLayout = () => {
	const {
		openToast,
		toastInfo,
		handleCloseToast,
		handleOpenToast,
		handleToastInfo
	} = useContext(LayoutContext)

	return {
		openToast,
		toastInfo,
		handleCloseToast,
		handleOpenToast,
		handleToastInfo
	}
}