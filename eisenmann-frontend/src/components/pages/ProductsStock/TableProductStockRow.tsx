import { IconButton, TableCell, Typography } from '@mui/material'
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';

import { NextLinkComposed } from '../../Link'
import { ProductStock } from '@/interfaces/ProductStock';
import { StateButton } from '@/components/StateButton';
import { dateToString } from '@/helpers/utils';
import { DialogCustom } from '@/components/Dialog/DialogCustom';
import { FormSetRealStock } from './forms/realStock/FormSetRealStock';
import { useState } from 'react';
import { getSession, signOut } from 'next-auth/react';
import { createProductStockByReal, editProductRealStock } from 'src/services/product-stock';
import { useLayout } from '@/hooks/useLayout';
import axios from 'axios';

interface Props {
	row: ProductStock;
	labelId: string;
	children?: JSX.Element;
	handleUpdateProduct: (value: ProductStock) => void
}

export const TableProductStockRow = ({ handleUpdateProduct, row, labelId }: Props) => {

	const [openDialogSetReal, setOpenDialogSetReal] = useState(false)
	const { handleOpenToast, handleToastInfo } = useLayout()

	const handleOpenDialogReal = () => setOpenDialogSetReal(true);
	const handleCloseDialogReal = () => setOpenDialogSetReal(false);

	const handleSetRealStock = async (realStock: number, state: boolean) => {
		try {
			const session = await getSession()
			if (session && session.error) {
				signOut()
			}
			if (session?.accessToken) {
				const res = await editProductRealStock({ token: session.accessToken, id: row.id, realStock })
				if (res.status === 200) {
					const data = res.data
					handleUpdateProduct(data)
					handleToastInfo({
						code: res.status,
						message: 'Se actualizo el Stock Real correctamente '
					})
					if (state) {
						const resRealStock = await createProductStockByReal({ token: session.accessToken, id: data.id })
						console.log(resRealStock.data)
					}
				}
			}

		} catch (err) {
			if (axios.isAxiosError(err)) {
				if (err.response && err.response.status >= 500) {
					handleToastInfo({
						code: err.response ? err.response.status : 500,
						message: 'Hubo un error en el servidor'
					})
				} else {
					handleToastInfo({
						code: err.response ? err.response.status : 400,
						message: err.response ? (
							err.response.data.product_stock.product_stock + 'No se creo el un nuevo Product Stock'
							??
							'Algo salio mal'
						) : 'Hubo un error en el servidor'
					})
				}
			}
		} finally {
			handleOpenToast()
			handleCloseDialogReal()
		}
	}
	return (
		<>
			<DialogCustom
				title='Ingresar Valor Real'
				open={openDialogSetReal}
				handleClose={handleCloseDialogReal}
				handleOpen={handleOpenDialogReal}
			>
				<FormSetRealStock
					realStock={row.real_stock}
					setRealStock={handleSetRealStock}
				/>
			</DialogCustom>
			<TableCell
				component="th"
				id={labelId}
				scope="row"
				sx={{
					fontWeight: 'bold'
				}}
			>
				{row.product_detail.name}
			</TableCell>
			<TableCell>{dateToString(row.created_at)}</TableCell>
			<TableCell align='center'>
				<StateButton
					state={row.state}
					buttonSx={{
						px: 1,
						py: 0.5
					}}
					textSx={{
						fontSize: 12,
					}}
				/>
			</TableCell>
			<TableCell align="right">{row.total_stock ?? 0}</TableCell>
			<TableCell align="right">{row.current_price ?? 0}</TableCell>
			<TableCell
				onClick={handleOpenDialogReal}
				align="right"
				sx={{
					cursor: 'pointer',
				}}
			>
				<Typography
					component={'span'}
					sx={(theme) => ({
						['&:hover']: {
							background: theme.palette.secondary.light,
						},
						padding: '10px 15px',
						borderRadius: '100%'
					})}
				>
					{row.real_stock ?? 0}
				</Typography>
			</TableCell>
			<TableCell align="right">{row.difference_stock ?? 0}</TableCell>
			<TableCell align="center">
				<IconButton
					component={NextLinkComposed}
					size="small"
					to={`/productos-stock/${row.id}`}
				>
					<ArrowForwardOutlinedIcon />
				</IconButton>
			</TableCell>
		</>
	)
}


const handleErrorResponse = (err: undefined) => {
	if (axios.isAxiosError(err)) {

	}
}