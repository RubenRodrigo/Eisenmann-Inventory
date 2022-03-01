import { AlertColor as MuiAlertColor } from '@mui/material/Alert'
import { Alert, Snackbar } from '@mui/material'

import { useLayout } from '@/hooks/useLayout'

interface AlertColor {
	severity: MuiAlertColor
}

export const CustomToast = () => {

	const {
		toastInfo,
		openToast,
		handleCloseToast
	} = useLayout()

	return (
		<Snackbar
			open={openToast}
			autoHideDuration={6000}
			onClose={handleCloseToast}
		>
			<Alert
				onClose={handleCloseToast}
				sx={{ width: '100%' }}
				{...getSeverity(toastInfo.code)}
			>
				{toastInfo.message}
			</Alert>
		</Snackbar >
	)
}


const getSeverity = (code: number): AlertColor => {
	let color: MuiAlertColor = 'success'

	if (code >= 200 && code < 300)
		color = 'success'
	else if (code >= 300)
		color = 'error'
	return {
		severity: color
	}
}