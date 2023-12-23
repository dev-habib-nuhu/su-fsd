import fs from 'fs';
import csv from 'csv-parser';
import path from 'node:path';
import { NextRequest, NextResponse } from 'next/server';

const csvFilePath = path.join(process.cwd(), "data.csv");

export async function GET(request: NextRequest, response:NextResponse) {
    try {
        const results = await new Promise((resolve, reject) => {
            const data:Item[] = [];
            fs.createReadStream(csvFilePath)
                .pipe(csv({ separator: ';', headers: ['A', 'B'] }))
                .on('data', (row) => {
                    data.push({
                        created_at: row.A,
                        filename: row.B
                    });
                })
                .on('end', () => {
                    resolve(data);
                })
                .on('error', (error) => {
                    reject(error);
                });
        });

        return NextResponse.json({ data: results });
    } catch (error) {
        console.error('Error processing CSV:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
