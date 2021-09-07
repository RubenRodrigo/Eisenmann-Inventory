import { types } from "../types/types";


export const uiProductStockModalReducer = (state = { modalOpen: false }, action) => {
	switch (action.type) {
		case types.uiOpenProductStockModal:
			return {
				...state,
				modalOpen: true
			}
		case types.uiCloseProductStockModal:
			return {
				...state,
				modalOpen: false
			}
		default:
			return state;
	}
}

export const uiCalendarReducer = (state = { open: false }, action) => {
	switch (action.type) {
		case types.uiOpenCalendar:
			return {
				...state,
				open: true
			}
		case types.uiCloseCalendar:
			return {
				...state,
				open: false
			}
		default:
			return state;
	}
}

export const uiClientModalReducer = (state = { open: false }, action) => {
	switch (action.type) {
		case types.uiOpenClientModal:
			return {
				...state,
				open: true
			}
		case types.uiCloseClientModal:
			return {
				...state,
				open: false
			}
		default:
			return state;
	}
}

export const uiEmployeeModalReducer = (state = { open: false }, action) => {
	switch (action.type) {
		case types.uiOpenEmployeeModal:
			return {
				...state,
				open: true
			}
		case types.uiCloseEmployeeModal:
			return {
				...state,
				open: false
			}
		default:
			return state;
	}
}

export const uiTypeModalReducer = (state = { open: false }, action) => {
	switch (action.type) {
		case types.uiOpenTypeModal:
			return {
				...state,
				open: true
			}
		case types.uiCloseTypeModal:
			return {
				...state,
				open: false
			}
		default:
			return state;
	}
}

export const uiUnitModalReducer = (state = { open: false }, action) => {
	switch (action.type) {
		case types.uiOpenUnitModal:
			return {
				...state,
				open: true
			}
		case types.uiCloseUnitModal:
			return {
				...state,
				open: false
			}
		default:
			return state;
	}
}
