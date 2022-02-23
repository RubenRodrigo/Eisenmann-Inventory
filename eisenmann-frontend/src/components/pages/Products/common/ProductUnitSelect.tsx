import { useEffect, useState } from 'react';
import { getSession, signOut } from 'next-auth/react';
import { getUnitList } from 'src/services/units';
import { MySelect } from '../../../Inputs/MySelect';
import { ProductUnit } from '@/interfaces/ProductUnit';

interface Props {
	label: string;
	name: string;
	placeholder?: string;
	[x: string]: any;
}

// TODO: Create a Custom Hook which handles the state
const getData = async () => {
	try {
		const session = await getSession()
		if (session && session.error) {
			signOut()
		}
		if (session?.accessToken) {
			const res = await getUnitList({ token: session.accessToken })
			const data: ProductUnit[] = res.data
			return data
		}

	} catch (error) {
		console.log(error);
	}
}

export const ProductUnitSelect = ({ label, ...props }: Props) => {

	const [open, setOpen] = useState(false);
	const [options, setOptions] = useState<readonly ProductUnit[]>([]);
	const loading = open && options.length === 0;

	useEffect(() => {
		if (!loading) {
			return undefined;
		}

		(async () => {
			const data = await getData();

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