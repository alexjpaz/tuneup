import React, { useContext } from "react";

import { StyleSheet, View, Image } from 'react-native';
import { BottomNavigation, Text } from "react-native-paper";
import ScalePlayer from "./ScalePlayer";

const TrainingScreenContextDefaultValue = {
    currentDrill: {
        title: "goo/koo",
        subtitle: "Tenor major scale circular",
        coverUrl: "https://fakeimg.pl/200x100/21005d/edede9/?retina=1&font=museo&text=goo/koo",
        mediaUrl: "",
    },
    drills: [
        {
            title: "Goo/Koo",
            subtitle: "Tenor major scale circular",
            coverUrl: "",
            mediaUrl: "",
        }
    ]
};

const TrainingScreenContext = React.createContext(TrainingScreenContextDefaultValue);

function DrillCard() {
    const ctx = useContext(TrainingScreenContext);

    return (
        <View style={styles.drillCardcontainer} >
            <Image style={styles.drillCardImage} source={{
                uri: ctx.currentDrill.coverUrl,
            }} />
            <Text variant="headlineLarge">{ctx.currentDrill.title}</Text>
            <Text variant="headlineSmall">{ctx.currentDrill.subtitle}</Text>
        </View>
    );
}

export default function TrainingScreen() {

    return (
        <TrainingScreenContext.Provider value={TrainingScreenContextDefaultValue}>
        <View style={styles.container}>
            <DrillCard />
            <ScalePlayer />
        </View>

        </TrainingScreenContext.Provider>
    );
}

const styles = StyleSheet.create({
    drillCardImage: {
        height: 375,
        width: 375,
    },
    drillCardcontainer: {
            flex: 1,
            // backgroundColor: '#242c40',
            alignItems: 'center',
            justifyContent: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#edede9',
        alignItems: 'center',
        justifyContent: 'center',
    },
});