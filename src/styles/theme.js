import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#212121', // Dark grey color
        },
        secondary: {
            main: '#B71C1C', // Dark red color
        },
        background: {
            default: '#FFFFFF', // White color
        },
    },
});

export default theme;