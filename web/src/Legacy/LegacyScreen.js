import React from "react";

import MainDrawer from "../Drawer";

import { LegacyGuideContainerGate } from "./LegacyGuideContainerGate";

function LegacyScreen() {
    return (
        <>
            <MainDrawer />
            <LegacyGuideContainerGate />
        </>
    );
}

export const styles = {
    container: {
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        padding: 0,

    },
    topFlex: {
        flex: 8,
        paddingTop: "5vh",
        overflow: "hidden",
        display: "flex",
        alignItems: "stretch",
        justifyContent: "center",
    },
    bottomFlex: {
        flex: 2,
        overflow: "auto",
        display: "flex",
        paddingTop: "20px",
        alignItems: "baseline",
        justifyContent: "center",
    }
}


export default LegacyScreen;