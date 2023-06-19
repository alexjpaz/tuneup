import React from "react";
import Typography from '@mui/material/Typography';

export function LegacyDisplay({ scale, handleTouchEnd = () => { } }) {

    return (
        <Typography
            fontSize="1.75rem"
            textAlign={"center"}
            variant="body1"
            style={{ "alignSelf": "center", "width": "100%" }}
        >
            {scale.label}
        </Typography>
    );
}
