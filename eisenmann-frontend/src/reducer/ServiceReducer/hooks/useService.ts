import { ServiceContext } from "@/context/ServiceContext"
import { useContext } from "react"

export const useService = () => {
	const { serviceState, loadService, addServiceProduct, updateSummaryValues } = useContext(ServiceContext)
	const { service } = serviceState
	return {
		service,
		loadService,
		addServiceProduct,
		updateSummaryValues
	}
}
