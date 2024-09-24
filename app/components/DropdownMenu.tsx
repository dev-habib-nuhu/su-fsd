import React from 'react'

type Option = {
    label: string,
    value: string
}

interface DropdownMenuProps {
    options: Option [],
    selectedOption: string,
    onSelect: (value: string) => void
}

const DropdownMenu:React.FC<DropdownMenuProps> = ({ selectedOption, options, onSelect}) => {
  return (
    <select
    onChange={(e)=> onSelect(e.target.value)}
    value={selectedOption}
    className='block mx-auto bg-white border shadow px-4 py-2 pr-8 mb-4'>
        {options?.map(({ label, value })=> (
            <option key={value} 
            value={value} 
            disabled={value === "select_order"}>
                {label}
            </option>
        ))}
    </select>
  )
}

export default DropdownMenu