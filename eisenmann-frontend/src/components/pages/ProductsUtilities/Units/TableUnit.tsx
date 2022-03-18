import { TableUnitProvider } from 'src/providers/ProductUnitTableProvider';
import { TableUnitContainer } from './TableUnitContainer';

export const TableUnit = () => {
	return (
		<TableUnitProvider>
			<TableUnitContainer />
		</TableUnitProvider>
	)
}
