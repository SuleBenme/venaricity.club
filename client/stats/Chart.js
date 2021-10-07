import React from 'react'
import { PieChart } from "react-minimal-pie-chart";

export default function Chart(props) {
    console.log(props.stats)
    const dataMock = [
        { title: 'One', value: Number(props.stats.wins), color: '#19a863' },
        { title: 'Two', value: Number(props.stats.losses), color: '#c4010d' },
        { title: 'Three', value: Number(props.stats.ties), color: '#282d3b' },
    ];

    console.log(dataMock)

    return (
    <PieChart
        style={{ height: '150px' }}
        data={dataMock}
        lineWidth={22} 
    />)
}