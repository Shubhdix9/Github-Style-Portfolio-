"use client";

import React, { useState, useMemo } from "react";

interface DayData {
  date: string;
  count: number;
  dayOfWeek: number;
}

interface HeatmapProps {
  extraCommits: Record<string, number>;
  onCellClick: (dateStr: string) => void;
  onSimulateCommit: () => void;
  totalSimulated: number;
}

function isIITKanpurCell(col: number, row: number): boolean {
  const startCol = 10;
  
  // 'I'
  if (col === startCol && row >= 1 && row <= 5) return true;
  
  // 'I'
  if (col === startCol + 2 && row >= 1 && row <= 5) return true;
  
  // 'T'
  if (col === startCol + 4 && row === 1) return true;
  if (col === startCol + 5 && row >= 1 && row <= 5) return true;
  if (col === startCol + 6 && row === 1) return true;
  
  // 'K'
  if (col === startCol + 9 && row >= 1 && row <= 5) return true;
  if (col === startCol + 10 && (row === 2 || row === 4)) return true;
  if (col === startCol + 11 && (row === 1 || row === 5)) return true;
  
  // 'A'
  if (col === startCol + 13 && row >= 1 && row <= 5) return true;
  if (col === startCol + 14 && (row === 1 || row === 3)) return true;
  if (col === startCol + 15 && row >= 1 && row <= 5) return true;
  
  // 'N' (4 columns wide)
  if (col === startCol + 17 && row >= 1 && row <= 5) return true;
  if (col === startCol + 18 && (row === 2 || row === 3)) return true;
  if (col === startCol + 19 && row === 4) return true;
  if (col === startCol + 20 && row >= 1 && row <= 5) return true;
  
  // 'P'
  if (col === startCol + 22 && row >= 1 && row <= 5) return true;
  if (col === startCol + 23 && (row === 1 || row === 3)) return true;
  if (col === startCol + 24 && row >= 1 && row <= 3) return true;
  
  // 'U'
  if (col === startCol + 26 && row >= 1 && row <= 5) return true;
  if (col === startCol + 27 && row === 5) return true;
  if (col === startCol + 28 && row >= 1 && row <= 5) return true;
  
  // 'R'
  if (col === startCol + 30 && row >= 1 && row <= 5) return true;
  if (col === startCol + 31 && (row === 1 || row === 3 || row === 4)) return true;
  if (col === startCol + 32 && (row === 1 || row === 2 || row === 3 || row === 5)) return true;
  
  return false;
}

export default function Heatmap({ extraCommits, onCellClick, onSimulateCommit, totalSimulated }: HeatmapProps) {
  const [year, setYear] = useState(2026);

  // Generate 365 days leading up to today (June 8, 2026)
  const days: DayData[] = useMemo(() => {
    const list: DayData[] = [];
    const endDate = new Date(2026, 5, 8); // June 8, 2026
    const startDate = new Date(endDate);
    startDate.setDate(endDate.getDate() - 364); // 365 days in total
    const firstDayOfWeek = startDate.getDay();

    // Align to starting day of week
    const current = new Date(startDate);
    let idx = 0;
    while (current <= endDate) {
      const dateString = current.toISOString().split("T")[0];
      const gridCol = Math.floor((idx + firstDayOfWeek) / 7);
      const gridRow = (idx + firstDayOfWeek) % 7;
      
      let baseCount = 0;

      if (dateString === "2025-12-22" || dateString === "2025-12-24") {
        baseCount = 0; // Explicitly remove color (grey box)
      } else if (isIITKanpurCell(gridCol, gridRow)) {
        baseCount = 8; // High contribution (level 4, bright green box)
      } else {
        // Deterministic hash based on dateString to ensure identical outputs on server/client (resolves hydration mismatch)
        let hash = 0;
        for (let i = 0; i < dateString.length; i++) {
          hash = dateString.charCodeAt(i) + ((hash << 5) - hash);
        }
        hash = Math.abs(hash);

        // Determine base contributions based on mock research/development activity
        const dayOfWeek = current.getDay();

        // Weekends vs weekdays
        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
          baseCount = hash % 3; // 0, 1, or 2 (keep base lower so letters pop)
        } else {
          baseCount = (hash % 10) > 8 ? 1 : 0;
        }
      }

      list.push({
        date: dateString,
        count: baseCount,
        dayOfWeek: current.getDay(),
      });

      current.setDate(current.getDate() + 1);
      idx++;
    }
    return list;
  }, [year]);

  // Combine baseline data with user-clicked extra commits
  const mergedDays = useMemo(() => {
    return days.map(d => {
      const added = extraCommits[d.date] || 0;
      return {
        ...d,
        count: d.count + added
      };
    });
  }, [days, extraCommits]);

  // Compute total contributions
  const totalContributions = useMemo(() => {
    const base = mergedDays.reduce((acc, curr) => acc + curr.count, 0);
    return base;
  }, [mergedDays]);

  // Group days into weeks for easy column layout (53 weeks)
  const columns = useMemo(() => {
    const cols: DayData[][] = [];
    let currentWeek: DayData[] = [];
    
    // Fill leading empty cells for the first week so columns line up
    const firstDayOfWeek = mergedDays[0]?.dayOfWeek || 0;
    for (let i = 0; i < firstDayOfWeek; i++) {
      currentWeek.push({ date: "", count: -1, dayOfWeek: i });
    }

    mergedDays.forEach(day => {
      currentWeek.push(day);
      if (currentWeek.length === 7) {
        cols.push(currentWeek);
        currentWeek = [];
      }
    });

    if (currentWeek.length > 0) {
      // Pad trailing cells
      while (currentWeek.length < 7) {
        currentWeek.push({ date: "", count: -1, dayOfWeek: currentWeek.length });
      }
      cols.push(currentWeek);
    }
    return cols;
  }, [mergedDays]);

  const getColorClass = (count: number) => {
    if (count < 0) return "bg-transparent"; // Spacer cell
    if (count === 0) return "bg-gh-l0 border-black/10 dark:border-white/5";
    if (count <= 2) return "bg-gh-l1";
    if (count <= 4) return "bg-gh-l2";
    if (count <= 7) return "bg-gh-l3";
    return "bg-gh-l4";
  };

  // Month labels helper
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthLabels = useMemo(() => {
    const labels: { text: string; index: number }[] = [];
    let lastMonth = -1;
    
    mergedDays.forEach((day, index) => {
      if (day.date) {
        const dateObj = new Date(day.date);
        const m = dateObj.getMonth();
        const colIndex = Math.floor(index / 7);
        if (m !== lastMonth && colIndex < 52) {
          labels.push({ text: months[m], index: colIndex });
          lastMonth = m;
        }
      }
    });
    return labels;
  }, [mergedDays]);

  return (
    <div className="border border-card-border bg-card-bg rounded-lg p-4 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <span className="text-sm font-semibold text-foreground">
            {totalContributions.toLocaleString()} contributions in the last year
          </span>
          {totalSimulated > 0 && (
            <span className="text-xs text-gh-blue block font-mono">
              + {totalSimulated} commits made by you (click grid nodes to commit!)
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onSimulateCommit}
            className="text-xs font-mono py-1 px-2.5 rounded border border-card-border hover:border-gh-blue bg-gh-btn-hover text-foreground cursor-pointer transition-colors"
          >
            git commit --amend
          </button>
          
          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="text-xs font-mono bg-card-bg border border-card-border rounded py-1 px-2 text-foreground focus:outline-none focus:border-gh-blue"
          >
            <option value={2026}>2026 (Active)</option>
            <option value={2025}>2025</option>
          </select>
        </div>
      </div>

      {/* Grid Container */}
      <div className="overflow-x-auto pb-2">
        <div className="min-w-[690px] flex flex-col gap-1.5 select-none">
          {/* Month Labels */}
          <div className="h-4 text-[10px] text-gh-grey relative w-full mb-1">
            {monthLabels.map((lbl, idx) => (
              <span
                key={idx}
                className="absolute"
                style={{ left: `${lbl.index * 13 + 30}px` }}
              >
                {lbl.text}
              </span>
            ))}
          </div>

          <div className="flex gap-1">
            {/* Day labels (Mon, Wed, Fri) */}
            <div className="flex flex-col justify-around text-[10px] text-gh-grey w-6 pr-1 h-[91px]">
              <span></span>
              <span>Mon</span>
              <span></span>
              <span>Wed</span>
              <span></span>
              <span>Fri</span>
              <span></span>
            </div>

            {/* Matrix of Squares */}
            <div className="flex gap-[3px]">
              {columns.map((week, colIdx) => (
                <div key={colIdx} className="flex flex-col gap-[3px]">
                  {week.map((day, rowIdx) => {
                    const formattedDate = day.date 
                      ? new Date(day.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                      : "";
                    
                    return (
                      <div
                        key={rowIdx}
                        onClick={() => day.date && onCellClick(day.date)}
                        className={`h-[10px] w-[10px] rounded-[1.5px] cursor-pointer relative group transition-all hover:ring-1 hover:ring-gh-blue duration-100 ${getColorClass(day.count)}`}
                      >
                        {day.date && (
                          <div className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 scale-90 rounded bg-background border border-card-border p-1.5 text-center text-[10px] text-foreground opacity-0 shadow-xl transition-all duration-200 group-hover:scale-100 group-hover:opacity-100 z-50 whitespace-nowrap">
                            <span className="font-semibold">{day.count} contributions</span>
                            <span className="block text-gh-grey text-[9px]">{formattedDate}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-3 text-xs text-gh-grey">
        <span className="hover:text-gh-blue cursor-pointer">
          Learn how we count contributions
        </span>
        <div className="flex items-center gap-1">
          <span>Less</span>
          <div className="h-[10px] w-[10px] rounded-[1.5px] bg-gh-l0 border border-black/10 dark:border-white/5" />
          <div className="h-[10px] w-[10px] rounded-[1.5px] bg-gh-l1" />
          <div className="h-[10px] w-[10px] rounded-[1.5px] bg-gh-l2" />
          <div className="h-[10px] w-[10px] rounded-[1.5px] bg-gh-l3" />
          <div className="h-[10px] w-[10px] rounded-[1.5px] bg-gh-l4" />
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
