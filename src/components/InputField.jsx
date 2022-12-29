import React, { useEffect, useState } from "react";
import DropDown from "./../assests/drop-down-arrow.png";

const InputField = ({
  toggleDropDown,
  activeType,
  inputText,
  handleInputText,
  handleChooseTypes,
  handleDropDowns,
  handleGenerate,
}) => {
  const [types, setTypes] = useState();
  useEffect(() => {
    fetch("https://cataas.com/api/tags")
      .then((response) => response.json())
      .then((data) => setTypes(data));
  }, []);
  return (
    <div className="w-full inline-flex flex-col px-8 md:translate-y-[200px]">
      <label>Add Text (optional)</label>
      <input
        type="text"
        value={inputText}
        onChange={(e) => handleInputText(e)}
        className="bg-[#464646] border-none rounded-[8px] h-[50px] mt-5 mb-10 pl-3 md:max-w-[40vw]"
      />
      <label>Type (optional)</label>
      <div
        className={`bg-[#464646] border-none md:max-w-[40vw] rounded-[8px] ${
          toggleDropDown ? "md:max-w-[40vw]" : "h-[50px]"
        } overflow-hidden mt-5 mb-10 border-white`}
      >
        <div className="w-full h-[50px] flex justify-between items-center pr-3">
          <span className="pl-4">{activeType}</span>
          <img
            onClick={() => handleDropDowns(!toggleDropDown)}
            src={DropDown}
            alt="dropdown"
            className="w-[16px] h-[15px]"
          />
        </div>
        {types === undefined ? (
          <p>Loading...</p>
        ) : (
          <div
            className={`w-full h-full tags ${
              toggleDropDown
                ? "h-[60vh] overflow-scroll overflow-x-hidden"
                : "h-[40px] overflow-hidden"
            }`}
          >
            {types.map((type, index) => {
              return (
                <div
                  onClick={(e) => handleChooseTypes(e)}
                  className="p-2 border-b-2 cursor-pointer"
                >
                  {type}
                </div>
              );
            })}
          </div>
        )}
      </div>
      <button
        onClick={() => handleGenerate(inputText, activeType)}
        className="w-full md:max-w-[40vw] mt-5 mb-5 bg-[#128D9E] h-[50px] rounded-[12px]"
      >
        Generate
      </button>
    </div>
  );
};

export default InputField;
