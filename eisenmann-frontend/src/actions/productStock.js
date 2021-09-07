import moment from "moment";
import Swal from "sweetalert2";
import { fetchSinToken } from "../helpers/fetch";
import { types } from "../types/types";

export const productStockStartLoadingData = (date = "") => {
	return async (dispatch) => {

		try {

			const resp = await fetchSinToken(`product/product_stock/${date !== "" ? date : ''}`);
			const body = await resp.json();

			dispatch(productStockSetData(body))

		} catch (error) {
			Swal.fire('Error', 'Algo salio mal, vuelva a intentar.', 'error')
			console.log(error);
		}

	}
}

export const productStockStartLoad = (id, type = "DETAIL") => {
	return async (dispatch) => {

		try {

			const resp = await fetchSinToken(`product/product_stock/${id}/`);
			const body = await resp.json();

			if (type === "TABLE") {
				dispatch(productStockUpdated(body))
			} else {
				dispatch(productStockSetActive(body))
			}

		} catch (error) {
			Swal.fire('Error', 'Algo salio mal, vuelva a intentar.', 'error')
			console.log(error);
		}

	}
}

export const productStockStartCreate = (product) => {
	return async (dispatch) => {
		try {

			const resp = await fetchSinToken('product/product_stock/', product, 'POST');
			const body = await resp.json();
			if (resp.ok) {
				dispatch(productStockAddNew(body))
				Swal.fire(
					'Creado!',
					'Se ha creado el stock con exito.',
					'success'
				)
			} else {
				console.log(body);
				Swal.fire('Error', body.product?.product, 'error')
			}

		} catch (error) {
			Swal.fire('Error', 'Algo salio mal, vuelva a intentar.', 'error')
			console.log(error);
		}
	}
}

// Product Stock Real
export const productStockStartUpdate = (product, nextMonth = true) => {
	return async (dispatch) => {

		try {

			const resp = await fetchSinToken(`product/product_stock/${product.id}/`, product, 'PUT');
			const body = await resp.json();

			if (resp.ok) {
				dispatch(productStockUpdated(body))
				if (nextMonth) {
					Swal.fire({
						title: '¿Quieres crear un nuevo producto stock?',
						text: 'Se creara un nuevo producto stock para el siguiente mes con el valor real que acabas de ingresar.',
						icon: 'warning',
						showCancelButton: true,
					}).then(async (result) => {

						if (result.isConfirmed) {
							dispatch(productStockNextMonth({ prev_stock: product.id }))
						}
					})
				}
			} else {
				Swal.fire('Error', 'Algo salio mal, vuelva a intentar.', 'error')
			}

		} catch (error) {
			console.log(error);
		}
	}
}

export const productStockNextMonth = (product) => {
	return async (dispatch) => {

		try {
			const resp = await fetchSinToken(`product/product_stock_real/`, product, 'POST');
			const body = await resp.json();

			if (resp.ok) {
				dispatch(productStockStartLoadingData())
			} else {
				Swal.fire('Error', body.prev_stock?.prev, 'error')
			}

		} catch (error) {
			console.log(error);
		}
	}
}

export const productStockStartDelete = (id) => {
	return async (dispatch) => {
		try {

			Swal.fire({
				title: '¿Estas seguro?',
				text: 'Al eliminar este Stock de producto se eliminara todas las referencias que tiene en los servicios.',
				icon: 'warning',
				confirmButtonColor: '#d33',
				confirmButtonText: 'Entendido',
				focusConfirm: false,
				focusCancel: true,
				showCancelButton: true
			}).then(async (result) => {

				if (result.isConfirmed) {
					const resp = await fetchSinToken(`product/product_stock/${id}/`, '', 'DELETE');
					if (resp.ok) {
						dispatch(productStockDeleted(id))
						Swal.fire(
							'Eliminado!',
							'Se ha eliminado con exito.',
							'success'
						)
					} else {
						Swal.fire('Error', 'Algo salio mal, vuelva a intentar.', 'error')
					}
				}

			})

		} catch (error) {
			Swal.fire('Error', 'Algo salio mal, vuelva a intentar.', 'error')
			console.log(error);
		}
	}
}

// PRODUCT STOCK LIST
export const productStockSetData = (productStocks) => ({
	type: types.productStockSetData,
	payload: productStocks
})

export const productStockClearData = () => ({
	type: types.productStockClearData,
})

export const productStockAddNew = (productStock) => ({
	type: types.productStockAddNew,
	payload: productStock
})

export const productStockDeleted = (id) => ({
	type: types.productStockDeleted,
	payload: id
})

export const productStockUpdated = (productStock) => ({
	type: types.productStockUpdated,
	payload: productStock
})

// PRODUCT ACTIVE
export const productStockSetActive = (productStock) => ({
	type: types.productStockSetActive,
	payload: { ...productStock }
});

export const productStockClearActive = () => ({
	type: types.productStockClearActive,
});