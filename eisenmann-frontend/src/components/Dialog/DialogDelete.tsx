import { Box, Button } from '@mui/material'
import React, { useState } from 'react'
import { DialogCustom } from './DialogCustom'

type ModalAction = () => void

interface Props {
	openButton?: (open: ModalAction, close: ModalAction) => JSX.Element;
	title: string;
	cancelAction?: () => void
	successAction?: () => void
}

export const DialogDelete = ({ openButton, title, cancelAction, successAction }: Props) => {
	const [openDialogDelete, setOpenDialogDelete] = useState(false)

	const handleOpenDialog = () => setOpenDialogDelete(true);
	const handleCloseDialog = () => setOpenDialogDelete(false);

	const handleOnDelete = () => {
		successAction && successAction()
		handleCloseDialog()
	}

	const handleOnCancel = () => {
		cancelAction && cancelAction()
		handleCloseDialog()
	}

	return (

		<>
			{openButton && openButton(handleOpenDialog, handleCloseDialog)}
			<DialogCustom
				title={title}
				contentText='¿Esta seguro que desea eliminar este item?'
				open={openDialogDelete}
				handleClose={handleCloseDialog}
				handleOpen={handleOpenDialog}
			>
				<Box
					sx={{
						paddingTop: 4,
						display: 'flex',
						gap: '12px',
						justifyContent: 'space-between',
						width: '100%'
					}}
				>
					<Button
						variant='outlined'
						color='warning'
						sx={{
							flex: '1 1 0%'
						}}
						onClick={handleOnDelete}
					>
						Eliminar
					</Button>
					<Button
						variant='outlined'
						color='success'
						sx={{
							flex: '1 1 0%'
						}}
						onClick={handleOnCancel}
					>
						Cancelar
					</Button>
				</Box>
			</DialogCustom>
		</>
	)
}
