import { TextField } from '@mui/material'
import { useField } from 'formik'
import React from 'react'

interface Props {
	label: string;
	name: string;
	type?: 'text' | 'email' | 'password';
	placeholder?: string;
	[x: string]: any;
}

export const MyInput = ({ label, ...props }: Props) => {
	const [field, meta] = useField(props)
	return (
		<>
			<TextField
				variant="outlined"
				fullWidth
				margin="normal"
				label={label}
				// defaultValue="Hello World"
				size="small"
				error={meta.touched && Boolean(meta.error)}
				{...field}
				{...props}
				InputLabelProps={{
					shrink: true,
				}}
				sx={{
					['& .MuiOutlinedInput-root']: {
						borderRadius: 0.5
					}
				}}
				helperText={meta.touched && meta.error}
			/>
		</>
	)
}
