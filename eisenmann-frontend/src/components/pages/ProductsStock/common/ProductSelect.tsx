import { useEffect, useState } from 'react';
import { getSession, signOut } from 'next-auth/react';
import { MySelect } from '../../../Inputs/MySelect';
import { Product } from '@/interfaces/Product';
import { getProductListAll } from 'src/services/products';

interface Props {
	label: string;
	name: string;
	placeholder?: string;
	[x: string]: any;
}

// TODO: Create a Custom Hook which handles the state
const getData = async (queryParams: string) => {
	try {
		const session = await getSession()
		if (session && session.error) {
			signOut()
		}
		if (session?.accessToken) {
			const res = await getProductListAll({ token: session.accessToken, queryParams })
			console.log(res);
			const data: Product[] = res.data
			return data
		}

	} catch (error) {
		console.log(error);
	}
}

export const ProductSelect = ({ label, ...props }: Props) => {

	const [open, setOpen] = useState(false);
	const [options, setOptions] = useState<readonly Product[]>([]);
	const loading = open && options.length >= 0;

	useEffect(() => {
		if (!loading) {
			return undefined;
		}

		(async () => {
			console.log(loading);
			const data = await getData('?state=true');
			console.log(data);
			if (data) {
				setOptions([...data]);
			}
		})();
	}, [loading]);

	useEffect(() => {
		if (!open) {
			setOptions([]);
		}
	}, [open]);

	return (
		<MySelect
			label={label}
			{...props}
			open={open}
			setOpen={setOpen}
			options={options}
			setOptions={setOptions}
			loading={loading}
		/>
	);
}