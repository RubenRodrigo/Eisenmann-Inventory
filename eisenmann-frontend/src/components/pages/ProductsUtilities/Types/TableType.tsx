import { TableTypeProvider } from '@/components/providers/ProductTypeTableProvider';
import { TableTypeContainer } from './TableTypeContainer';

export const TableType = () => {
	return (
		<TableTypeProvider>
			<TableTypeContainer />
		</TableTypeProvider>
	)
}
