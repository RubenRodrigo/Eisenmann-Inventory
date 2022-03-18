import React from 'react'
import { Box, TableRow } from '@mui/material'

import { SimpleTableContainer } from '@/components/SimpleTable'
import { ServiceProduct } from '@/interfaces/ServiceProduct'
import { headCellsServiceProduct } from 'src/data/headCells/headCellsService'
import { ServiceProductRow } from './ServiceProductRow'

interface Props {
	data: ServiceProduct[]
}

export const ServiceProductTable = ({ data }: Props) => {
	return (
		<Box sx={{ p: '2px 0px' }}>
			<SimpleTableContainer
				headCells={headCellsServiceProduct}
			>
				{data && data.map((row) => (
					<TableRow
						key={row.id}
					>
						<ServiceProductRow row={row} />
					</TableRow>
				))}
			</SimpleTableContainer>
		</Box>
	)
}