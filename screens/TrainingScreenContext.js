import React from "react";

const TrainingScreenContextDefaultValue = {
    currentDrill: {
        title: "goo/koo",
        subtitle: "Tenor major scale circular",
        coverUrl: "https://fakeimg.pl/500x500/edede9/21005d/?retina=1&font=museo&text=goo/koo",
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

export const TrainingScreenContext = React.createContext(TrainingScreenContextDefaultValue);

export const DefaultTrainingScreenContext = ({ children }) => (
    <TrainingScreenContext.Provider value={TrainingScreenContextDefaultValue}>
        {children}
    </TrainingScreenContext.Provider>
)