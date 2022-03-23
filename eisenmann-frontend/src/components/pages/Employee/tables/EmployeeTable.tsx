import { Button, TableRow } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { headCellsEmployee } from 'src/data/headCells/headCellsEmployee';
import { SimpleTableContainer } from '@/components/SimpleTable'
import { SimpleTableToolbar } from '@/components/SimpleTable/SimpleTableToolbar'
import { useEmployee } from '@/reducer/EmployeeReducer/hooks/useEmployee'
import { EmployeeRow } from './EmployeeRow'

export const EmployeeTable = () => {
	const { employees } = useEmployee()
	return (
		<SimpleTableContainer
			headCells={headCellsEmployee}
		>
			{
				employees.map((row) => (
					<TableRow
						key={row.id}
					>
						<EmployeeRow row={row} />
					</TableRow>
				))
			}
		</SimpleTableContainer>
	)
}
