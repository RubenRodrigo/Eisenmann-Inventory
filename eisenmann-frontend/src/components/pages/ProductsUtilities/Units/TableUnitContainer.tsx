import { useEffect, useState } from 'react';
// Data
import { headCellsProductUnit } from 'src/data/headCells/headCellsTypeUnit';
// MUI
import { Box, Button, TableRow } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

// Interfaces
import { SimpleTableContainer, SimpleTableRowLoading } from '@/components/SimpleTable/';
import { SimpleTableToolbar } from '@/components/SimpleTable/SimpleTableToolbar';
import { DialogCustom } from '@/components/Dialog/DialogCustom';
import { TableUnitRow } from './TableUnitRow';
import { FormCreateUnit } from './FormCreateUnit';
import { useProductUnitTable } from '@/reducer/ProductUnitTableReducer/hooks/useProductUnitTable';

export const TableUnitContainer = () => {

	const { startLoadingProductUnit, isLoading, productUnit: data } = useProductUnitTable()
	const [openDialog, setOpenDialog] = useState(false);

	const handleOpenDialog = () => setOpenDialog(true);
	const handleCloseDialog = () => setOpenDialog(false);

	useEffect(() => {
		startLoadingProductUnit()
	}, [])


	return (
		<Box sx={{ p: '2px 0px' }}>
			<DialogCustom
				title='Crear Unidad de Producto'
				open={openDialog}
				handleClose={handleCloseDialog}
				handleOpen={handleOpenDialog}
			>
				{
					data &&
					<FormCreateUnit
					/>
				}
			</DialogCustom>
			<SimpleTableContainer
				headCells={headCellsProductUnit}
				toolbarComponent={
					<SimpleTableToolbar name='Unidades de Productos'>
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
						>Nueva Unidad</Button>
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
								<TableUnitRow row={row} />
							</TableRow>
						))
				}
			</SimpleTableContainer>
		</Box>
	)

}
