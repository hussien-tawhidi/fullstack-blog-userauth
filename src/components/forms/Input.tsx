interface FormFieldProps {
  label?: string;
  htmlFor: string;
  error?: any;
  register: any; // Register function for spreading onto the input
  placeholder: string;
  type: string;
}

const Input = ({
  htmlFor,
  error,
  register,
  placeholder,
  type,
}: FormFieldProps) => (
  <div className='mb-4'>
    <input
      id={htmlFor}
      {...register}
      placeholder={placeholder}
      type={type}
      className='shadow-gray-300 dark:shadow-gray-700 shadow-md w-full max-w-sm bg-transparent placeholder:text-[12px] p-3 focus:border-none'
    />
    {error && <p className='text-red-500 text-sm'>{error}</p>}
  </div>
);

export default Input;
