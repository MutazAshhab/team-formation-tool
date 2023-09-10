import React, { useState } from 'react';

interface MinMaxSelectorProps {
  label: string;
  minValue: number | null;
  maxValue: number | null;
  onSelect: (min: number | null, max: number | null) => void;
}

export function MinMaxValues(props: MinMaxSelectorProps) {
  function handleMinChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value ? parseInt(e.target.value) : null;
    props.onSelect(value, props.maxValue);
  }

  function handleMaxChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value ? parseInt(e.target.value) : null;
    props.onSelect(props.minValue, value);
  }

  return (
    <div className="flex flex-col gap-4 p-2 border border-gray-200 rounded-lg w-[96%]">
      <div className="flex justify-between">
        <label className="block text-md font-medium text-gray-700">
          {props.label}
        </label>
      </div>
      <div className="flex flex-row gap-20 justify-between">
        <div className="flex flex-col w-full">
          <p className="pl-2">Minimum</p>
          <input
            type="number"
            value={props.minValue ?? ''}
            onChange={handleMinChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="flex flex-col w-full">
          <p className="pl-2">Maximum</p>
          <input
            type="number"
            value={props.maxValue ?? ''}
            onChange={handleMaxChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}
