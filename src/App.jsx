import { useState, useEffect, useRef } from "react";

import "./App.css";

function App() {
  const [password, setPassword] = useState("");
  const [passLength, setPassLength] = useState(8);
  const [isNumber, setIsNumber] = useState(false);
  const [isChar, setIsChar] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    const generatePassword = () => {
      let pass = "";
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

      if (isNumber) str += "0123456789";
      if (isChar) str += "!@#$%^&*?<>";

      for (let i = 0; i < passLength; i++) {
        let index = Math.floor(Math.random() * (str.length + 1));

        pass += str.charAt(index);
        console.log(index);
      }
      setPassword(pass);
    };

    generatePassword();
  }, [passLength, isNumber, isChar]);

  const textCopied = () => {
    inputRef.current.select();
    inputRef.current.setSelectionRange(0, 99999); //for mobile devices.

    navigator.clipboard.writeText(inputRef.current.value);
  };

  return (
    <>
      <div
        className="flex flex-col gap-11 justify-center items-center font-bold"
        style={{ fontFamily: "handjet" }}
      >
        {" "}
        <div className="bg-emerald-950 flex justify-center h-[80px] items-center rounded-lg shadow-lg w-full bg-opacity-90">
          {" "}
          <span className="text-lime-400 font-extrabold text-3xl handjet-head">
            Password Generator
          </span>
        </div>
        <div className="flex flex-col gap-6 p-4 justify-center items-center border border-emerald-500 rounded-2xl bg-opacity-75 shadow-lg bg-white w-150 text-xl h-[300px]">
          <div className="flex flex-col md:flex-row gap-6">
            <label>
              Generated Password:{" "}
              <input
                type="text"
                className="border border-emerald-950 rounded-3xl p-1 font-light"
                style={{ fontFamily: "'M Plus 1 Code', monospace" }}
                value={password}
                ref={inputRef}
                readOnly
              ></input>
            </label>
            <button
              className="rounded-3xl bg-emerald-950 text-white w-[120px] justify-center items-center h-[40px] hover:bg-lime-400 md:ml-0 ml-[138px]"
              onClick={textCopied}
            >
              Copy
            </button>
          </div>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <label>
              Length: {passLength}{" "}
              <input
                type="range"
                className="border bg-emerald-950 rounded range-slider"
                min={8}
                max={20}
                value={passLength}
                onChange={(e) => setPassLength(e.target.value)}
              ></input>
            </label>
            <label>
              Numbers:{" "}
              <input
                type="checkbox"
                className="border accent-emerald-950 rounded"
                onClick={() => setIsNumber(!isNumber)}
              ></input>
            </label>
            <label>
              Character:{" "}
              <input
                type="checkbox"
                className="border accent-emerald-950 rounded"
                onClick={() => setIsChar(!isChar)}
              ></input>
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
