import React, { useEffect, useState } from 'react';
import './HorizontalValueBar.css';
import useTheme from "@mui/material/styles/useTheme";

const HorizontalValueBar = ({ name, value, maxValue }) => {
    const [width, setWidth] = useState(0);

    const theme = useTheme()

    useEffect(() => {
        // Animate the width to the calculated percentage
        setTimeout(() => {
            setWidth((value / maxValue) * 100);
        }, 100);
    }, [value, maxValue]);

    return (
        <div className="bar-chart">
            <div className="bar-chart__label">{name}</div>
            <div className="bar-chart__bar-wrapper">
                <div
                    className="bar-chart__bar"
                    style={{ width: `${width}%`, backgroundColor: theme.palette.primary.main }}
                ></div>
            </div>
            <div className="bar-chart__value">{value}</div>
        </div>
    );
};

export default HorizontalValueBar;
