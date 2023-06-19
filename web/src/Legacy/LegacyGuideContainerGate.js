import React from "react";
import { LegacyGuideStartComponent } from "./LegacyGuideStartComponent";
import { LegacyGuideContainer } from "./LegacyGuideContainer";

export function LegacyGuideContainerGate() {
    const [started, setStarted] = React.useState(true);

    return (
        <>
            {started && <LegacyGuideContainer />}
            {!started && <LegacyGuideStartComponent onClickStart={() => setStarted(true)} />}
        </>
    );
}
