import { isArrayOfStrings } from "@/helpers/utils";
import { LoginFormValues } from "@/interfaces/Login";
import { Link, Button, CircularProgress, TextField } from "@mui/material";
import { getServerSession } from "next-auth";
import { signIn, SignInResponse } from "next-auth/react";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";

type HandleInputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

export const LoginForm = () => {
	const router = useRouter()

	const [signInLoading, setSignInLoading] = useState(false);
	const [formValues, setFormValues] = useState<LoginFormValues>({
		password: 'tsukumizu',
		email: 'tsukumizu@gmail.com'
	});

	const handleChange = ({ target: { name, value } }: HandleInputChange) => {
		setFormValues({
			...formValues,
			[name]: value
		})
	}

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			setSignInLoading(true)

			const result: any = await signIn('credentials', {
				redirect: false,
				email: formValues.email,
				password: formValues.password,
				callbackUrl: ''
			})

			if (result && !result.error) {
				router.replace(result.url)
			} else {
				console.log('error');
				console.log(result);
			}
		} catch (error) {
			console.log('CATCH', error);
		} finally {
			setSignInLoading(false)
		}
	}


	return (
		<>
			<form onSubmit={handleSubmit}>
				<TextField
					variant="outlined"
					margin="normal"
					required
					fullWidth
					id="email"
					label="Correo Electronico"
					name="email"
					value={formValues.email}
					onChange={handleChange}
					autoComplete="off"
					autoFocus
				/>
				<TextField
					variant="outlined"
					margin="normal"
					required
					fullWidth
					label="Contraseña"
					name="password"
					value={formValues.password}
					onChange={handleChange}
					type="password"
					id="password"
					autoComplete="current-password"
				/>
				<Button
					type="submit"
					fullWidth
					disabled={signInLoading}
					variant="contained"
					color="primary"
					startIcon={signInLoading && <CircularProgress sx={{ mr: 1 }} color='secondary' size={20} />}
					sx={{
						fontWeight: 'bold',
						p: 1.2,
						my: 3,
						backgroundColor: signInLoading ? 'secondary.main' : 'primary.main',
					}}
				>
					Iniciar Sesión
				</Button>
				<Link
					href="#"
					variant="subtitle2"
					underline="hover"
					sx={{
						fontWeight: 'bold'
					}}
				>
					¿Olvidaste la contraseña?
				</Link>

			</form>
		</>
	);
};
