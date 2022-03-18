import { Employee } from '@/interfaces/Employee';
import { ProductStock } from '@/interfaces/ProductStock';
import { getSession } from 'next-auth/react';
import React, { useState } from 'react'
import { getClientList } from 'src/services/client';
import { getProductStockListAll } from 'src/services/product-stock';
import { SelectField } from '../Inputs/SelectField';

interface Props {
	label: string;
	name: string;
	[x: string]: any;
}

const getData = async (): Promise<ProductStock[]> => {
	try {
		const session = await getSession()
		const now = new Date()

		const URL_QUERY = new URLSearchParams({
			year: now.getFullYear().toString(),
			month: (now.getMonth() + 1).toString(),
			state: 'true',
			entries: 'false'
		})

		const res = await getProductStockListAll({ token: session?.accessToken ?? '', queryParams: URL_QUERY.toString() })
		const data = res.data
		return data
	} catch (error) {
		console.log(error);
		return []
	}
}
export const SelectProductStock = (props: Props) => {
	const [options, setOptions] = useState<readonly ProductStock[]>([]);
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
				return option.product_detail.name ?? 'Sin Nombre'
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
						{option.product_detail.name} - {option.total_stock}
					</li>
				);
			}}
			{...props}
		/>
	);
}
