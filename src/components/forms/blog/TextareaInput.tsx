import React from "react";

interface Props {
  label?: string;
  value: string;
  onChange: (e: any) => void;
  placeholder?: string;
  error?: string | null;
  className?: string;
}

const TextareaInput: React.FC<Props> = ({
  label,
  className,
  value,
  onChange,
  placeholder,
  error,
}) => {
  return (
    <span className={`mb-4 w-full flex flex-col ${className}`}>
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className='shadow-gray-600 text-gray-900 dark:text-gray-300 resize-none dark:shadow-gray-700 shadow-md placeholder:text-gray-700 w-full bg-transparent placeholder:text-[12px] p-3 focus:border-none'
        rows={10} // Set the rows of the textarea to adjust height
      />
      {error && <p className='text-red-500 text-sm mt-1'>{error}</p>}
    </span>
  );
};

export default TextareaInput;
