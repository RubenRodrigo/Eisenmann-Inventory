import { types } from "../types/types"

export const serviceList = (state = { services: [] }, action) => {

	switch (action.type) {

		case types.serviceSetData:
			return {
				...state,
				services: [...action.payload]
			}

		case types.serviceClearData:
			return { services: [] }


		default:
			return state

	}
}

export const serviceActive = (state = { service: {}, loading: true }, action) => {

	switch (action.type) {

		case types.serviceSetActive:
			return {
				...state,
				loading: false,
				service: action.payload
			}

		case types.serviceClearActive:
			return { service: {}, loading: true }


		default:
			return state
	}
}

export const serviceCreated = (state = { service: {}, loading: true }, action) => {

	switch (action.type) {

		case types.serviceAddNew:
			return {
				...state,
				loading: false,
				service: action.payload
			}

		default:
			return state
	}
}

export const serviceUpdated = (state = { service: {}, loading: true }, action) => {

	switch (action.type) {

		case types.serviceUpdated:
			return {
				...state,
				loading: false,
				service: action.payload
			}

		default:
			return state
	}
}

export const serviceDeleted = (state = { service: {}, loading: true }, action) => {

	switch (action.type) {

		case types.serviceDeleted:
			return {
				...state,
				loading: false,
				service: action.payload
			}

		default:
			return state
	}
}