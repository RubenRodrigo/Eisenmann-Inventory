import { createTheme } from '@mui/material/styles';
import { red, grey, yellow, blueGrey, orange } from '@mui/material/colors';
import { PaletteMode } from '@mui/material';

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
					background: {
						default: grey[50],
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
		}
		// components: {
		// 	MuiPaper: {
		// 		styleOverrides: {
		// 			root: {
		// 				background: grey[900],
		// 			}
		// 		}
		// 	}
		// }
	});
	return theme
}
export default CustomTheme;