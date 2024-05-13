import { useState } from 'react';

interface CustomDropDownProps {
  options: string[];
  handOption: (option: string) => void;
  text: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const CustomDropDown = ({options, handOption, text, isOpen, setIsOpen}: CustomDropDownProps) => {


  return (
    <div className="mb-2">
      <button onClick={() => setIsOpen(!isOpen)} className="text-white
        bg-green-700 hover:bg-green-800 focus:ring-4 
        focus:outline-none focus:ring-green-300 font-medium 
        rounded-lg text-sm px-5 py-2.5 text-center inline-flex 
        items-center dark:bg-green-600 dark:hover:bg-green-700
        dark:focus:ring-green-800 " type="button">
        {text}
        <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" 
        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
        </svg>
      </button>

      {isOpen && (
        <div className="absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            {options.map((option) => (
              <li key={option} onClick={() => handOption(option)}>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  {option}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
