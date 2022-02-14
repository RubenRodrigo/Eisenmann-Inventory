import { ChangeEvent, useState } from "react";

export function usePagintaionTable(countItemsOnPage: number) {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(countItemsOnPage);

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	return {
		page,
		rowsPerPage,
		handleChangePage,
		handleChangeRowsPerPage
	}

};
