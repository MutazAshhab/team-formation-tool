import React from 'react';

import { useAlgorithmStore } from '@/zustand/useAlgorithmStore';

export function TeamSizeInput() {
  const algorithmStore = useAlgorithmStore();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    algorithmStore.setTeamSize(value);
  };

  return (
    <div className="p-2 border rounded">
      <div className="flex flex-col">
        <label
          htmlFor="teamSize"
          className="block mb-2 text-md font-medium text-gray-700"
        >
          Enter your desired team size:
        </label>
        <input
          type="number"
          id="teamSize"
          name="teamSize"
          className="border-2 border-gray-300 p-2 rounded-md"
          onChange={handleInputChange}
          value={algorithmStore.teamSize ?? ''}
        />
        {algorithmStore.teamSize !== null && (
          <p className="mt-2 text-sm text-gray-600">
            Your desired team size is {algorithmStore.teamSize}.
          </p>
        )}
      </div>
    </div>
  );
}
