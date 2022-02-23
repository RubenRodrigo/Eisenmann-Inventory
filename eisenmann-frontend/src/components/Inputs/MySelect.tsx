import { Autocomplete, TextField, Chip } from '@mui/material'
import { useField } from 'formik'
import CircularProgress from '@mui/material/CircularProgress';

interface Props<T> {
	label: string;
	loading: boolean
	name: string;
	open: boolean
	options: readonly T[];
	placeholder?: string;
	setOpen: (open: boolean) => void
	setOptions: (options: readonly T[]) => void;
	[x: string]: any;
}

export const MySelect = <T extends { id: number }>(props: Props<T>) => {

	const { label, setOpen, setOptions, options, open, loading, ...propsRest } = props

	const [{ onChange, ...field }, meta, helpers] = useField(propsRest)

	return (
		<Autocomplete
			loading={loading}
			open={open}
			options={options}
			onClose={() => {
				setOpen(false);
			}}
			onOpen={() => {
				setOpen(true);
			}}
			getOptionLabel={(option) => {
				return option.name ?? 'Sin Nombre'
			}}
			isOptionEqualToValue={(option, value) => {
				// If id is equal to 0 means that no value was provided
				if (value.id === 0) return true
				return option.id === value.id
			}}
			onChange={(event, newValue) => {
				setOptions(newValue ? [newValue, ...options] : options);
				helpers.setValue(newValue ? newValue : {
					id: 0,
					name: '',
				})
			}}
			{...field}
			renderOption={(props, option, index) => {
				const key = `listItem-${index}-${option.id}`;
				return (
					<li {...props} key={key}>
						{option['name']}
					</li>
				);
			}}
			renderInput={(params) => {
				return (
					<TextField
						{...params}
						{...propsRest}
						error={meta.touched && Boolean(meta.error)}
						fullWidth
						helperText={meta.touched && ((meta.error as unknown as T)?.id)}
						label={label}
						margin="normal"
						size="small"
						sx={{
							['& .MuiOutlinedInput-root']: {
								borderRadius: 0.5
							}
						}}
						InputLabelProps={{
							shrink: true,
						}}
						InputProps={{
							...params.InputProps,
							endAdornment: (
								<>
									{loading ? <CircularProgress color="inherit" size={20} /> : null}
									{params.InputProps.endAdornment}
								</>
							),
						}}
					/>
				)
			}}

		/>
	);
}