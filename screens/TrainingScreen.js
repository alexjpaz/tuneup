import React from "react";

import { StyleSheet, View } from 'react-native';
import { DrillCard } from "./DrillCard";
import ScalePlayer from "./ScalePlayer";

import { DefaultTrainingScreenContext } from "./TrainingScreenContext";

export default function TrainingScreen() {

    return (
        <DefaultTrainingScreenContext>
            <View style={styles.drillCardcontainer}>
                <DrillCard />
            </View>
            <View style={styles.scalePlayerContainer}>
                <ScalePlayer />
            </View>
        </DefaultTrainingScreenContext>
    );
}

export const styles = StyleSheet.create({
    scalePlayerContainer: {
        flex: 3,
    },
    drillCardcontainer: {
        flex: 10,
    },
});