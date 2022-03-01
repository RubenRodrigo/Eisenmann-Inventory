export interface LayoutContextProps {
	toastInfo: ToastInfo,
	openToast: boolean,
	handleCloseToast: () => void,
	handleOpenToast: () => void,
	handleToastInfo: (info: ToastInfo) => void
}

export interface ToastInfo {
	message: string,
	code: number
}