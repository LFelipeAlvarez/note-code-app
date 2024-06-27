import './select.css';

type OptionType = {
  id: string;
  name: string;
};

type SelectProps<T extends OptionType> = {
  options: T[];
  value: T;
  onChange: (value: T) => void;
};

const Select = <T extends OptionType>({ options, value, onChange }: SelectProps<T>) => {
  return (
    <select
      className='select'
      value={value.id}
      onChange={e => {
        const selectedOption = options.find(option => option.id === e.target.value);
        if (selectedOption) {
          onChange(selectedOption);
        }
      }}
    >
      {options.map(option => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </select>
  )
}

export default Select;