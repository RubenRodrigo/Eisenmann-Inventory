import Swal from "sweetalert2";
import { fetchSinToken } from "../helpers/fetch";
import { types } from "../types/types";

export const typeStartLoadingData = () => {
	return async (dispatch) => {

		try {
			const resp = await fetchSinToken(`product/type/`);
			const body = await resp.json();

			dispatch(typeSetData(body))

		} catch (error) {
			Swal.fire('Error', 'Algo salio mal, vuelva a intentar.', 'error')
			console.log(error);
		}

	}
}

export const typeStartCreate = (type) => {
	return async (dispatch) => {
		try {

			const resp = await fetchSinToken('product/type/', type, 'POST');
			const body = await resp.json();
			if (resp.ok) {
				dispatch(typeAddNew(body))
				Swal.fire(
					'Creado!',
					'Se ha creado el tipo de producto con exito.',
					'success'
				)
			} else {
				console.log(body);
				Swal.fire('Error', 'Algo salio mal, vuelva a intentar.', 'error')
			}

		} catch (error) {
			Swal.fire('Error', 'Algo salio mal, vuelva a intentar.', 'error')
			console.log(error);
		}
	}
}

export const typeStartUpdate = (type) => {
	return async (dispatch) => {
		try {

			const resp = await fetchSinToken(`product/type/${type.id}/`, type, 'PUT');
			const body = await resp.json();

			if (resp.ok) {
				dispatch(typeUpdated(body))
				Swal.fire(
					'Actualizado!',
					'Se ha actualizado el tipo de producto con exito.',
					'success'
				)
			} else {
				Swal.fire('Error', 'Algo salio mal, vuelva a intentar.', 'error')
			}

		} catch (error) {
			Swal.fire('Error', 'Algo salio mal, vuelva a intentar.', 'error')
			console.log(error);
		}
	}
}

export const typeStartDelete = (id) => {
	return async (dispatch) => {
		try {
			Swal.fire({
				title: '¿Estas seguro?',
				text: 'Se este tipo de producto. Los productos asociados no se eliminaran, sino se pondran en blanco. Tendra que añadirlos manualmente',
				icon: 'warning',
				confirmButtonColor: '#d33',
				confirmButtonText: 'Entendido',
				focusConfirm: false,
				focusCancel: true,
				showCancelButton: true
			}).then(async (result) => {

				if (result.isConfirmed) {
					const resp = await fetchSinToken(`product/type/${id}/`, '', 'DELETE');
					if (resp.ok) {
						dispatch(typeDeleted(id))
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

export const typeSetData = (data) => ({
	type: types.typeSetData,
	payload: data
})

export const typeClearData = () => ({
	type: types.typeClearData,
})

export const typeAddNew = (type) => ({
	type: types.typeAddNew,
	payload: type
})

export const typeUpdated = (type) => ({
	type: types.typeUpdated,
	payload: type
})

export const typeDeleted = (id) => ({
	type: types.typeDeleted,
	payload: id
})

// type ACTIVE
export const typeSetActive = (type) => ({
	type: types.typeSetActive,
	payload: type
});

export const typeClearActive = () => ({
	type: types.typeClearActive,
});
