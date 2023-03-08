import React, { useMemo } from "react";
import { View } from "react-native";

import { Text, useTheme, withTheme } from "react-native-paper";


const ScalePlayerBottom = () => {
    const theme = useTheme();

    const style = useMemo(() => ({
        container: {

            // backgroundColor: theme.colors.primary,
        }
    }), [ theme ]);

    return (
        <View style={style.container}>
             <Text variant="titleMedium">Up Next</Text>
        </View>
    );
};

export default withTheme(ScalePlayerBottom);