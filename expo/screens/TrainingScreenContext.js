import React, { useState } from "react";

export const TrainingScreenContext = React.createContext({});

export const DefaultTrainingScreenContext = ({ children }) => {
    const [ state, setState ] = useState(() => {
        const value = {
            currentDrillIndex: 0,
            currentDrill: null,
            drills: [
                {
                    title: "bubble",
                    subtitle: "Tenor major scale circular",
                    coverUrl: "https://fakeimg.pl/500x500/edede9/21005d/?retina=1&font=museo&text=bubble",
                    mediaUrl: require('../assets/foo.mp3'),
                },
                {
                    title: "goo/koo2",
                    subtitle: "Tenor major scale circular",
                    coverUrl: "https://fakeimg.pl/500x500/edede9/21005d/?retina=1&font=museo&text=goo/koo",
                    mediaUrl: require('../assets/foo.mp3'),
                },
                {
                    title: "siren",
                    subtitle: "Tenor major scale circular",
                    coverUrl: "https://fakeimg.pl/500x500/edede9/21005d/?retina=1&font=museo&text=siren",
                    mediaUrl: require('../assets/foo.mp3'),
                }
            ]
        }

        value.currentDrill = value.drills[0];

        value.nextDrill = () => {
            setState(s => {
                let currentDrillIndex = s.currentDrillIndex;

                if(currentDrillIndex < state.drills.length - 1) {
                    currentDrillIndex = currentDrillIndex + 1;
                }
                
                return {
                    ...state,
                    currentDrillIndex,
                    currentDrill: state.drills[currentDrillIndex],
                }
            });
        };

        value.prevDrill = () => {
            setState(s => {
                let currentDrillIndex = s.currentDrillIndex;

                if(currentDrillIndex > 0) {
                    currentDrillIndex = currentDrillIndex - 1;
                }

                return {
                    ...state,
                    currentDrillIndex,
                    currentDrill: state.drills[currentDrillIndex],
                }
            });
        };

        return value;
    });


    return (
        <TrainingScreenContext.Provider value={state}>
            {children}
        </TrainingScreenContext.Provider>
    );
};