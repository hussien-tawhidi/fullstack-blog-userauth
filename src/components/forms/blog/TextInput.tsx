interface Props {
  label?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  error?: string | null;
  id?: string;
  className?: string;
}

const TextInput: React.FC<Props> = ({
  label,
  value,
  onChange,
  placeholder,
  error,
  id,className
}) => {
  return (
    <span className={`mb-4 w-full ${className}`}>
      {/* <label className='block mb-2 text-sm'>{label}</label> */}
      <input
        type='text'
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className='placeholder:text-gray-700 text-gray-800 dark:text-gray-300 dark:shadow-gray-700 shadow-md w-full bg-transparent placeholder:text-[12px] p-3 focus:border-none'
      />
      {error && <p className='text-red-500 text-sm mt-1'>{error}</p>}
    </span>
  );
};

export default TextInput;
