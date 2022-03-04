import { ReactElement, useEffect, useState } from "react";

// Custom Components
import { Header } from "@/components/Header";
import { Layout } from "@/components/Layout";
import { Box, Button, Paper } from "@mui/material";
import { NextLinkComposed } from "@/components/Link";
import AddIcon from '@mui/icons-material/Add';
import { ProductStock, ProductStockResponse } from "@/interfaces/ProductStock";
import { useRouter } from "next/router";
import { getQueryParams } from "@/helpers/utils";
import { getSession, signOut } from "next-auth/react";
import { getProductStockList } from "src/services/product-stock";
import { TableProductStock } from "@/components/pages/ProductsStock/TableProductStock";

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
	const [products, setProducts] = useState<ProductStockResponse>(initialState)

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
				const res = await getProductStockList({ token: session.accessToken, queryParams: `?${queryParams}` })
				const data: ProductStockResponse = res.data
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

	const handleUpdateProduct = (product: ProductStock) => {
		setProducts((prev) => ({
			...prev,
			results: prev.results.map((e) => e.id === product.id ? product : e)
		}))
	}

	return (
		<Box>
			<Header title="Productos Stock">
				<Button
					component={NextLinkComposed}
					variant="contained"
					startIcon={<AddIcon />}
					to='/productos-stock/crear'
					sx={{
						fontWeight: 'bold',
						textTransform: 'none',
						boxShadow: 0,
					}}
				>Nuevo Producto Stock</Button>
			</Header>
			<Box>
				<Paper
					elevation={1}
					sx={{
						p: 2,
					}}
				>
					<TableProductStock
						isLoading={isLoading}
						data={products}
						handleUpdateProduct={handleUpdateProduct}
					/>
				</Paper>
			</Box>
		</Box>
	)
}

Index.auth = true
Index.getLayout = function getLayout(page: ReactElement) {
	return (
		<Layout>
			{page}
		</Layout>
	)
};

export default Index;
