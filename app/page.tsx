"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import Link from "next/link";

export default function Home() {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0], // Default: Today
    wakeUpTime: "",
    previousNightSleepTime: "",
    chantingRounds: 0,
    bookReadingDuration: 0,
    morningProgramme: false,
    hearingDuration: 0,
    readingDuration: 0,
    preachingTitle: "",
    preachingDuration: 0,
    dayRestSleepDuration: 0,
    comment: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "number" ? Number(value) : value,
    });
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      morningProgramme: e.target.checked,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/sadhana", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Sadhana data submitted successfully!");
        setFormData({
          date: new Date().toISOString().split("T")[0],
          wakeUpTime: "",
          previousNightSleepTime: "",
          chantingRounds: 0,
          bookReadingDuration: 0,
          morningProgramme: false,
          hearingDuration: 0,
          readingDuration: 0,
          preachingTitle: "",
          preachingDuration: 0,
          dayRestSleepDuration: 0,
          comment: "",
        });
      } else {
        alert("Failed to submit data.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while submitting.");
    }
  };

  return (
    <div className="p-8 bg-gray-900 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold text-white mb-6">Sadhana Input Form</h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-6 bg-gray-800 text-white p-6 shadow-lg rounded-lg max-w-3xl w-full"
      >
        <label className="block">
          Date:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="border p-2 w-full rounded bg-gray-700 text-white"
          />
        </label>

        <label className="block">
          Wake Up Time:
          <input
            type="time"
            name="wakeUpTime"
            value={formData.wakeUpTime}
            onChange={handleChange}
            className="border p-2 w-full rounded bg-gray-700 text-white"
          />
        </label>

        <label className="block">
          Previous Night Sleep Time:
          <input
            type="time"
            name="previousNightSleepTime"
            value={formData.previousNightSleepTime}
            onChange={handleChange}
            className="border p-2 w-full rounded bg-gray-700 text-white"
          />
        </label>

        <label className="block">
          Chanting Rounds:
          <input
            type="number"
            name="chantingRounds"
            value={formData.chantingRounds}
            onChange={handleChange}
            className="border p-2 w-full rounded bg-gray-700 text-white"
          />
        </label>

        <label className="block">
          Book Reading Duration (min):
          <input
            type="number"
            name="bookReadingDuration"
            value={formData.bookReadingDuration}
            onChange={handleChange}
            className="border p-2 w-full rounded bg-gray-700 text-white"
          />
        </label>

        <label className="block-flex items-center">
          <input
            type="checkbox"
            checked={formData.morningProgramme}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          Attended Morning Programme?
        </label>

        <label className="block">
          Hearing Duration (min):
          <input
            type="number"
            name="hearingDuration"
            value={formData.hearingDuration}
            onChange={handleChange}
            className="border p-2 w-full rounded bg-gray-700 text-white"
          />
        </label>

        <label className="block">
          Reading Duration (min):
          <input
            type="number"
            name="readingDuration"
            value={formData.readingDuration}
            onChange={handleChange}
            className="border p-2 w-full rounded bg-gray-700 text-white"
          />
        </label>

        <label className="block">
          Preaching Title:
          <input
            type="text"
            name="preachingTitle"
            value={formData.preachingTitle}
            onChange={handleChange}
            className="border p-2 w-full rounded bg-gray-700 text-white"
          />
        </label>

        <label className="block">
          Preaching Duration (min):
          <input
            type="number"
            name="preachingDuration"
            value={formData.preachingDuration}
            onChange={handleChange}
            className="border p-2 w-full rounded bg-gray-700 text-white"
          />
        </label>

        <label className="block">
          Day Rest Sleep Duration (min):
          <input
            type="number"
            name="dayRestSleepDuration"
            value={formData.dayRestSleepDuration}
            onChange={handleChange}
            className="border p-2 w-full rounded bg-gray-700 text-white"
          />
        </label>

        <label className="block col-span-2">
          Comment:
          <textarea
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            className="border p-2 w-full rounded bg-gray-700 text-white"
          ></textarea>
        </label>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded col-span-2 hover:bg-blue-600"
        >
          Submit
        </button>
      </form>

      {/* ✅ Navigation Buttons */}
      <div className="flex justify-center gap-4 mt-6">
        <Link href="/sadhana">
          <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
            📄 View Sadhana Records
          </button>
        </Link>
        <Link href="/dashboard">
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            📊 Go to Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
}
