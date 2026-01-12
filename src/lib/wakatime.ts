export type WakatimeActivity = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

export type WakatimeStats = {
  totalHours: number;
  thisWeekHours: number;
  bestDayHours: number;
  averagePerDay: number;
  totalDays: number;
};

export type WakatimeData = {
  activities: WakatimeActivity[];
  stats: WakatimeStats;
};

export const FetchWakatime = async (): Promise<WakatimeData | null> => {
  try {
    const response = await fetch("/api/wakatime");

    if (!response.ok) {
      console.error("Failed to fetch WakaTime data");
      return null;
    }

    const data: WakatimeData = await response.json();
    return data;
  } catch (error) {
    console.error("WakaTime fetch error:", error);
    return null;
  }
};
