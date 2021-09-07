import Swal from "sweetalert2";
import { fetchSinToken } from "../helpers/fetch";
import { types } from "../types/types";

/* Async functions */

// Service
export const serviceStartLoadingData = () => {
	return async (dispatch) => {

		try {

			const resp = await fetchSinToken('service');
			const body = await resp.json();

			dispatch(serviceSetData(body))

		} catch (error) {
			Swal.fire('Error', 'Algo salio mal, vuelva a intentar.', 'error')
			console.log(error);
		}

	}
}

export const serviceStartLoad = (id) => {
	return async (dispatch) => {

		try {

			const resp = await fetchSinToken(`service/${id}/`);
			const body = await resp.json();

			dispatch(serviceSetActive(body))

		} catch (error) {
			Swal.fire('Error', 'Algo salio mal, vuelva a intentar.', 'error')
			console.log(error);
		}

	}
}

export const serviceStartCreate = (service, router) => {
	return async (dispatch) => {
		try {

			const resp = await fetchSinToken('service/', service, 'POST');
			const body = await resp.json();

			if (resp.ok) {
				dispatch(serviceAddNew(body))
				Swal.fire(
					'Creado!',
					'Se ha creado el servicio con exito.',
					'success'
				)
				router.push('/services')
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

export const serviceStartUpdate = (service, router) => {
	return async (dispatch) => {

		try {
			const resp = await fetchSinToken(`service/${service.id}/`, service, 'PUT');
			const body = await resp.json();

			if (resp.ok) {
				dispatch(serviceUpdated(body))
				Swal.fire(
					'Actualizado!',
					'Se ha actualizado el servicio con exito.',
					'success'
				)
				router.push('/services')
			} else {
				console.log(body);
				Swal.fire('Error', 'Algo salio mal, vuelva a intentar.', 'error')
			}

		} catch (error) {
			Swal.fire('Error', 'Algo salio mal, vuelva a intentar.', 'error')
			console.log(error)
		}

	}
}

export const serviceStartUpdateState = (service) => {
	return async (dispatch) => {

		try {
			const resp = await fetchSinToken(`service/${service.id}/`, service, 'PUT');
			const body = await resp.json();
			if (resp.ok) {
				dispatch(serviceSetActive(body))
				Swal.fire(
					'Actualizado!',
					'Se ha actualizado el servicio con exito.',
					'success'
				)
			} else {
				console.log(body);
				Swal.fire('Error', 'Algo salio mal, vuelva a intentar.', 'error')
			}

		} catch (error) {
			Swal.fire('Error', 'Algo salio mal, vuelva a intentar.', 'error')
			console.log(error)
		}

	}
}

export const serviceStartDelete = (id, router) => {
	return async (dispatch, getState) => {
		const { service } = getState().serviceActive
		try {

			Swal.fire({
				title: '¿Estas seguro?',
				text: 'Se eliminara este servicio',
				icon: 'warning',
				confirmButtonColor: '#d33',
				confirmButtonText: 'Entendido',
				focusConfirm: false,
				focusCancel: true,
				showCancelButton: true
			}).then(async (result) => {

				if (result.isConfirmed) {
					const resp = await fetchSinToken(`service/${id}/`, '', 'DELETE');
					if (resp.ok) {
						dispatch(serviceDeleted(service))
						dispatch(serviceClearActive())
						Swal.fire(
							'Eliminado!',
							'Se ha eliminado con exito.',
							'success'
						)
						router.push('/services')
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



/* Action functions */
export const serviceSetData = (services) => ({
	type: types.serviceSetData,
	payload: services
})

export const serviceClearData = () => ({
	type: types.serviceClearData,
});

export const serviceAddNew = (service) => ({
	type: types.serviceAddNew,
	payload: service
})

export const serviceUpdated = (service) => ({
	type: types.serviceUpdated,
	payload: service
})

export const serviceDeleted = (service) => ({
	type: types.serviceDeleted,
	payload: service
});

export const serviceSetActive = (service) => ({
	type: types.serviceSetActive,
	payload: { ...service }
});

export const serviceClearActive = () => ({
	type: types.serviceClearActive,
});
