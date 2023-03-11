import React from 'react';

import manifest from './manifest.json';

const DrillList = ({ onSelected }) => {

    const onClick = (drill) => (e) => {
        e.stopPropagation();
        onSelected(drill.data);
    };

    return (
        <div>
            {manifest.drills.map((drill) => (
                <div key={drill.name}>
                    <button onClick={onClick(drill)}>{drill.name}</button>
                    <br />
                </div>
            ))}
        </div>
    );
};

export default DrillList;