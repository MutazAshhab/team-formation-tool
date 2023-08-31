import { useTableStore } from '@/zustand/useTableStore';

export function DataTable() {
  const tableStore = useTableStore();

  if (!tableStore.data.length) return null;

  const headers = tableStore.data[0];
  const rows = tableStore.data.slice(1);

  return (
    <table>
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={index}>
            {row.map((cell, i) => (
              <td key={i}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
