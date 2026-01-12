import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const apiKey = process.env.NEXT_PUBLIC_WAKATIME_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "API Key not configured" });
  }

  // 1. Tentukan Rentang Waktu (1 Tahun Terakhir)
  const endDate = new Date();
  const startDate = new Date();
  startDate.setFullYear(endDate.getFullYear() - 1);

  const startStr = startDate.toISOString().split("T")[0]; // Format YYYY-MM-DD
  const endStr = endDate.toISOString().split("T")[0];

  // 2. Siapkan URL Endpoint
  const url = `https://wakatime.com/api/v1/users/current/summaries?start=${startStr}&end=${endStr}`;

  // 3. Encode API Key ke Base64
  const base64ApiKey = Buffer.from(apiKey).toString("base64");

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Basic ${base64ApiKey}`,
      },
    });

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: "Failed to fetch WakaTime" });
    }

    const data = await response.json();

    // 4. Transformasi Data untuk React Activity Calendar
    const heatmapData = data.data.map((day: any) => {
      const seconds = day.grand_total.total_seconds;

      // Logika level (0-4) berdasarkan durasi koding
      let level = 0;
      if (seconds > 0) level = 1; // Sedikit koding
      if (seconds > 3600) level = 2; // > 1 jam
      if (seconds > 10800) level = 3; // > 3 jam
      if (seconds > 18000) level = 4; // > 5 jam (Sangat aktif)

      return {
        date: day.range.date, // Format YYYY-MM-DD dari WakaTime
        count: Math.round(seconds / 60), // Konversi ke menit
        level: level,
      };
    });

    // 5. Hitung statistik tambahan
    const totalSeconds = data.data.reduce(
      (acc: number, day: any) => acc + day.grand_total.total_seconds,
      0
    );
    const totalHours = Math.round(totalSeconds / 3600);
    const totalDays = data.data.filter(
      (day: any) => day.grand_total.total_seconds > 0
    ).length;
    const averagePerDay =
      totalDays > 0 ? Math.round(totalHours / totalDays) : 0;

    // Hitung Best Day
    let bestDaySeconds = 0;
    data.data.forEach((day: any) => {
      if (day.grand_total.total_seconds > bestDaySeconds) {
        bestDaySeconds = day.grand_total.total_seconds;
      }
    });
    const bestDayHours = Math.round(bestDaySeconds / 3600);

    // Hitung This Week
    const today = new Date();
    const oneWeekAgo = new Date(today);
    oneWeekAgo.setDate(today.getDate() - 7);

    const thisWeekSeconds = data.data
      .filter((day: any) => {
        const dayDate = new Date(day.range.date);
        return dayDate >= oneWeekAgo && dayDate <= today;
      })
      .reduce(
        (acc: number, day: any) => acc + day.grand_total.total_seconds,
        0
      );
    const thisWeekHours = Math.round(thisWeekSeconds / 3600);

    return res.status(200).json({
      activities: heatmapData,
      stats: {
        totalHours,
        thisWeekHours,
        bestDayHours,
        averagePerDay,
        totalDays,
      },
    });
  } catch (error) {
    console.error("WakaTime API Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
