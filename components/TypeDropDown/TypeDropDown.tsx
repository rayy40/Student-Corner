"use client";

import { useRef, useState } from "react";
import useOutsideClick from "@/hooks/useOutsideClick";
import { FaCaretDown } from "react-icons/fa6";
import { useQuizStore } from "@/context/store";

const TypeDropDown = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const { type: selectedType, setType: setSelectedType } = useQuizStore();
  const types = ["By Topic", "By Paragraph"];

  useOutsideClick(ref, () => {
    setIsDropDownOpen(false);
  });

  return (
    <div className="w-[130px] py-1.5 px-2 relative rounded-md bg-light-gray">
      <p
        className="text-[0.925rem] flex items-center justify-between gap-1 tracking-tight cursor-pointer"
        onClick={() => setIsDropDownOpen((prev) => !prev)}
      >
        {selectedType} <FaCaretDown color={"gray"} />
      </p>
      {isDropDownOpen && (
        <div
          ref={ref}
          className="z-10 absolute top-10 right-0 rounded-md bg-light-gray shadow-[0_0_6px_-2px_rgba(0,0,0,0.65)] "
        >
          <ul>
            {types
              .filter((type) => type !== selectedType)
              .map((type, index) => (
                <li
                  key={index}
                  className="w-[130px] whitespace-nowrap first:rounded-t-md last:rounded-b-md text-[0.925rem] p-2 border-dark-gray [&:not(:last-child)]:border-b hover:bg-hover-light-gray cursor-pointer"
                  onClick={() => {
                    setSelectedType(type), setIsDropDownOpen(false);
                  }}
                >
                  {type}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TypeDropDown;
