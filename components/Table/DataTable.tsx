import { useTableStore } from '@/zustand/useTableStore';

export function DataTable() {
  const tableStore = useTableStore();

  if (!tableStore.data.length) return null;

  const headers = tableStore.data[0];
  const rows = tableStore.data.slice(1);

  return (
    <table className="min-w-full bg-white border border-gray-300">
      <thead className="bg-gray-100">
        <tr>
          {headers.map((header, index) => (
            <th
              key={index}
              className="py-2 px-4 border-b border-gray-300 text-left text-sm leading-4 text-gray-500 uppercase tracking-wider"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr
            key={index}
            className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
          >
            {row.map((cell, i) => (
              <td
                key={i}
                className="py-2 px-4 border-b border-gray-300 text-gray-800"
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
