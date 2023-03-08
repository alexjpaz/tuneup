import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import { tokens } from 'react-native-paper/lib/commonjs/styles/themes/v3/tokens';

const { palette } = tokens.md.ref;



const Theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
    }
};

export default Theme;