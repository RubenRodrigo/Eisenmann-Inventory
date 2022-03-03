import { TableUnitProvider } from '@/components/providers/ProductUnitTableProvider';
import { TableUnitContainer } from './TableUnitContainer';

export const TableUnit = () => {
	return (
		<TableUnitProvider>
			<TableUnitContainer />
		</TableUnitProvider>
	)
}
