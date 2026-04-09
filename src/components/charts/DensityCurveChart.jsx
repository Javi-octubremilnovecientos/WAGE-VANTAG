import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const COLORS = ['hsl(340, 82%, 42%)', 'hsl(45, 96%, 56%)', 'hsl(220, 70%, 50%)'];

// Generate a simple bell-curve style distribution
function generateDensity(min, q1, median, q3, max) {
  const points = [];
  const range = max - min;
  for (let i = 0; i <= 20; i++) {
    const x = min + (range * i / 20);
    // Simplified gaussian-like distribution
    const mu = median;
    const sigma = (q3 - q1) / 1.35;
    const y = Math.exp(-0.5 * Math.pow((x - mu) / sigma, 2)) / (sigma * Math.sqrt(2 * Math.PI));
    points.push({ x: parseFloat((x * 1000).toFixed(0)), y: parseFloat(y.toFixed(4)) });
  }
  return points;
}

export default function DensityCurveChart({ wageDataMap = {}, countries = [] }) {
  // Merge density curves
  const allPoints = {};
  countries.forEach(country => {
    const data = wageDataMap[country];
    if (!data) return;
    const density = generateDensity(data.min, data.q1, data.median, data.q3, data.max);
    density.forEach(p => {
      if (!allPoints[p.x]) allPoints[p.x] = { x: p.x };
      allPoints[p.x][country] = p.y;
    });
  });

  const chartData = Object.values(allPoints).sort((a, b) => a.x - b.x);

  return (
    <div className="w-full h-56">
      <ResponsiveContainer>
        <AreaChart data={chartData} margin={{ top: 10, right: 10, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.5} vertical={false} />
          <XAxis dataKey="x" tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
              fontSize: '12px'
            }}
          />
          <Legend />
          {countries.map((country, idx) => (
            <Area
              key={country}
              type="monotone"
              dataKey={country}
              stroke={COLORS[idx % COLORS.length]}
              fill={COLORS[idx % COLORS.length]}
              fillOpacity={0.15}
              strokeWidth={2}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}