import { createContext } from "react";

import { ServiceDetail } from "@/interfaces/Service";
import { ServiceState } from "@/reducer/ServiceReducer/interfaces/interfaces";
import { ServiceProduct } from "@/interfaces/ServiceProduct";

type ServiceContextProps = {
	serviceState: ServiceState
	loadService: (value: ServiceDetail) => void
	addServiceProduct: (value: ServiceProduct) => void
	updateSummaryValues: () => void
}

export const ServiceContext = createContext<ServiceContextProps>({} as ServiceContextProps);