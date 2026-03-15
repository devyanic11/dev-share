"use client";

import { ActivityCalendar, ThemeInput } from "react-activity-calendar";

export default function LeetCodeHeatmap({ calendarStr }: { calendarStr: string }) {
  // LeetCode returns calendar as JSON string {"1709424000": 2, ...} where keys are UNIX timestamps

  let calendarData: Record<string, number> = {};
  try {
    calendarData = JSON.parse(calendarStr);
  } catch {
    calendarData = {};
  }

  // We need to convert this to the [{ date: "YYYY-MM-DD", count: N, level: 0-4 }] array expected by react-activity-calendar
  // Generate the last 365 days
  const data = [];
  const end = new Date();
  const start = new Date();
  start.setDate(start.getDate() - 364);

  // Map dates for quick O(1) lookup
  const dailyCounts = new Map<string, number>();
  
  Object.entries(calendarData).forEach(([tsStr, count]) => {
    const ts = parseInt(tsStr) * 1000;
    const dateStr = new Date(ts).toISOString().split("T")[0];
    dailyCounts.set(dateStr, count);
  });

  let curr = new Date(start);
  while (curr <= end) {
    const dateStr = curr.toISOString().split("T")[0];
    const count = dailyCounts.get(dateStr) || 0;
    
    data.push({
      date: dateStr,
      count: count,
      level: count === 0 ? 0 : count <= 1 ? 1 : count <= 3 ? 2 : count <= 5 ? 3 : 4,
    });
    
    curr.setDate(curr.getDate() + 1);
  }

  const customTheme: ThemeInput = {
    light: ['#111', '#422800', '#7a4e00', '#b97700', '#eab308'],
    dark: ['#161b22', '#422800', '#7a4e00', '#b97700', '#eab308'], // Yellow theme for LeetCode
  };

  return (
    <div className="w-full overflow-x-auto pb-4 custom-scrollbar">
      <div className="min-w-[700px]">
        <ActivityCalendar
          data={data}
          theme={customTheme}
          colorScheme="dark"
          labels={{
            totalCount: '{{count}} submissions in the last year',
          }}
          blockRadius={3}
          blockSize={12}
          blockMargin={4}
        />
      </div>
    </div>
  );
}
