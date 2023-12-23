
type Option = {
  value: string;
  label: string;
}

type DropdownProps = {
  options: Option[];
  selectedOption: string;
  onSelect: (value: string) => void;
}

export default function Dropdown ({ options, selectedOption, onSelect }: DropdownProps) {
  return (
    <select
      value={selectedOption}
      onChange={(e) => onSelect(e.target.value)}
      className="block mx-auto appearance-none bg-white border 
      border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 
      rounded-md shadow leading-tight focus:outline-none
      focus:shadow-outline-blue focus:border-blue-300 mb-4"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value} disabled={option.value === 'select_order'}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

