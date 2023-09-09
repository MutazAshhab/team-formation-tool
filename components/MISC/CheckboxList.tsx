import React from 'react';

interface CheckboxListProps {
  label: string;
  items: string[];
  selectedItems: string[];
  setSelectedItems: (selected: string[]) => void;
}

export function CheckboxList(props: CheckboxListProps) {
  const toggleItem = (item: string) => {
    if (props.selectedItems.includes(item)) {
      props.setSelectedItems(props.selectedItems.filter(i => i !== item));
    } else {
      props.setSelectedItems([...props.selectedItems, item]);
    }
  };

  return (
    <div className="flex flex-col flex-wrap gap-4 p-2 rounded-lg w-[96%] border border-gray-200">
      <div>
        <label className="block text-md font-medium text-gray-700">
          {props.label}
        </label>
      </div>
      <div className="flex flex-row flex-wrap gap-4 w-[96%] max-h-60 overflow-y-auto">
        {props.items.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-row items-center pl-4 gap-2 border border-gray-300 rounded-lg"
          >
            <input
              id={`bordered-checkbox-${idx}`}
              type="checkbox"
              value={item}
              checked={props.selectedItems.includes(item)}
              className="text-blue-600 bg-gray-100 border-gray-300 rounded select-none"
              onChange={() => toggleItem(item)}
            />
            <label
              htmlFor={`bordered-checkbox-${idx}`}
              className="w-full py-2 text-sm font-medium text-gray-700 pr-4 cursor-pointer"
            >
              {item}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
