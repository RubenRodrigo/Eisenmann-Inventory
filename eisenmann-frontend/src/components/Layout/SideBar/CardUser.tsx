import { Avatar, Card, CardHeader } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useSession } from 'next-auth/react';
import React from 'react';

function stringToColor(string: string) {
	let hash = 0;
	let i;

	/* eslint-disable no-bitwise */
	for (i = 0; i < string.length; i += 1) {
		hash = string.charCodeAt(i) + ((hash << 5) - hash);
	}

	let color = '#';

	for (i = 0; i < 3; i += 1) {
		const value = (hash >> (i * 8)) & 0xff;
		color += `00${value.toString(16)}`.substr(-2);
	}
	/* eslint-enable no-bitwise */

	return color;
}

function stringAvatar(name: string) {
	const nameSplit = name.split(' ')
	return {
		sx: {
			bgcolor: stringToColor(name),
		},
		children: `${nameSplit[0][0]}${nameSplit.length > 1 && nameSplit[1][0]}`,
	};
}

export const CardUser = () => {
	const { data: session, status } = useSession()
	return (
		<Card
			elevation={0}
			sx={(theme) => ({
				display: 'flex',
				backgroundColor: alpha(theme.palette.secondary.main, 0.08),
			})}
		>
			{
				session &&
				<CardHeader
					avatar={
						<Avatar {...stringAvatar('Kent Dodds')}>
							K
						</Avatar>
					}
					title="Kent Dodds"
					subheader="September 14, 2016"
					titleTypographyProps={{
						fontWeight: 'bold',
						color: 'secondary.light',
						whiteSpace: 'pre-line'
					}}
					subheaderTypographyProps={{
						color: 'secondary.main',
						whiteSpace: 'pre-line'
					}}

				/>
			}
		</Card>
	);
};
