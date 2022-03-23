import { DialogContext } from '@/context/DialogContext';
import { Box, Dialog, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

interface Props {
	open: boolean;
	handleClose: () => void;
	handleOpen: () => void;
	children?: JSX.Element;
	title: string;
	contentText?: string;
}

const { Provider } = DialogContext;

export const DialogCustom = ({ open, handleClose, handleOpen, children, title, contentText }: Props) => {

	return (
		<Provider
			value={{
				open,
				handleClose,
				handleOpen
			}}
		>
			<Dialog
				maxWidth='md'
				onClose={handleClose}
				open={open}
			>
				<DialogTitle>{title}</DialogTitle>
				<DialogContent>
					<DialogContentText>
						{contentText}
					</DialogContentText>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							// m: 'auto',
							// width: 'fit-content',
						}}
					>
						{children}
					</Box>
				</DialogContent>
			</Dialog>
		</Provider>
	);
}
