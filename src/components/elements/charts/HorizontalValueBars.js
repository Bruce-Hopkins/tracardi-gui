import React from 'react';
import HorizontalValueBar from './HorizontalValueBar';

const HorizontalValueBars = ({ data }) => {
    // Convert the object into an array of [key, value] pairs
    const dataArray = Object.entries(data).map(([key, value]) => {
        // Ensure the value is a number, if not, set it to 0
        const numericValue = isNaN(Number(value)) ? 0 : Number(value);
        return [key, numericValue];
    });

    // Sort the data array by value in descending order
    const sortedData = dataArray.sort((a, b) => b[1] - a[1]);

    // Extract the maximum value for scaling the bars
    const maxValue = Math.max(...dataArray.map(([_, value]) => value));

    // Limit the displayed data to the top 20 bars
    const limitedData = sortedData.slice(0, 15);

    return (
        <div>
            {limitedData.map(([key, value]) => (
                <HorizontalValueBar key={key} name={key} value={value} maxValue={maxValue} />
            ))}
        </div>
    );
};

export default HorizontalValueBars;
