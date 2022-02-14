import type { NextPage } from 'next'
import { Box, Container, Paper, Typography, Alert } from '@mui/material';
import Image from 'next/image';
import Logo from '@/public/images/logo.png'
import WelcomeSVG from '@/public/images/welcome.svg'
import { useTheme, alpha } from '@mui/material/styles';
import { LoginForm } from '@/components/Login/LoginForm';

const SideSpace = 440

const Index: NextPage = () => {

	const theme = useTheme();

	return (
		<Box
			component="main"
			sx={{ display: 'flex' }}
		>
			<Box
				sx={{
					flex: '0 1 auto',
					width: SideSpace,
					backgroundColor: '#1c1c1c',
					position: 'fixed',
					top: 0,
					bottom: 0,
					left: 0,
				}}
			>
				<Box
					sx={{
						overflow: 'hidden',
						position: 'relative',
						width: '100%',
						height: '100%'
					}}
				>
					<Box
						sx={{
							overflow: 'auto',
							position: 'absolute',
							width: '100%',
							height: '100%',
							display: 'flex',
							alignItems: 'center',
						}}
					>
						<Box>
							{/* <Box sx={{ mb: 8 }}>
								<Image
									src={Logo}
									alt="GreenPure"
									layout="responsive"
								/>
							</Box> */}
							<Box sx={{ px: 8 }}>
								<Typography component="h1" variant="h4" color='secondary.light' sx={{ fontWeight: 'bold' }}>
									Hola, bienvenido de vuelta!
								</Typography>
							</Box>
							<Image
								src={WelcomeSVG}
								alt="Welcome"
								layout="responsive"
							/>
						</Box>
					</Box>
				</Box>
			</Box>
			<Box
				sx={{
					flex: '0 1 auto',
					paddingLeft: `${SideSpace}px`,
					width: '100%',
					minHeight: '100vh',
				}}
			>
				<Box
					sx={{
						height: '100%',
						display: 'flex',
						background: `linear-gradient(to right bottom, ${theme.palette.secondary.dark} 50%, ${theme.palette.primary.main} 50%)`
					}}
				>
					<Container
						maxWidth="sm"
						sx={{
							display: 'flex',
							alignItems: 'center',
							height: '100%',
						}}
					>
						<Paper
							sx={(theme) => ({
								my: 4,
								p: 5,
							})}
							elevation={2}
						>
							<Box sx={{ mb: 4 }}>
								<Typography component="h1" variant="h4" align="center">
									Iniciar Sesión
								</Typography>
								<Typography variant="subtitle1" color="text.secondary" align="center">
									Llena los campos para iniciar sesión.
								</Typography>
							</Box>
							<LoginForm />
							<Box sx={{ my: 2, }}>
								<Alert severity="warning">Usa demo@example.com y contraseña Eisenmann_1</Alert>
							</Box>
						</Paper>
					</Container>
				</Box>
			</Box>
		</Box >
	);
}

export default Index