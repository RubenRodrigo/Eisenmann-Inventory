import Swal from "sweetalert2";
import { fetchSinToken } from "../helpers/fetch";
import { types } from "../types/types";

export const productStartLoadingData = () => {
	return async (dispatch) => {

		try {

			const resp = await fetchSinToken('product/');
			const body = await resp.json();

			dispatch(productSetData(body))

		} catch (error) {
			Swal.fire('Error', 'Algo salio mal, vuelva a intentar.', 'error')
			console.log(error);
		}

	}
}

export const productStartCreate = (product, router) => {
	return async (dispatch) => {
		try {

			const resp = await fetchSinToken('product/', product, 'POST');
			const body = await resp.json();
			if (resp.ok) {
				dispatch(productAddNew(body))
				Swal.fire(
					'Creado!',
					'Se creo el producto con exito.',
					'success'
				)
				router.push('/products')
			} else {
				console.log(body);
				Swal.fire('Error', 'Algo salio mal, vuelva a intentar.', 'error')
			}

		} catch (error) {
			console.log(error);
		}
	}
}

export const productStartUpdate = (product, router) => {
	return async (dispatch) => {

		try {
			const resp = await fetchSinToken(`product/${product.id}/`, product, 'PUT');
			const body = await resp.json();
			if (resp.ok) {
				dispatch(productUpdated(body))
				Swal.fire(
					'Actualizado!',
					'Se actualizado el producto con exito.',
					'success'
				)
				router.push('/products')
			} else {
				console.log(body);
				Swal.fire('Error', 'Algo salio mal, vuelva a intentar.', 'error')
			}

		} catch (error) {
			console.log(error)
		}
	}
}

export const productStartDelete = (id, router) => {
	return async (dispatch) => {
		try {

			Swal.fire({
				title: '¿Estas seguro?',
				text: 'Al eliminar este Producto se eliminaran todas las referencias que tiene en el sistema. Se recomienda archivar el producto.',
				icon: 'warning',
				confirmButtonColor: '#d33',
				confirmButtonText: 'Entendido',
				focusConfirm: false,
				focusCancel: true,
				showCancelButton: true,
			}).then(async (result) => {

				if (result.isConfirmed) {
					const resp = await fetchSinToken(`product/${id}/`, '', 'DELETE');
					if (resp.ok) {
						dispatch(productDeleted(id))
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
			console.log(error);
		}
	}
}



export const productSetData = (products) => ({
	type: types.productSetData,
	payload: products
})

export const productClearData = () => ({
	type: types.productClearData,
})

export const productAddNew = (product) => ({
	type: types.productAddNew,
	payload: product
})

export const productUpdated = (product) => ({
	type: types.productUpdated,
	payload: product
})

export const productDeleted = (id) => ({
	type: types.productDeleted,
	payload: id
})

export const productSetActive = (product) => ({
	type: types.productSetActive,
	payload: { ...product }
});

export const productClearActive = () => ({
	type: types.productClearActive,
});