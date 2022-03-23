import { DocumentType } from '@/interfaces/Client';
import { getSession } from 'next-auth/react';
import React, { useState } from 'react'
import { getDocumentTypeList } from 'src/services/document-type';
import { SelectField } from '../Inputs/SelectField';

interface Props {
	label: string;
	name: string;
	[x: string]: any;
}
const getData = async (): Promise<DocumentType[]> => {
	try {
		const session = await getSession()
		const res = await getDocumentTypeList({ token: session?.accessToken ?? '' })
		const data = res.data
		return data
	} catch (error) {
		console.log(error);
		return []
	}
}
export const SelectDocumentType = (props: Props) => {
	const [options, setOptions] = useState<readonly DocumentType[]>([]);
	const [isLoading, setIsLoading] = useState(false)
	const [optionsLoaded, setOptionsLoaded] = useState(false)

	const handleLoadOptions = async () => {
		if (!optionsLoaded) {
			setIsLoading(true)
			try {
				const data = await getData()
				setOptions([...data])
				setOptionsLoaded(true)
			} catch (error) {
				console.log(error);
			} finally {
				setIsLoading(false)
			}
		}
	}

	return (
		<SelectField
			options={options}
			onFocus={handleLoadOptions}
			loading={isLoading}
			getOptionLabel={(option: any) => {
				return option.name ?? 'Sin Nombre'
			}}
			isOptionEqualToValue={(option: any, value: any) => {
				// If id is equal to 0 means that no value was provided
				if (value.id === 0) return true
				return option.id === value.id
			}}
			renderOption={(props, option, index) => {
				const key = `listItem-${index}-${option.id}`;
				return (
					<li {...props} key={key}>
						{option['name']}
					</li>
				);
			}}
			{...props}
		/>
	);
}
