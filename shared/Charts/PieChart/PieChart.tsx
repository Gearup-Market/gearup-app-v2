'use client';
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from 'recharts';
import styles from './PieChart.module.scss';

interface Props {
    data: any,
    colors: any

}

const PieChartComponent = ({ data, colors }: Props) => {
    return (
        <div className={styles.container}>
            <ResponsiveContainer width={200} height={200}>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        fill="#8884d8"
                        paddingAngle={10}
                        dataKey="value"
                    >
                        {data.map((entry: any, index: number) => (
                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                        ))}
                        <Label content={<CustomLabel />} position="center" />
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
           {/*  <div className={styles.color_details}>
                {
                    data.map((entry: any, index: number) => (
                        <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ backgroundColor: colors[index % colors.length], width: '10px', height: '10px', borderRadius: '50%' }}></div>
                            <p>{entry.name}</p>
                        </div>
                    ))
                }
            </div> */}
        </div>
    );
};

export default PieChartComponent;


const CustomLabel = ({ viewBox }: any) => {
    const { cx, cy } = viewBox;
    return (
        <g>
            <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central">
                <tspan x={cx} dy="-1.2em" fontSize="16" fontWeight="normal">Total Earnings</tspan>
                <tspan x={cx} dy="1.2em" fontSize="16" fontWeight="bold">$0.00</tspan>
            </text>
        </g>
    );
};