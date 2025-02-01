"use client";

import { useEffect, useState } from "react";
import { Line, Doughnut } from "react-chartjs-2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface Sadhana {
  _id: string;
  date: string;
  wakeUpTime: string;
  readingDuration: number;
  hearingDuration: number;
  morningProgramme: boolean;
  preachingDuration: number;
}

export default function Dashboard() {
  const [sadhanaData, setSadhanaData] = useState<Sadhana[]>([]);
  const [filteredData, setFilteredData] = useState<Sadhana[]>([]);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [startDate, endDate] = dateRange;

  useEffect(() => {
    fetch("/api/sadhana")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setSadhanaData(data.data);
          setFilteredData(data.data);
        }
      })
      .catch((error) => console.error("Error fetching Sadhana data:", error));
  }, []);

  useEffect(() => {
    if (startDate && endDate) {
      const filtered = sadhanaData.filter(
        (entry) =>
          new Date(entry.date) >= startDate && new Date(entry.date) <= endDate
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(sadhanaData);
    }
  }, [startDate, endDate, sadhanaData]);

  const dates = filteredData.map((entry) => entry.date);
  const wakingTimes = filteredData.map((entry) => entry.wakeUpTime);
  const morningProgrammeAttendance = filteredData.filter(
    (entry) => entry.morningProgramme
  ).length;

  const totalReadingTime = filteredData.reduce(
    (acc, entry) => acc + entry.readingDuration,
    0
  );
  const totalListeningTime = filteredData.reduce(
    (acc, entry) => acc + entry.hearingDuration,
    0
  );
  const totalPreachingTime = filteredData.reduce(
    (acc, entry) => acc + entry.preachingDuration,
    0
  );

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-4 text-center">
        📊 Sadhana Dashboard
      </h1>

      {/* ✅ Single Date Range Input */}
      <div className="flex justify-center mb-6">
        <DatePicker
          selectsRange
          startDate={startDate}
          endDate={endDate}
          onChange={(update) => setDateRange(update)}
          isClearable
          className="border p-2 rounded bg-gray-700 text-white text-center"
          placeholderText="📅 Select Date Range"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Total Reading Time */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg text-center">
          <h2 className="text-lg font-semibold mb-2">📖 Total Reading Time</h2>
          <p className="text-2xl font-bold text-green-400">
            {totalReadingTime} mins
          </p>
        </div>

        {/* Total Listening Time */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg text-center">
          <h2 className="text-lg font-semibold mb-2">
            🎧 Total Listening Time
          </h2>
          <p className="text-2xl font-bold text-blue-400">
            {totalListeningTime} mins
          </p>
        </div>

        {/* Total Preaching Time */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg text-center">
          <h2 className="text-lg font-semibold mb-2">
            🎤 Total Preaching Time
          </h2>
          <p className="text-2xl font-bold text-yellow-400">
            {totalPreachingTime} mins
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {/* Waking Time Line Chart (Smaller) */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-3 text-center">
            🟢 Waking Time (Day-wise)
          </h2>
          <div className="h-40">
            <Line
              data={{
                labels: dates,
                datasets: [
                  {
                    label: "Wake Up Time",
                    data: wakingTimes,
                    borderColor: "rgb(255, 205, 86)",
                    backgroundColor: "rgba(255, 205, 86, 0.2)",
                  },
                ],
              }}
              options={{ maintainAspectRatio: false }}
            />
          </div>
        </div>

        {/* Morning Programme Attendance Pie Chart (Smaller) */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-3 text-center">
            📊 Morning Programme Attendance
          </h2>
          <div className="h-40">
            <Doughnut
              data={{
                labels: ["Attended", "Missed"],
                datasets: [
                  {
                    data: [
                      morningProgrammeAttendance,
                      filteredData.length - morningProgrammeAttendance,
                    ],
                    backgroundColor: ["#4CAF50", "#FF5252"],
                  },
                ],
              }}
              options={{ maintainAspectRatio: false }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
