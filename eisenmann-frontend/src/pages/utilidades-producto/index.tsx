import { ReactElement, useState } from 'react';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import { Layout } from '@/components/Layout';
import { TableType } from '@/components/pages/ProductsUtilities/Types/TableType';
import { TableUnit } from '@/components/pages/ProductsUtilities/Units/TableUnit';
import { Header } from '@/components/Header';

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

const Index = () => {
	const [value, setValue] = useState(0);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	return (
		<Box sx={{ width: '100%' }}>
			<Header title="Utilidades" />

			<Box>
				<Paper
					elevation={1}
					sx={{
						p: 2,
					}}
				>
					<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
						<Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
							<Tab label="Tipos de Producto" />
							<Tab label="Unidades" />
						</Tabs>
					</Box>
					<TabPanel value={value} index={0}>
						<TableType />
					</TabPanel>
					<TabPanel value={value} index={1}>
						<TableUnit />
					</TabPanel>
				</Paper>
			</Box>

		</Box>
	);
};

Index.auth = true
Index.getLayout = function getLayout(page: ReactElement) {
	return (
		<Layout>
			{page}
		</Layout>
	)
};
export default Index


function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					{children}
				</Box>
			)}
		</div>
	);
}