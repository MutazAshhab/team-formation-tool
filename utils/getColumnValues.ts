export function getUniqueColumnValues(
  data: any[][],
  header: string | null,
): any[] {
  const columnIndex = data[0].indexOf(header);

  if (columnIndex === -1) {
    return [];
  }

  const nonUniqueValues = data.slice(1).map(row => row[columnIndex]);

  return Array.from(new Set(nonUniqueValues));
}
