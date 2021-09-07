import Swal from "sweetalert2";
import { fetchSinToken } from "../helpers/fetch";
import { types } from "../types/types";

export const clientStartCreate = (client) => {
	return async (dispatch) => {
		try {

			const resp = await fetchSinToken('client/', client, 'POST');
			const body = await resp.json();
			if (resp.ok) {
				dispatch(clientAddNew(body))
				Swal.fire(
					'Creado!',
					'Se ha creado el cliente con exito.',
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

export const clientStartUpdate = (client) => {
	return async (dispatch) => {
		try {

			const resp = await fetchSinToken(`client/${client.id}/`, client, 'PUT');
			const body = await resp.json();

			if (resp.ok) {
				dispatch(clientUpdated(body))
				Swal.fire(
					'Actualizado!',
					'Se ha actualizado el cliente con exito.',
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

export const clientStartDelete = (id) => {
	return async (dispatch) => {
		try {
			Swal.fire({
				title: '¿Estas seguro?',
				text: 'Se eliminara este cliente. Los servicios asociados no se eliminaran, sino se pondran en blanco. Tendra que añadirlos manualmente',
				icon: 'warning',
				confirmButtonColor: '#d33',
				confirmButtonText: 'Entendido',
				focusConfirm: false,
				focusCancel: true,
				showCancelButton: true
			}).then(async (result) => {

				if (result.isConfirmed) {
					const resp = await fetchSinToken(`client/${id}/`, '', 'DELETE');
					if (resp.ok) {
						dispatch(clientDeleted(id))
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

export const clientSetData = (clients) => ({
	type: types.clientSetData,
	payload: clients
})

export const clientClearData = () => ({
	type: types.clientClearData,
})

export const clientAddNew = (client) => ({
	type: types.clientAddNew,
	payload: client
})

export const clientUpdated = (client) => ({
	type: types.clientUpdated,
	payload: client
})

export const clientDeleted = (id) => ({
	type: types.clientDeleted,
	payload: id
})

// CLIENT ACTIVE
export const clientSetActive = (client) => ({
	type: types.clientSetActive,
	payload: client
});

export const clientClearActive = () => ({
	type: types.clientClearActive,
});
