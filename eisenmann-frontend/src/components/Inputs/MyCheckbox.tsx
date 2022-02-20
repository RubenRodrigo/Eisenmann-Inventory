import { Checkbox, FormControlLabel, TextField } from '@mui/material'
import { useField } from 'formik'
import React from 'react'

interface Props {
	label: string;
	name: string;
	[x: string]: any;
}

export const MyCheckbox = ({ label, ...props }: Props) => {
	const [{ value, ...field }] = useField(props)
	return (
		<>
			<FormControlLabel
				control={
					<Checkbox
						checked={value}
						{...field}
						{...props}
					/>
				}
				label={label}
			/>
		</>
	)
}
