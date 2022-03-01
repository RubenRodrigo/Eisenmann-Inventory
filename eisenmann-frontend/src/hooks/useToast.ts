import { ToastInfo } from "@/interfaces/LayoutContextProps";
import { useState } from "react"



export const useToast = () => {
	const [openToast, setOpenToast] = useState(false);
	const [toastInfo, setToastInfo] = useState<ToastInfo>({
		message: 'ERROR DESCONOCIDO',
		code: 500
	})

	const handleOpenToast = () => setOpenToast(true);
	const handleCloseToast = () => setOpenToast(false);

	const handleToastInfo = (info: ToastInfo) => {
		setToastInfo({ ...info })
	};


	return {
		openToast,
		toastInfo,
		handleCloseToast,
		handleOpenToast,
		handleToastInfo
	}

}
