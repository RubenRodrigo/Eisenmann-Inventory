import { combineReducers } from "redux";
import { clientActive, clientList } from "./clientReducer";
import { employeeActive, employeeList } from "./employeeReducer";
import { productActive, productList } from "./productReducer";
import { productStockActive, productStockList } from "./productStockReducer";
import { serviceActive, serviceCreated, serviceDeleted, serviceList, serviceUpdated } from "./serviceReducer";
import { typeActive, typeList } from "./typeReducer";
import { unitActive, unitList } from "./unitReducer";
import { uiCalendarReducer, uiClientModalReducer, uiEmployeeModalReducer, uiProductStockModalReducer, uiTypeModalReducer, uiUnitModalReducer } from "./uiReducer";

// COMBINED REDUCERS
const reducers = {
	serviceList: serviceList,
	serviceActive: serviceActive,
	serviceCreated: serviceCreated,
	serviceUpdated: serviceUpdated,
	serviceDeleted: serviceDeleted,

	productList: productList,
	productActive: productActive,

	productStockList: productStockList,
	productStockActive: productStockActive,

	typeList: typeList,
	typeActive: typeActive,

	unitList: unitList,
	unitActive: unitActive,

	clientList: clientList,
	clientActive: clientActive,

	employeeList: employeeList,
	employeeActive: employeeActive,

	uiProductStockModal: uiProductStockModalReducer,
	uiClientModal: uiClientModalReducer,
	uiEmployeeModal: uiEmployeeModalReducer,
	uiTypeModal: uiTypeModalReducer,
	uiUnitModal: uiUnitModalReducer,
	uiCalendar: uiCalendarReducer
}

export default combineReducers(reducers)

