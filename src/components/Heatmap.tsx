import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { Tooltip as ReactTooltip } from 'react-tooltip';

interface HeatmapData {
    date: string;
    count: number;
}

// Define the props for the Heatmap component
interface HeatmapProps {
    data: HeatmapData[];
    title: string;
}

// Define the type for the value prop passed to callback functions
type HeatmapValue = {
    date: string;
    count: number;
} | null | undefined;

const Heatmap:React.FC<HeatmapProps> = ({ data, title }) => {
  const today = new Date();
  const startDate = new Date(today.getFullYear(), 0, 1);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">{title} Contributions</h3>
       <CalendarHeatmap
        startDate={startDate}
        endDate={today}
        values={data}
        classForValue={(value:HeatmapValue) => {
          if (!value || value.count === 0) {
            return 'color-empty';
          }
          const count = Math.min(value.count, 4);
          return `color-scale-${count}`;
        }}
        tooltipDataAttrs={(value:HeatmapValue) => {
            let content = 'No contributions';
            if (value && value.date && value.count > 0) {
                content = `${value.count} contribution${value.count > 1 ? 's' : ''} on ${value.date}`;
            }
            return {
                'data-tooltip-id': 'heatmap-tooltip',
                'data-tooltip-content': content,
            };
        }}
        showWeekdayLabels={false}
      />
      <ReactTooltip id="heatmap-tooltip" />
    </div>
  );
};

export default Heatmap;