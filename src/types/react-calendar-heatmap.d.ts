declare module 'react-calendar-heatmap' {
  import { ComponentType } from 'react';
  
  interface CalendarHeatmapProps {
    values: Array<{
      date: Date | string;
      count: number;
    }>;
    startDate?: Date;
    endDate?: Date;
    showWeekdayLabels?: boolean;
    [key: string]: unknown;
  }
  
  const CalendarHeatmap: ComponentType<CalendarHeatmapProps>;
  export default CalendarHeatmap;
}