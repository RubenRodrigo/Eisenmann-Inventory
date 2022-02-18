import { SxProps, Theme } from '@mui/material/styles'
import { Button, Typography } from '@mui/material'
import { green, red } from '@mui/material/colors'
import React from 'react'

interface Props {
	state: boolean;
	buttonSx?: SxProps<Theme>;
	textSx?: SxProps<Theme>;
}

export const StateButton = ({ state, buttonSx, textSx }: Props) => {
	return (
		<Button
			disabled
			sx={{
				color: 'white',
				"&:disabled": {
					color: 'white',
				},
				...(
					state ?
						{
							backgroundColor: green[500],
						} : {
							backgroundColor: red[500],
						}
				),
				...(
					{ ...buttonSx }
				)
			}}
		>
			<Typography
				sx={{

					...(
						{ ...textSx }
					)
				}}
			>
				{
					state ? 'Activo' : 'Inactivo'
				}
			</Typography>
		</Button >
	)
}
