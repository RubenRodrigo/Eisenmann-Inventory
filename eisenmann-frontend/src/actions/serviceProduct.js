import Swal from "sweetalert2";
import { fetchSinToken } from "../helpers/fetch";
import { types } from "../types/types";
import { productStockStartLoadingData } from "./productStock";
import { serviceStartLoad } from "./service";

// Add ServiceProduct and reload service active 
export const serviceStartAddProduct = (product) => {
	return async (dispatch) => {

		try {

			const resp = await fetchSinToken(`service/service_product/`, product, 'POST');
			const body = await resp.json();

			if (resp.ok) {
				dispatch(serviceStartLoad(body.service))
				dispatch(productStockStartLoadingData())
			} else {
				console.log(body);
				Swal.fire('Error', 'Algo salio mal, vuelva a intentar.', 'error')
			}

		} catch (error) {
			console.log(error);
		}
	}
}

// Update ServiceProduct and reload service active 
export const serviceStartUpdateProduct = (product) => {
	return async (dispatch) => {

		try {

			const resp = await fetchSinToken(`service/service_product/${product.id}/`, product, 'PUT');
			const body = await resp.json();

			if (resp.ok) {
				dispatch(serviceStartLoad(body.service))
				dispatch(productStockStartLoadingData())
			} else {
				console.log(body);
				Swal.fire('Error', 'Algo salio mal, vuelva a intentar.', 'error')
			}

		} catch (error) {
			console.log(error)
		}
	}
}

// Delete ServiceProduct and reload service active
export const serviceStartDeleteProduct = (id, service_product_id) => {
	return async (dispatch) => {
		try {
			Swal.fire({
				title: '¿Estas seguro?',
				text: 'Se eliminara este producto del servicio',
				icon: 'warning',
				confirmButtonColor: '#d33',
				confirmButtonText: 'Entendido',
				focusConfirm: false,
				focusCancel: true,
				showCancelButton: true
			}).then(async (result) => {
				if (result.isConfirmed) {
					const resp = await fetchSinToken(`service/service_product/${service_product_id}`, '', 'DELETE');
					if (resp.ok) {
						Swal.fire(
							'Eliminado!',
							'Se ha eliminado con exito.',
							'success'
						)
						dispatch(serviceStartLoad(id))
					} else {
						Swal.fire('Error', 'Algo salio mal, vuelva a intentar.', 'error')
					}
				}
			})

		} catch (error) {
			console.log(error);
		}

	}
}

export const serviceAddProduct = (product) => ({
	type: types.serviceAddProduct,
	payload: product
});

export const serviceUpdateProduct = (product) => ({
	type: types.serviceUpdateProduct,
	payload: product
});

export const serviceDeleteProduct = (id) => ({
	type: types.serviceDeleteProduct,
	payload: id
});

