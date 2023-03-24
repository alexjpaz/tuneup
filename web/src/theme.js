import { createTheme } from '@mui/material/styles';
import { indigo, pink } from '@mui/material/colors';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: indigo,
        secondary: pink,
        // background: {
        //  default: indigo[500]
        // },
    },
});

export default theme;