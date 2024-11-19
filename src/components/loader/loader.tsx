"use client";
import "./loader.css";
const loader = () => {
  return (
    <div className='flex flex-col text-center w-full justify-center mt-10'>
      <p className='md:text-3xl text-2xk font-semibold text-gray-600 dark:text-gray-200'>
        Please wait while data is loading
      </p>
      <div className='center'>
        <div className='wave'></div>
        <div className='wave'></div>
        <div className='wave'></div>
        <div className='wave'></div>
        <div className='wave'></div>
        <div className='wave'></div>
        <div className='wave'></div>
        <div className='wave'></div>
        <div className='wave'></div>
        <div className='wave'></div>
      </div>
    </div>
  );
};

export default loader;
