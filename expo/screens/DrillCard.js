import React, { useContext } from "react";
import { View, Image } from 'react-native';
import { Text } from "react-native-paper";

import { StyleSheet } from "react-native";

import { TrainingScreenContext } from "./TrainingScreenContext";

export function DrillCard() {
    const ctx = useContext(TrainingScreenContext);

    return (
        <View style={styles.drillCardcontainer}>
            <Image style={styles.drillCardImage} source={{
                uri: ctx.currentDrill.coverUrl,
            }} />
            <Text variant="headlineLarge">{ctx.currentDrill.title}</Text>
            <Text variant="headlineSmall">{ctx.currentDrill.subtitle}</Text>
        </View>
    );
}

export const styles = StyleSheet.create({
    drillCardImage: {
        height: 375,
        width: 375,
    },
    drillCardcontainer: {
        flex: 1,
        // backgroundColor: '#242c40',
        alignItems: 'center',
        justifyContent: 'center',
    }
});