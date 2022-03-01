import * as React from 'react';
import esLocale from 'date-fns/locale/es';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { format } from 'date-fns';
import { useRouter } from 'next/router';

export const CalendarPicker = () => {
	const router = useRouter()
	const [value, setValue] = React.useState<Date | null>(new Date());

	const handleOnAccept = (date: Date | null) => {
		if (date && value) {
			const oldFormatDate = format(value, 'MM-yyyy')
			const newFormatDate = format(date, 'MM-yyyy')

			if (oldFormatDate !== newFormatDate) {
				let paramsObj = { date: `${newFormatDate}` };
				let searchParams = new URLSearchParams(paramsObj);

				router.push({
					pathname: router.pathname,
					query: {
						...router.query,
						date: searchParams.get('date'),
					}
				})
			}
		}
	}

	return (
		<LocalizationProvider dateAdapter={AdapterDateFns} locale={esLocale}>
			<DatePicker
				mask='__/__/____'
				views={['year', 'month']}
				minDate={new Date('2020-01-01')}
				maxDate={new Date('2030-01-01')}
				label="Año y Mes"
				value={value}
				onChange={(newValue) => {
					setValue(newValue);
				}}
				onAccept={handleOnAccept}
				renderInput={(params) => <TextField
					{...params}
					helperText={null}
					sx={{
						marginTop: 1,
						marginBottom: 1,
						['& .MuiOutlinedInput-root']: {
							borderRadius: 0.5
						},
						["& .MuiInputLabel-root, fieldset"]: {
							lineHeight: "1.8rem",
						}
					}}
				/>}
			/>
		</LocalizationProvider>
	)
}
