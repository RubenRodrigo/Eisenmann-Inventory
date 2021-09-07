import { useMemo } from 'react'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../reducers/rootReducer'

let store

function initStore(initialState) {
	return createStore(
		rootReducer,
		initialState,
		composeWithDevTools(applyMiddleware(thunkMiddleware))
	)
}

export const initializeStore = (preloadedState) => {
	let _store = store ?? initStore(preloadedState)

	// After navigating to a page with an initial Redux state, merge that state
	// with the current state in the store, and create a new store
	if (preloadedState && store) {
		_store = initStore({
			...store.getState(),
			...preloadedState,
		})
		// Reset the current store
		store = undefined
	}

	// For SSG and SSR always create a new store
	if (typeof window === 'undefined') return _store
	// Create the store once in the client
	if (!store) store = _store

	return _store
}

export function useStore(initialState) {
	const store = useMemo(() => initializeStore(initialState), [initialState])
	return store
}


// import { createStore, applyMiddleware } from 'redux'
// import { HYDRATE, createWrapper } from 'next-redux-wrapper'
// import thunkMiddleware from 'redux-thunk'
// import rootReducer from '../reducers/rootReducer'



// const bindMiddleware = (middleware) => {
// 	if (process.env.NODE_ENV !== 'production') {
// 		const { composeWithDevTools } = require('redux-devtools-extension')
// 		return composeWithDevTools(applyMiddleware(...middleware))
// 	}
// 	return applyMiddleware(...middleware)
// }

// const reducer = (state, action) => {

// 	if (action.type === HYDRATE) {
// 		const nextState = {
// 			...state, // use previous state
// 			...action.payload, // apply delta from hydration
// 		}
// 		if (state.serviceList.services.length > 0) {
// 			nextState.serviceList.services = state.serviceList.services // preserve count value on client side navigation
// 		}
// 		console.log("STATE", state);
// 		console.log("NEXTSTATE", nextState);
// 		return nextState
// 	} else {
// 		return rootReducer(state, action)
// 	}
// }

// const initStore = () => {
// 	return createStore(reducer, bindMiddleware([thunkMiddleware]))
// }

// export const wrapper = createWrapper(initStore)
