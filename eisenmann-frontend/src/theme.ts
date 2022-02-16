import { createTheme } from '@mui/material/styles';
import { grey, yellow } from '@mui/material/colors';
import { PaletteMode } from '@mui/material';
import { Shadows } from '@mui/material/styles/shadows';

// Create a theme instance.

const CustomTheme = (mode: PaletteMode) => {
	const theme = createTheme({
		palette: {
			mode,
			...(mode === 'light'
				? {
					// palette values for light mode
					primary: {
						main: yellow[800],
					},
					secondary: {
						main: grey[400],
						dark: grey[900],
						contrastText: 'rgba(0, 0, 0, 0.5)'
					},
					divider: grey[800],
				}
				: {
					// palette values for dark mode
					primary: {
						main: yellow[800]
					},
					secondary: {
						main: grey[400],
						dark: grey[900],
						contrastText: grey[400]
					},
					background: {
						default: grey[900],
						paper: grey[800],
					},
				}),

		},
		shape: {
			borderRadius: 10
		},
		shadows: [...createTheme({}).shadows.map((shadow, i) => (
			i === 1 ? 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px' : shadow
		))] as Shadows,
	});
	return theme
}
export default CustomTheme;