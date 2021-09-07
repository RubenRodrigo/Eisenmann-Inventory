import Swal from "sweetalert2";
import { fetchSinToken } from "../helpers/fetch";
import { types } from "../types/types";

export const unitStartLoadingData = () => {
	return async (dispatch) => {

		try {
			const resp = await fetchSinToken(`product/unit/`);
			const body = await resp.json();

			dispatch(unitSetData(body))

		} catch (error) {
			Swal.fire('Error', 'Algo salio mal, vuelva a intentar.', 'error')
			console.log(error);
		}

	}
}

export const unitStartCreate = (unit) => {
	return async (dispatch) => {
		try {

			const resp = await fetchSinToken('product/unit/', unit, 'POST');
			const body = await resp.json();
			if (resp.ok) {
				dispatch(unitAddNew(body))
				Swal.fire(
					'Creado!',
					'Se ha creado la unidad con exito.',
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

export const unitStartUpdate = (unit) => {
	return async (dispatch) => {
		try {

			const resp = await fetchSinToken(`product/unit/${unit.id}/`, unit, 'PUT');
			const body = await resp.json();

			if (resp.ok) {
				dispatch(unitUpdated(body))
				Swal.fire(
					'Actualizado!',
					'Se ha actualizado la unidad con exito.',
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

export const unitStartDelete = (id) => {
	return async (dispatch) => {
		try {
			Swal.fire({
				title: '¿Estas seguro?',
				text: 'Se eliminara esta unidad. Los productos asociados no se eliminaran, sino se pondran en blanco. Tendra que añadirlos manualmente',
				icon: 'warning',
				confirmButtonColor: '#d33',
				confirmButtonText: 'Entendido',
				focusConfirm: false,
				focusCancel: true,
				showCancelButton: true
			}).then(async (result) => {

				if (result.isConfirmed) {
					const resp = await fetchSinToken(`product/unit/${id}/`, '', 'DELETE');
					if (resp.ok) {
						dispatch(unitDeleted(id))
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

export const unitSetData = (data) => ({
	type: types.unitSetData,
	payload: data
})

export const unitClearData = () => ({
	type: types.unitClearData,
})

export const unitAddNew = (unit) => ({
	type: types.unitAddNew,
	payload: unit
})

export const unitUpdated = (unit) => ({
	type: types.unitUpdated,
	payload: unit
})

export const unitDeleted = (id) => ({
	type: types.unitDeleted,
	payload: id
})

// unit ACTIVE
export const unitSetActive = (unit) => ({
	type: types.unitSetActive,
	payload: unit
});

export const unitClearActive = () => ({
	type: types.unitClearActive,
});