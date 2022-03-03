import { DialogContext } from '@/context/DialogContext'
import React, { useContext } from 'react'

export const useDialog = () => {
	const {
		open,
		handleOpen,
		handleClose,
	} = useContext(DialogContext)

	return {
		open,
		handleOpen,
		handleClose,
	}
}
