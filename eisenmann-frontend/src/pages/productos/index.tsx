import { ReactElement, useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Layout } from "@/components/Layout";
import { Box, Button, Paper, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { Product, ProductResponse } from "@/interfaces/Products";
import { TableProduct } from "@/components/Products/TableProduct";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { getProductList } from "src/services/products";
import { HeadCell } from "@/interfaces/TableInterface";
import { ProductContext } from "@/context/ProductContext";

const initialState = {
	count: 0,
	countItemsOnPage: 0,
	total_pages: 0,
	current: 0,
	next: '',
	previous: null,
	results: []
}

const { Provider } = ProductContext;

const Index = () => {
	const [isLoading, setIsLoading] = useState(true)
	const [products, setProducts] = useState<ProductResponse>(initialState)
	const { data: session, status } = useSession()

	const router = useRouter()
	const query = router.query

	useEffect(() => {
		if (status === 'authenticated') {
			if (session) {
				if (session.error) {
					console.log('Error');
				} else {

					let queryParams = '';

					if (query.page) queryParams = `page=${query.page}&`
					if (query.page_size) queryParams = `${queryParams}page_size=${query.page_size}&`
					if (query.ordering) queryParams = `${queryParams}ordering=${query.ordering}&`

					setIsLoading(true)
					getProductList({ token: session.accessToken, queryParams: `?${queryParams}` })
						.then((res) => {
							const data: ProductResponse = res.data
							setProducts(data)
						})
						.catch(err => {
							console.log(err);
						})
						.finally(() => setIsLoading(false))
				}
			}
			if (session === null) {
				router.push('/');
			}
		}
	}, [status, session, query])

	const headCells: readonly HeadCell<Product>[] = [
		{
			id: 'name',
			numeric: false,
			disablePadding: true,
			label: 'Producto',
			isAllowed: false,
		},
		{
			id: 'created_at',
			numeric: true,
			disablePadding: false,
			label: 'Fecha de Creación',
			isAllowed: true,
		},
		{
			id: 'total_price',
			numeric: true,
			disablePadding: false,
			label: 'Precio Total',
			isAllowed: true,
		},
	];

	return (
		<Box>
			<Provider value={{
				products,
				setProducts,
				isLoading
			}}>
				<Header title="Productos">
					<Button
						variant="contained"
						startIcon={<AddIcon />}
						sx={{
							fontWeight: 'bold',
							textTransform: 'none',
							boxShadow: 0,
						}}
					>Nuevo Producto</Button>
				</Header>
				<Box>
					<Paper
						elevation={0}
						sx={{ p: 2 }}
					>

						<TableProduct
							headCells={headCells}
						/>
					</Paper>
				</Box>
			</Provider>
		</Box>
	)
};

Index.getLayout = function getLayout(page: ReactElement) {
	return (
		<Layout>
			{page}
		</Layout>
	)
};

export default Index;
