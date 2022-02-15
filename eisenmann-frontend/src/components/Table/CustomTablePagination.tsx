import React, { ChangeEvent } from 'react'
import { useRouter } from 'next/router';
import { TablePagination } from '@mui/material'

interface Props {
	count: number;
	isLoading: boolean;
	page: number;
	rowsPerPage: number;
	rowsPerPageOptions: number[]
}

export const CustomTablePagination = (props: Props) => {

	const { isLoading, rowsPerPage, page, count, rowsPerPageOptions } = props

	const router = useRouter()

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
					rowsPerPageOptions={rowsPerPageOptions}
					component="div"
					count={count}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			}
		</div>
	)
}
