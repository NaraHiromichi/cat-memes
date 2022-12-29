import React, { useState } from "react";
import InputField from "./components/InputField";
import Annonation from "./assests/annonation.png";

function App() {
  const [toggleDropDown, setToggleDropDown] = useState(false);
  const [activeType, setActiveType] = useState("");
  const [inputText, setInputText] = useState("");
  const [photo, setPhoto] = useState("");
  //functions

  const handleInputText = (e) => {
    setInputText(e.target.value);
  };
  const handleChooseTypes = (e) => {
    setActiveType(e.target.innerText);
    setToggleDropDown(false);
  };
  const handleDropDowns = (e) => {
    setToggleDropDown(!toggleDropDown);
  };
  const handleGenerate = (inputText, activeType) => {
    if ((inputText === "" || inputText === " ") && activeType === "") {
      fetch("https://cataas.com/cat?json=true")
        .then((response) => response.json())
        .then((data) => setPhoto(data.url))
        .catch((err) => console.log(err));
    } else if (inputText !== "" && activeType !== "") {
      fetch(`https://cataas.com/cat/${activeType}/says/${inputText}?json=true`)
        .then((response) => response.json())
        .then((data) => setPhoto(data.url))
        .catch((err) => console.log(err));
    } else if (inputText !== "" && activeType === "") {
      fetch(`https://cataas.com/cat/says/${inputText}?json=true`)
        .then((response) => response.json())
        .then((data) => setPhoto(data.url))
        .catch((err) => console.log(err));
    } else if ((inputText === "" || inputText === " ") && activeType !== "") {
      fetch(`https://cataas.com/cat/${activeType}?json=true`)
        .then((response) => response.json())
        .then((data) => setPhoto(data.url))
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="font-display text-white">
      <h2 className="w-full font-20 py-10 px-8">Random Cats Memes</h2>
      <div className="block md:flex">
        <InputField
          toggleDropDown={toggleDropDown}
          activeType={activeType}
          inputText={inputText}
          handleInputText={handleInputText}
          handleChooseTypes={handleChooseTypes}
          handleDropDowns={handleDropDowns}
          handleGenerate={handleGenerate}
        />
        <div className="w-full px-8 mt-10 md:mt-0 flex flex-col justify-center items-center md:translate-y-[200px]">
          {photo === "" ? (
            <img
              className="w-full max-w-[430px] max-h-[430px] rounded-lg"
              src={Annonation}
              alt="annonation"
            />
          ) : (
            <img
              className="w-full max-w-[430px] max-h-[430px] rounded-lg"
              src={`https://cataas.com${photo}`}
              alt="annonation"
            />
          )}

          {photo !== "" && (
            <a href={`https://cataas.com${photo}`} download="cat.png">
              <button
                className="w-full max-w-[430px] bg-[#2c2b2b] h-[50px] rounded-[12px] my-10"
              >
                Download
              </button>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
