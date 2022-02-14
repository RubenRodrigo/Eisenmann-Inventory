import Box from '@mui/material/Box';
import { HeadCell } from '@/interfaces/TableInterface';
import { Product, ProductResponse } from '@/interfaces/Products';
import { useOrderTable } from '@/hooks/useOrderTable';
import { useSelectRowTable } from '@/hooks/useSelectRowTable';
import { ProductContext } from '@/context/ProductContext';
import { useContext } from 'react';
import { createTableContext } from '@/context/TableContext';

interface Props {
	children: () => JSX.Element;
	headCells: readonly HeadCell<Product>[];
	products: ProductResponse;
}

const { Provider } = createTableContext<Product>();

export const CustomTableContainer = ({ headCells, children }: Props) => {
	const { products: data, isLoading } = useContext(ProductContext)

	const { order, orderBy, handleRequestSort } = useOrderTable<Product>('created_at')
	const { selected, handleSelectAllClick, handleSelectOneClick, isSelected } = useSelectRowTable<Product>(data.results)

	// // Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows =
		data.current - 1 > 0 ? Math.max(0, data.current * data.countItemsOnPage - data.count) : 0;


	return (
		<Provider
			value={{
				order,
				orderBy,
				handleRequestSort,
				selected,
				handleSelectOneClick,
				handleSelectAllClick,
				isSelected,
				emptyRows,
				headCells
			}}
		>
			<Box sx={{ width: '100%' }}>
				{
					children({

					})
				}
			</Box>
		</Provider>
	);
}