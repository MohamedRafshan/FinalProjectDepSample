'use client'


import * as XLSX from 'xlsx';

export default function ExportReport(salesData =[]){


    // Convert sales data to worksheet
    const ws = XLSX.utils.json_to_sheet(salesData);

    // Create a new workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sales Report');

    // Generate a buffer
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

    // Create a blob from the buffer
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

    // Create a link element
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;

    // Define the file name
    a.download = 'sales_report.xlsx';

    // Trigger the download
    document.body.appendChild(a);
    a.click();

    // Clean up
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };


