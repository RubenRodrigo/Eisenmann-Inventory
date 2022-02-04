import React, { ChangeEvent, FormEvent, useState } from 'react';
import type { NextPage } from 'next'
import { Avatar, Box, Button, Checkbox, Container, CssBaseline, FormControlLabel, Grid, Link, TextField, Typography } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { signIn } from 'next-auth/react';

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Copyright © '}
			<Link color="inherit" href="https://mui.com/">
				Your Website
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}


interface Props {
	children?: React.ReactNode;
}

interface FormValues {
	password: string;
	email: string;
}

type HandleInputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

const AppContent = (props: Props) => {

	const [formValues, setFormValues] = useState<FormValues>({
		password: '',
		email: ''
	});

	const handleChange = ({ target: { name, value } }: HandleInputChange) => {
		setFormValues({
			...formValues,
			[name]: value
		})
	}

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const result: any = await signIn('credentials', {
			redirect: false,
			email: formValues.email,
			password: formValues.password,
		})

		if (result && !result.error) {
			console.log(result);
		} else {
			console.log(result);
		}
	}

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div >
				<Avatar >
					<LockOutlined />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				<form onSubmit={handleSubmit}>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						value={formValues.email}
						onChange={handleChange}
						autoComplete="email"
						autoFocus
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						label="Password"
						name="password"
						value={formValues.password}
						onChange={handleChange}
						type="password"
						id="password"
						autoComplete="current-password"
					/>
					<FormControlLabel
						control={<Checkbox value="remember" color="primary" />}
						label="Remember me"
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
					>
						Sign In
					</Button>
					<Grid container>
						<Grid item xs>
							<Link href="#" variant="body2">
								Forgot password?
							</Link>
						</Grid>
						<Grid item>
							<Link href="#" variant="body2">
								{"Don't have an account? Sign Up"}
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
			<Box mt={8}>
				<Copyright />
			</Box>
		</Container>
	);
}

const Index: NextPage = (props) => {
	return (
		<AppContent {...props} />
	);
}
export default Index