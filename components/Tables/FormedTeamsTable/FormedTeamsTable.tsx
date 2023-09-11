import React from 'react';

import { useTableStore } from '@/zustand/useTableStore';

export function FormedTeamsTable() {
  const tableStore = useTableStore();

  if (!tableStore.formedTeams.length) return null;

  const headers = tableStore.formedTeams[0];
  const rows = tableStore.formedTeams.slice(1);

  let currentTeamNumber = '1';
  let currentBgColor = 'bg-white';

  return (
    <table className="min-w-full bg-white text-left">
      <thead className="bg-gray-200">
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
        {rows.map((row, index) => {
          const teamNumber = row[headers.indexOf('Team number')]; // Assuming 'team number' is one of the headers

          if (currentTeamNumber !== teamNumber) {
            currentTeamNumber = teamNumber;
            currentBgColor =
              currentBgColor === 'bg-white' ? 'bg-gray-100' : 'bg-white';
          }

          return (
            <tr key={index} className={currentBgColor}>
              {row.map((cell, i) => (
                <td
                  key={i}
                  className="py-2 px-4 border-b border-gray-300 text-gray-800"
                >
                  {cell}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
