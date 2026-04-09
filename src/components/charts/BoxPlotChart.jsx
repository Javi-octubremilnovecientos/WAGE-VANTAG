import React from 'react';
import {
  ComposedChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer,
  Bar, Cell, Tooltip, Legend, ReferenceLine
} from 'recharts';

// Custom box-plot shape renderer
const BoxPlotShape = ({ x, y, width, height, payload, color }) => {
  if (!payload || !payload.data) return null;
  const { min, q1, median, q3, max } = payload.data;
  const chartHeight = payload.chartHeight || 300;
  const yDomain = payload.yDomain || [0, 10];

  const scale = (val) => {
    const ratio = (val - yDomain[0]) / (yDomain[1] - yDomain[0]);
    return chartHeight - (ratio * chartHeight);
  };

  const boxTop = scale(q3);
  const boxBottom = scale(q1);
  const medianY = scale(median);
  const minY = scale(min);
  const maxY = scale(max);
  const boxWidth = Math.min(width * 0.6, 50);
  const cx = x + width / 2;

  return (
    <g>
      {/* Whisker line (min to max) */}
      <line x1={cx} y1={minY} x2={cx} y2={maxY} stroke={color} strokeWidth={2} />
      {/* Min cap */}
      <line x1={cx - boxWidth / 3} y1={minY} x2={cx + boxWidth / 3} y2={minY} stroke={color} strokeWidth={2} />
      {/* Max cap */}
      <line x1={cx - boxWidth / 3} y1={maxY} x2={cx + boxWidth / 3} y2={maxY} stroke={color} strokeWidth={2} />
      {/* Box (Q1 to Q3) */}
      <rect
        x={cx - boxWidth / 2}
        y={boxTop}
        width={boxWidth}
        height={boxBottom - boxTop}
        fill={color}
        fillOpacity={0.3}
        stroke={color}
        strokeWidth={2}
        rx={2}
      />
      {/* Median line */}
      <line
        x1={cx - boxWidth / 2}
        y1={medianY}
        x2={cx + boxWidth / 2}
        y2={medianY}
        stroke={color}
        strokeWidth={3}
      />
    </g>
  );
};

// Custom tooltip
const BoxPlotTooltip = ({ active, payload }) => {
  if (!active || !payload || !payload[0]) return null;
  const data = payload[0]?.payload?.data;
  const name = payload[0]?.payload?.name;
  if (!data) return null;

  return (
    <div className="bg-card border border-border rounded-lg px-3 py-2 shadow-lg">
      <p className="font-heading font-semibold text-sm mb-1">{name}</p>
      <div className="text-xs space-y-0.5 text-muted-foreground">
        <p>Max: <span className="text-foreground font-medium">{data.max}k €</span></p>
        <p>Q3: <span className="text-foreground font-medium">{data.q3}k €</span></p>
        <p>Median: <span className="text-foreground font-medium">{data.median}k €</span></p>
        <p>Q1: <span className="text-foreground font-medium">{data.q1}k €</span></p>
        <p>Min: <span className="text-foreground font-medium">{data.min}k €</span></p>
      </div>
    </div>
  );
};

const COLORS = ['hsl(340, 82%, 42%)', 'hsl(45, 96%, 56%)', 'hsl(220, 70%, 50%)'];

export default function BoxPlotChart({ countries = [], wageDataMap = {}, userWage, height = 320 }) {
  const hasData = countries.length > 0 && countries.some(c => wageDataMap[c]);

  // Calculate Y domain
  let yMax = 8;
  let yMin = 0;
  if (hasData) {
    const allMax = countries.filter(c => wageDataMap[c]).map(c => wageDataMap[c].max);
    const allMin = countries.filter(c => wageDataMap[c]).map(c => wageDataMap[c].min);
    yMax = Math.ceil(Math.max(...allMax) + 1);
    yMin = Math.max(0, Math.floor(Math.min(...allMin) - 0.5));
  }

  // Build chart data
  const chartData = hasData
    ? countries.filter(c => wageDataMap[c]).map((country, idx) => ({
        name: country,
        value: wageDataMap[country].q3, // used for bar height placeholder
        data: wageDataMap[country],
        color: COLORS[idx % COLORS.length],
        chartHeight: height - 80,
        yDomain: [yMin, yMax],
      }))
    : [];

  // Y-axis ticks
  const yTicks = [];
  for (let i = yMin; i <= yMax; i++) yTicks.push(i);

  return (
    <div className="w-full" style={{ height }}>
      {!hasData ? (
        // Empty state with grid lines
        <div className="w-full h-full flex flex-col">
          <div className="flex-1 relative border-l border-b border-border/30">
            {yTicks.map((tick, i) => (
              <div
                key={tick}
                className="absolute left-0 right-0 flex items-center"
                style={{ bottom: `${((tick - yMin) / (yMax - yMin)) * 100}%` }}
              >
                <span className="text-xs text-muted-foreground w-6 text-right pr-2">{tick}</span>
                <div className="flex-1 border-t border-dashed border-border/40" />
              </div>
            ))}
            {/* Empty state message */}
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-muted-foreground/50 text-sm font-medium">
                Select a country to see wage data
              </p>
            </div>
          </div>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData} margin={{ top: 20, right: 20, bottom: 30, left: 10 }}>
            <CartesianGrid
              strokeDasharray="6 4"
              stroke="hsl(var(--border))"
              strokeOpacity={0.5}
              vertical={false}
            />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={[yMin, yMax]}
              ticks={yTicks}
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<BoxPlotTooltip />} />

            {/* User wage reference line */}
            {userWage > 0 && (
              <ReferenceLine
                y={userWage / 1000}
                stroke="hsl(var(--foreground))"
                strokeDasharray="4 4"
                strokeWidth={1.5}
                label={{
                  value: `Your wage: ${userWage}€`,
                  position: 'insideTopRight',
                  fill: 'hsl(var(--foreground))',
                  fontSize: 11,
                }}
              />
            )}

            {/* Invisible bars to create positioning, then custom shapes overlay */}
            <Bar dataKey="value" fill="transparent" barSize={60}
              shape={(props) => (
                <BoxPlotShape
                  {...props}
                  color={props.payload.color}
                />
              )}
            />
          </ComposedChart>
        </ResponsiveContainer>
      )}

      {/* Legend */}
      {hasData && (
        <div className="flex items-center justify-center gap-4 -mt-2">
          {countries.filter(c => wageDataMap[c]).map((country, idx) => (
            <div key={country} className="flex items-center gap-1.5">
              <span className="font-medium text-sm">{country}</span>
              <div
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: COLORS[idx % COLORS.length] }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}