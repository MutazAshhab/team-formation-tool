import Papa from 'papaparse';
import * as XLSX from 'xlsx';

export const FileUploadLogic = {
  parseData,
};

async function parseData(file: File) {
  const fileType = file.name.split('.').pop();

  if (!fileType) {
    throw new Error('File type not exist');
  }

  switch (true) {
    case fileType === 'csv':
      return await parseCSV(file);
    case ['xlsx', 'xls'].includes(fileType):
      return await parseXLSX(file);
  }

  throw new Error(
    'Unsupported file type, please upload one of the following file extensions: .csv, .xlsx, .xls',
  );
}
function parseCSV(file: File): Promise<string[][] | null> {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      complete: result => {
        resolve(result.data as string[][]);
      },
      error: error => {
        reject(error);
      },
    });
  });
}

function parseXLSX(file: File): Promise<string[][] | null> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => {
      const data = e.target?.result;
      if (!data) {
        reject(new Error('No data found'));
        return;
      }

      const workbook = XLSX.read(data, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet, {
        header: 1,
      }) as string[][];
      resolve(parsedData);
    };
    reader.onerror = e => {
      reject(new Error(`File read failed: ${e.target?.error?.message}`));
    };
    reader.readAsBinaryString(file);
  });
}
