import { ProductContext } from '@/context/ProductContext';
import { TablePagination } from '@mui/material'
import { useRouter } from 'next/router';
import React, { ChangeEvent, useContext } from 'react'

export const CustomTablePagination = () => {

	const router = useRouter()
	const { products: data, isLoading } = useContext(ProductContext)

	const handleChangePage = (event: unknown, newPage: number) => {
		router.push({
			pathname: router.pathname,
			query: {
				...router.query,
				page: newPage + 1,
			}
		})
	};

	const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
		router.push({
			pathname: router.pathname,
			query: {
				...router.query,
				page_size: event.target.value,
			}
		})
	};

	return (
		<div>
			{
				!isLoading &&
				<TablePagination
					rowsPerPageOptions={[5, 10, 15]}
					component="div"
					count={data.count}
					rowsPerPage={data.countItemsOnPage}
					page={data.current - 1}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			}
		</div>
	)
}
