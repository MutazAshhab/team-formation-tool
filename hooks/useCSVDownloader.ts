export function useCSVDownloader() {
  const downloadCSV = (data: string[][], fileName: string) => {
    // Convert string[][] to CSV string
    const csvString = data.map(row => row.join(',')).join('\n');

    // Create a Blob from the CSV string
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    // Build the link and add it to the DOM
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);

    // Download the file
    link.click();

    // Remove the link and revoke the Object URL
    link.remove();
    URL.revokeObjectURL(url);
  };

  return downloadCSV;
}
