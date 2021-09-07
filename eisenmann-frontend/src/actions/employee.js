import Swal from "sweetalert2";
import { fetchSinToken } from "../helpers/fetch";
import { types } from "../types/types";

export const employeeStartLoadingData = () => {
	return async (dispatch) => {

		try {
			const resp = await fetchSinToken(`employee/`);
			const body = await resp.json();

			dispatch(employeeSetData(body))

		} catch (error) {
			Swal.fire('Error', 'Algo salio mal, vuelva a intentar.', 'error')
			console.log(error);
		}

	}
}

export const employeeStartCreate = (employee) => {
	return async (dispatch) => {
		try {

			const resp = await fetchSinToken('employee/', employee, 'POST');
			const body = await resp.json();
			if (resp.ok) {
				dispatch(employeeAddNew(body))
				Swal.fire(
					'Creado!',
					'Se ha creado el empleado con exito.',
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

export const employeeStartUpdate = (employee) => {
	return async (dispatch) => {
		try {

			const resp = await fetchSinToken(`employee/${employee.id}/`, employee, 'PUT');
			const body = await resp.json();

			if (resp.ok) {
				dispatch(employeeUpdated(body))
				Swal.fire(
					'Actualizado!',
					'Se ha actualizado el empleado con exito.',
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

export const employeeStartDelete = (id) => {
	return async (dispatch) => {
		try {
			Swal.fire({
				title: '¿Estas seguro?',
				text: 'Se eliminara este empleado. Los servicios asociados no se eliminaran, sino se pondran en blanco. Tendra que añadirlos manualmente',
				icon: 'warning',
				confirmButtonColor: '#d33',
				confirmButtonText: 'Entendido',
				focusConfirm: false,
				focusCancel: true,
				showCancelButton: true
			}).then(async (result) => {

				if (result.isConfirmed) {
					const resp = await fetchSinToken(`employee/${id}/`, '', 'DELETE');
					if (resp.ok) {
						dispatch(employeeDeleted(id))
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

export const employeeSetData = (data) => ({
	type: types.employeeSetData,
	payload: data
})

export const employeeClearData = () => ({
	type: types.employeeClearData,
})

export const employeeAddNew = (employee) => ({
	type: types.employeeAddNew,
	payload: employee
})

export const employeeUpdated = (employee) => ({
	type: types.employeeUpdated,
	payload: employee
})

export const employeeDeleted = (id) => ({
	type: types.employeeDeleted,
	payload: id
})

// EMPLOYEE ACTIVE
export const employeeSetActive = (employee) => ({
	type: types.employeeSetActive,
	payload: employee
});

export const employeeClearActive = () => ({
	type: types.employeeClearActive,
});