/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Sadhana {
  _id: string;
  date: string;
  wakeUpTime: string;
  previousNightSleepTime: string;
  chantingRounds: number;
  bookReadingDuration: number;
  morningProgramme: boolean;
  hearingDuration: number;
  readingDuration: number;
  preachingTitle: string;
  preachingDuration: number;
  dayRestSleepDuration: number;
  comment: string;
}

export default function SadhanaTable() {
  const [sadhanaData, setSadhanaData] = useState<Sadhana[]>([]);

  useEffect(() => {
    fetch("/api/sadhana")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setSadhanaData(data.data);
        }
      })
      .catch((error) => console.error("Error fetching Sadhana data:", error));
  }, []);

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">Sadhana Records</h1>

      {/* ✅ Navigation Buttons */}
      <div className="flex justify-center gap-4 mb-6">
        <Link href="/">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            📋 Back to Form
          </button>
        </Link>
        <Link href="/dashboard">
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            📊 View Dashboard
          </button>
        </Link>
      </div>

      {/* ✅ Table Display */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 rounded-lg">
          <thead>
            <tr className="bg-gray-700 text-white">
              <th className="p-3">Date</th>
              <th className="p-3">Wake Up Time</th>
              <th className="p-3">Sleep Time</th>
              <th className="p-3">Rounds</th>
              <th className="p-3">Reading (min)</th>
              <th className="p-3">Hearing (min)</th>
              <th className="p-3">Morning Program</th>
              <th className="p-3">Preaching</th>
              <th className="p-3">Comments</th>
            </tr>
          </thead>
          <tbody>
            {sadhanaData.length > 0 ? (
              sadhanaData.map((sadhana) => (
                <tr key={sadhana._id} className="border-t border-gray-700">
                  <td className="p-3 text-center">{sadhana.date}</td>
                  <td className="p-3 text-center">{sadhana.wakeUpTime}</td>
                  <td className="p-3 text-center">
                    {sadhana.previousNightSleepTime}
                  </td>
                  <td className="p-3 text-center">{sadhana.chantingRounds}</td>
                  <td className="p-3 text-center">
                    {sadhana.bookReadingDuration}
                  </td>
                  <td className="p-3 text-center">{sadhana.hearingDuration}</td>
                  <td className="p-3 text-center">
                    {sadhana.morningProgramme ? "✅" : "❌"}
                  </td>
                  <td className="p-3 text-center">
                    {sadhana.preachingTitle
                      ? `${sadhana.preachingTitle} (${sadhana.preachingDuration} min)`
                      : "-"}
                  </td>
                  <td className="p-3 text-center">{sadhana.comment || "-"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="p-4 text-center text-gray-400">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
