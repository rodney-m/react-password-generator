import { useState } from "react";
import "./App.css";
import Checkbox from "./components/Checkbox";
import CopyIcon from "./assets/copy-icon.svg";
import Indicator from "./components/Indicator";

function App() {
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const [passwordRank, setPasswordRank] = useState({
    value: 0,
    text: "none",
  });
  const [passwordGenerator, setPasswordGenerator] = useState({
    length: 5,
    uppercase: false,
    lowercase: false,
    numbers: false,
    symbols: false,
  });

  const changeLowerCase = (val) => {
    setPasswordGenerator({
      ...passwordGenerator,
      lowercase: val,
    });
  };

  const changeNumbers = (val) => {
    setPasswordGenerator({
      ...passwordGenerator,
      numbers: val,
    });
  };

  const changeUpperCase = (val) => {
    setPasswordGenerator({
      ...passwordGenerator,
      uppercase: val,
    });
  };

  const changeSymbols = (val) => {
    setPasswordGenerator({
      ...passwordGenerator,
      symbols: val,
    });
  };

  const setPasswordLength = (val) => {
    setPasswordGenerator({
      ...passwordGenerator,
      length: val,
    });
  };

  const rankPassword = () => {
    let strength = 0;
    const length = password.length;
    const hasSymbols = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);

    strength += length >= 8 ? 1 : 0;
    strength += hasSymbols ? 1 : 0;
    strength += hasNumbers ? 1 : 0;
    strength += hasLowercase ? 1 : 0;
    strength += hasUppercase ? 1 : 0;

    let text = passwordRankText(strength);

    setPasswordRank({
      value: strength,
      text,
    });
  };

  const passwordRankText = (strength) => {
    switch (strength) {
      case 0:
        return "none";
      case 1:
      case 2:
        return "Weak";
      case 3:
      case 4:
        return "Medium";
      default:
        return "Strong";
    }
  };

  const generatePassword = () => {
    const numbersArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    const symbolsArray = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")"];
    const lowercaseArray = [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
    ];
    const uppercaseArray = lowercaseArray.map((letter) => letter.toUpperCase());

    const selectedArrays = [];

    if (passwordGenerator.numbers) {
      selectedArrays.push(numbersArray);
    }

    if (passwordGenerator.symbols) {
      selectedArrays.push(symbolsArray);
    }

    if (passwordGenerator.lowercase) {
      selectedArrays.push(lowercaseArray);
    }

    if (passwordGenerator.uppercase) {
      selectedArrays.push(uppercaseArray);
    }

    const mergedArray = selectedArrays.flat();

    const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);
    const characters = shuffleArray(mergedArray).slice(
      0,
      passwordGenerator.length
    );
    setPassword(characters.join(""));
    rankPassword();
  };

  return (
    <div className="application-container">
      <div className="component-wrapper">
        <div className="copy-input-wrapper">
          <input
            value={password}
            disabled
            placeholder="P4$5W0rD!"
            type="text"
            autoComplete="off"
          />
          <img
            src={CopyIcon}
            alt="copy"
            onClick={() => {
              navigator.clipboard.writeText(password);
              setCopied(true);
              setInterval(() => {
                setCopied(false);
              }, 3000);
            }}
          />
        </div>
        {copied ? <p className="copied">Copied!</p> : ""}

        <div className="input-variables-wrapper">
          <div className="character-length">
            <p>Character Length</p>
            <h3>{passwordGenerator.length}</h3>
          </div>

          <input
            type="range"
            min={5}
            max={20}
            defaultValue={passwordGenerator.length}
            onChange={(e) => setPasswordLength(e.target.value)}
          />
          <div className="checkboxes">
            <Checkbox
              label={"Include Uppercase Letters"}
              onChange={changeUpperCase}
              name={"uppercase"}
            />
            <Checkbox
              label={"Include Lowercase Letters"}
              onChange={changeLowerCase}
              name={"lowercase"}
            />
            <Checkbox
              label={"Include Numbers"}
              onChange={changeNumbers}
              name={"numbers"}
            />
            <Checkbox
              label={"Include Symbols"}
              onChange={changeSymbols}
              name={"symbols"}
            />
          </div>

          <div className="password-indicator">
            <div className="strength-level-wrapper">
              <p className="level-text">STRENGTH</p>
            </div>
            <div className="strength-level">
              <div>
                <p className="level-text">
                  {passwordRank.text === "none" ? "" : passwordRank.text}
                </p>
              </div>
              <div
                className={`indicators ${passwordRank.text
                  .replace(" ", "-")
                  .toLowerCase()}`}
              >
                <Indicator />
                <Indicator />
                <Indicator />
                <Indicator />
              </div>
            </div>
          </div>

          <button onClick={generatePassword}>Generate</button>
        </div>
      </div>
    </div>
  );
}

export default App;
