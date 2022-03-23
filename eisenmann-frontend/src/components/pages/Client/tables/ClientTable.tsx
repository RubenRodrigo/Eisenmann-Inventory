import { TableRow } from '@mui/material';

import { headCellsClient } from 'src/data/headCells/headCellsClient';
import { SimpleTableContainer } from '@/components/SimpleTable'
import { useClient } from '@/reducer/ClientReducer/hooks/useClient'
import { ClientRow } from './ClientRow'

export const ClientTable = () => {
	const { clients } = useClient()
	return (
		<SimpleTableContainer
			headCells={headCellsClient}
		>
			{
				clients.map((row) => (
					<TableRow
						key={row.id}
					>
						<ClientRow row={row} />
					</TableRow>
				))
			}
		</SimpleTableContainer>
	)
}
