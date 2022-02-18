// NodeJS
import { ParsedUrlQuery } from "querystring";

// React
import { ReactElement, useEffect, useState } from "react";

// NextJS
import { useRouter } from "next/router";
// NextAuth
import { getSession, signOut } from "next-auth/react";

// Mui
import { Box, Button, Paper } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

// Custom Components
import { Header } from "@/components/Header";
import { Layout } from "@/components/Layout";
import { TableProduct } from "@/components/Products/TableProduct";

// Interfaces
import { ProductResponse } from "@/interfaces/Product";

// Services
import { getProductList } from "src/services/products";

const initialState = {
	count: 0,
	countItemsOnPage: 0,
	total_pages: 0,
	current: 0,
	next: '',
	previous: null,
	results: []
}

const Index = () => {
	const [isLoading, setIsLoading] = useState(true)
	const [products, setProducts] = useState<ProductResponse>(initialState)

	const router = useRouter()
	const query = router.query

	// TODO: Create a Custom Hook which handles the state
	const getData = async (queryParams: string) => {
		setIsLoading(true)
		try {
			const session = await getSession()
			if (session && session.error) {
				signOut()
			}
			if (session?.accessToken) {
				const res = await getProductList({ token: session.accessToken, queryParams: `?${queryParams}` })
				const data: ProductResponse = res.data
				setProducts(data)
			}

		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false)
		}
	}
	useEffect(() => {
		const queryParams = getQueryParams(query)
		getData(queryParams)
	}, [query])

	return (
		<Box>

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
					elevation={1}
					sx={{
						p: 2,
					}}
				>
					<TableProduct
						isLoading={isLoading}
						data={products}
					/>
				</Paper>
			</Box>
		</Box>
	)
};

Index.auth = true
Index.getLayout = function getLayout(page: ReactElement) {
	return (
		<Layout>
			{page}
		</Layout>
	)
};

export default Index;

const getQueryParams = (query: ParsedUrlQuery) => {
	let queryParams = '';

	if (query.page) queryParams = `page=${query.page}&`
	if (query.page_size) queryParams = `${queryParams}page_size=${query.page_size}&`
	if (query.ordering) queryParams = `${queryParams}ordering=${query.ordering}&`

	return queryParams;
}