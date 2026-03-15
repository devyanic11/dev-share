"use client";

import { DevScore } from "@/lib/platforms/types";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip);

export default function SkillRadar({ score }: { score: DevScore }) {
  const data = {
    labels: ["Engineering", "Problem Solving", "Open Source", "Community", "Writing"],
    datasets: [
      {
        label: "Profile",
        data: [
          score.engineering,
          score.problemSolving,
          score.openSource,
          score.community,
          score.writing,
        ],
        backgroundColor: "rgba(0, 255, 65, 0.15)",
        borderColor: "#00ff41",
        pointBackgroundColor: "#000",
        pointBorderColor: "#00ff41",
        pointHoverBackgroundColor: "#00ff41",
        pointHoverBorderColor: "#fff",
        borderWidth: 1.5,
        pointRadius: 2,
        pointHoverRadius: 4,
      },
    ],
  };

  const options = {
    scales: {
      r: {
        angleLines: { color: "rgba(0, 255, 65, 0.1)" },
        grid: { color: "rgba(0, 255, 65, 0.1)" },
        pointLabels: {
          color: "rgba(0, 255, 65, 0.6)",
          font: { family: "var(--font-mono)", size: 8, weight: 600 },
        },
        ticks: { display: false, min: 0, max: 100, stepSize: 25 },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.9)",
        titleColor: "#00ff41",
        bodyColor: "#fff",
        borderColor: "rgba(0, 255, 65, 0.5)",
        borderWidth: 1,
        bodyFont: { family: "var(--font-mono)", size: 10 },
        titleFont: { family: "var(--font-mono)", size: 10 },
        padding: 6,
        displayColors: false,
        callbacks: {
          label: (context: any) => `${context.raw}`,
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="tech-panel p-2 h-[200px] flex flex-col justify-center items-center relative">
      <h3 className="text-[9px] uppercase tracking-widest text-[#00ff41] font-mono absolute top-2 left-3">RADAR</h3>
      <div className="w-full h-full p-4">
        <Radar data={data} options={options} />
      </div>
    </div>
  );
}
