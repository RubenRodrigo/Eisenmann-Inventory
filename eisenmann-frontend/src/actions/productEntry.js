// PRODUCT IS PRODUCT STOCK
import Swal from "sweetalert2";
import { fetchSinToken } from "../helpers/fetch";
import { productStockStartLoad } from "./productStock";

// Add product entry to product stock and reload current product. Set active the current product
export const productStockStartAddEntry = (entry) => {
	return async (dispatch) => {

		try {

			const resp = await fetchSinToken(`product/product_entry/`, entry, 'POST');
			const body = await resp.json();
			if (resp.ok) {
				dispatch(productStockStartLoad(body.product))
			} else {
				console.log(body);
				Swal.fire('Error', "Algo salio mal, vuelva a intentarlo", 'error')
			}

		} catch (error) {
			console.log(error);
		}
	}
}

// Add product entry to product stock and reload current product. Update the table
export const productStockTableStartAddEntry = (entry) => {
	return async (dispatch) => {

		try {

			const resp = await fetchSinToken(`product/product_entry/`, entry, 'POST');
			const body = await resp.json();
			if (resp.ok) {
				dispatch(productStockStartLoad(body.product, "TABLE"))
			} else {
				console.log(body);
				Swal.fire('Error', "Algo salio mal, vuelva a intentarlo", 'error')
			}

		} catch (error) {
			console.log(error);
		}
	}
}



// Delete a product entry and update current product
export const productStockStartDeleteEntry = (id, entry_id) => {
	return async (dispatch) => {
		try {
			Swal.fire({
				title: '¿Estas seguro?',
				text: 'Se eliminara esta entrada del producto actual',
				icon: 'warning',
				confirmButtonColor: '#d33',
				confirmButtonText: 'Entendido',
				focusConfirm: false,
				focusCancel: true,
				showCancelButton: true
			}).then(async (result) => {

				if (result.isConfirmed) {
					const resp = await fetchSinToken(`product/product_entry/${entry_id}`, '', 'DELETE');
					if (resp.ok) {
						dispatch(productStockStartLoad(id))
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

