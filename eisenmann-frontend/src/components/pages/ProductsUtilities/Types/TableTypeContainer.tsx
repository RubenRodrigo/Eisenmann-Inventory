import { useEffect, useState } from 'react';
// Data
import { headCellsProductType } from 'src/data/headCells/headCellsTypeUnit';
// MUI
import { Box, Button, TableRow } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

// Interfaces
import { SimpleTableContainer, SimpleTableRowLoading } from '@/components/SimpleTable/';
import { SimpleTableToolbar } from '@/components/SimpleTable/SimpleTableToolbar';
import { DialogCustom } from '@/components/Dialog/DialogCustom';
import { TableTypeRow } from './TableTypeRow';
import { FormCreateType } from './FormCreateType';
import { useProductTypeTable } from '@/reducer/ProductTypeTableReducer/hooks/useProductTypeTable';

export const TableTypeContainer = () => {

	const { startLoadingProductType, isLoading, productType: data } = useProductTypeTable()
	const [openDialog, setOpenDialog] = useState(false);

	const handleOpenDialog = () => setOpenDialog(true);
	const handleCloseDialog = () => setOpenDialog(false);

	useEffect(() => {
		startLoadingProductType()
	}, [])


	return (
		<Box sx={{ p: '2px 0px' }}>
			<DialogCustom
				title='Crear Tipo de Producto'
				open={openDialog}
				handleClose={handleCloseDialog}
				handleOpen={handleOpenDialog}
			>
				{
					data &&
					<FormCreateType
					/>
				}
			</DialogCustom>
			<SimpleTableContainer
				headCells={headCellsProductType}
				toolbarComponent={
					<SimpleTableToolbar name='Tipo de Productos'>
						<Button
							variant="contained"
							onClick={handleOpenDialog}
							startIcon={<AddIcon />}
							sx={{
								flex: 'none',
								fontWeight: 'bold',
								textTransform: 'none',
								boxShadow: 0,
							}}
						>Nuevo Tipo</Button>
					</SimpleTableToolbar>
				}
			>
				{
					isLoading
						?
						<SimpleTableRowLoading colSpan={3} size={80} />
						:

						data && data.map((row) => (
							<TableRow
								key={row.id}
							>
								<TableTypeRow row={row} />
							</TableRow>
						))
				}
			</SimpleTableContainer>
		</Box>
	)

}
