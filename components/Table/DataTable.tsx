import { useTableStore } from '@/zustand/useTableStore';

export function DataTable() {
  const tableStore = useTableStore();

  if (!tableStore.data.length) return null;

  const headers = tableStore.data[0];
  const rows = tableStore.data.slice(1);

  return (
    <table className="min-w-full bg-white border border-gray-300 text-left ">
      <thead className="bg-gray-100">
        <tr>
          {headers.map((header, index) => (
            <th
              className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 text-gray-500 tracking-wider"
              key={index}
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
