import { Autocomplete, AutocompleteRenderOptionState, CircularProgress, TextField } from '@mui/material';
import { ErrorMessage, useField } from 'formik';
import { HTMLAttributes, ReactNode } from 'react';

interface Props<T> {
	label: string;
	name: string;
	loading: boolean;
	options: readonly T[];
	renderOption?: ((props: HTMLAttributes<HTMLLIElement>, option: T, state: AutocompleteRenderOptionState) => ReactNode) | undefined
	getOptionLabel?: ((option: any) => string) | undefined
	isOptionEqualToValue?: ((option: any, value: any) => boolean) | undefined
	[x: string]: any;
}

export const SelectField = <T,>({ label, loading, renderOption, getOptionLabel, isOptionEqualToValue, ...props }: Props<T>) => {

	const [{ onChange, ...field }, meta, helpers] = useField(props)

	const handleChange = (newValue: any) => {
		helpers.setValue(newValue)
	}

	return (
		<Autocomplete
			loading={loading}
			onChange={(event, newValue) => handleChange(newValue)}
			getOptionLabel={getOptionLabel}
			isOptionEqualToValue={isOptionEqualToValue}
			{...props}
			{...field}
			renderOption={renderOption}
			renderInput={(params) => {
				return (
					<TextField
						{...params}
						{...props}
						error={meta.touched && Boolean(meta.error)}
						fullWidth
						helperText={meta.touched && (meta.error)}
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
	)
};