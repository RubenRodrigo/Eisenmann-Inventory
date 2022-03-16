import { useField } from 'formik';

import { DatePicker, LocalizationProvider } from '@mui/lab';
import { TextField } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

import esLocale from 'date-fns/locale/es';

interface Props {
	label: string;
	name: string;
	value: Date;
	[x: string]: any;
}
export const MyDatePicker = ({ label, value, ...props }: Props) => {
	const [field, meta, helpers] = useField(props)

	const handleChange = (value: Date | null) => {
		if (value) helpers.setValue(value)
	}

	return (
		<LocalizationProvider dateAdapter={AdapterDateFns} locale={esLocale}>
			<DatePicker
				mask='__/__/____'
				minDate={new Date('2020-01-01')}
				maxDate={new Date('2030-01-01')}
				label={label}
				value={value}
				onChange={(value) => handleChange(value)}
				renderInput={(params) => <TextField
					size='small'
					fullWidth
					margin="normal"
					{...params}
				/>}
			/>
		</LocalizationProvider>
	)
}
