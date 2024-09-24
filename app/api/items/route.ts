import { NextRequest, NextResponse } from "next/server";
import path from "node:path"
import { parseCSV, sortData } from "../utils";

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const filePath = path.resolve(process.cwd(), "data.csv");
        const csvData = await parseCSV(filePath);
        const { searchParams } = new URL(req.url);
        const sortBy = searchParams.get('sortBy');
        const sortOrder = searchParams.get('sortOrder');
        const sortedData = sortData(csvData, sortBy, sortOrder)
        return  NextResponse.json({ data: sortedData }, { status: 200})
    } catch (error) {
        console.error('Error: ', error);
        return NextResponse.json({ message: 'Internal server error'}, { status: 500 })
    }
}