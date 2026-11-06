import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function PainChart({ data, height = 200 }: { data: { day: string; pain: number }[]; height?: number }) {
  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ left: -24, right: 8, top: 8 }}>
          <defs>
            <linearGradient id="painFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--teal)" stopOpacity={0.35} />
              <stop offset="100%" stopColor="var(--teal)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} minTickGap={24} />
          <YAxis domain={[0, 10]} tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />
          <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border)", fontSize: 12 }} />
          <Area type="monotone" dataKey="pain" stroke="var(--teal)" strokeWidth={2.5} fill="url(#painFill)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
