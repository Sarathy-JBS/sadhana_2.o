import mongoose, { Schema, Document } from "mongoose";

export interface ISadhana extends Document {
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

const SadhanaSchema: Schema = new Schema({
  date: { type: String, required: true },
  wakeUpTime: { type: String, required: true },
  previousNightSleepTime: { type: String, required: true },
  chantingRounds: { type: Number, required: true },
  bookReadingDuration: { type: Number, required: true },
  morningProgramme: { type: Boolean, required: true },
  hearingDuration: { type: Number, required: true },
  readingDuration: { type: Number, required: true },
  preachingTitle: { type: String, required: false },
  preachingDuration: { type: Number, required: false },
  dayRestSleepDuration: { type: Number, required: false },
  comment: { type: String, required: false },
}, { timestamps: true });

export default mongoose.models.Sadhana || mongoose.model<ISadhana>("Sadhana", SadhanaSchema);
