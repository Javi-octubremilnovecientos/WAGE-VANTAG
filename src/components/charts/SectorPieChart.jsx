import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const PIE_COLORS = [
  '#C2185B', '#F9A825', '#1976D2', '#388E3C',
  '#7B1FA2', '#E64A19', '#00838F', '#FBC02D',
  '#5D4037', '#263238'
];

export default function SectorPieChart({ data = [], title = '' }) {
  return (
    <div className="w-full">
      {title && <p className="text-xs font-medium text-muted-foreground mb-2 text-center">{title}</p>}
      <div className="h-56">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              dataKey="value"
              nameKey="name"
              label={({ name, value }) => `${value}`}
              labelLine={false}
            >
              {data.map((entry, idx) => (
                <Cell key={idx} fill={PIE_COLORS[idx % PIE_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                fontSize: '12px'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}