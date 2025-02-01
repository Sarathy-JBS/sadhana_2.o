import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import SadhanaModel from "@/models/Sadhana";

// ✅ POST Request: Save Sadhana Data
export async function POST(request: Request) {
  try {
    await dbConnect();
    const data = await request.json();
    const sadhana = await SadhanaModel.create(data);
    return NextResponse.json({ success: true, data: sadhana });
  } catch (error) {
    console.error("Error saving Sadhana:", error);
    return NextResponse.json({ success: false, error: "Failed to save data" }, { status: 500 });
  }
}

// ✅ GET Request: Fetch Sadhana Data
export async function GET() {
  try {
    await dbConnect();
    const sadhanas = await SadhanaModel.find({}).sort({ date: -1 }).limit(10); // Fetch last 10 days
    return NextResponse.json({ success: true, data: sadhanas });
  } catch (error) {
    console.error("Error fetching Sadhana:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch data" }, { status: 500 });
  }
}
