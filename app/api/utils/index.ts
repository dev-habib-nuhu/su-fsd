import fs from "node:fs";
import csv from "csv-parser";

export const parseCSV = async (filePath: string): Promise<Item []> => {
    const result: Item [] = []
    return new Promise((resolve, reject)=> {
        fs.createReadStream(filePath)
        .pipe(csv({separator:';', headers:['created_at','filename']}))
        .on('data',(row)=> {
            result.push({
                created_at: row['created_at'],
                filename: row['filename']
            })
        })
        .on('end', ()=> {
            resolve(result)
        })
        .on('error', (error)=> {
            reject(error);
        })
    })
}


export const sortData = (data: Item [], sortBy: string | null, sortOrder: string | null) => {
    if (!sortBy && !sortOrder) return data;
    if (sortBy === "created_at") {
        if(sortOrder === "asc") {
            data.sort((a,b)=> new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
        }
    } else if (sortBy === "filename") {
        if(sortOrder === "asc") {
            data.sort((a, b) => {
                const numA = parseInt(a.filename.replace(/\D/g, ''), 10) || 0;
                const numB = parseInt(b.filename.replace(/\D/g, ''), 10) || 0;
                return numA - numB || a.filename.localeCompare(b.filename);
              });
        } else if (sortOrder === "desc") {
            data.sort((a, b) => {
                const numA = parseInt(a.filename.replace(/\D/g, ''), 10) || 0;
                const numB = parseInt(b.filename.replace(/\D/g, ''), 10) || 0;
                return numB - numA || b.filename.localeCompare(a.filename);
              });
        }
    } else {
        throw new Error('Invalid sort field');
    }
    return data;
}

