import { useTableStore } from '@/zustand/useTableStore';

import { AlertBox } from '../AlertBoxes/AlertBox';

interface ColumnNameSelectorProps {
  label: string;
  onSelect: (value: string | null) => void;
  selectedValue: string | null;
}

export function ColumnNameSelector(props: ColumnNameSelectorProps) {
  const table = useTableStore();

  if (table.data.length === 0) {
    return (
      <AlertBox variant="error">
        Some how you are here whilst having 0 data
      </AlertBox>
    );
  }

  function handleSelectChange(value: string) {
    let valueToSet: string | null = value;

    if (value === '') {
      valueToSet = null;
    }

    props.onSelect(valueToSet);
  }

  const headers = table.data[0];

  return (
    <div className="p-2 border border-gray-200 rounded-lg w-[96%]">
      <label className="block text-md font-medium text-gray-700">
        {props.label}
      </label>
      <select
        value={props.selectedValue ?? ''}
        onChange={e => handleSelectChange(e.target.value)}
        className="mt-2 w-full p-3 border border-gray-300 rounded-lg"
      >
        <option value="" className="text-gray-400">
          Select the respective header
        </option>
        {headers.map(header => (
          <option key={header} value={header} className="text-gray-700">
            {header}
          </option>
        ))}
      </select>
    </div>
  );
}
