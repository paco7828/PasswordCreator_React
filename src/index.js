import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./style.css";

function ButtonCreation({ content, onClickCallback }) {
    return (
        <>
            <br />
            <button onClick={onClickCallback}>{content}</button>
        </>
    );
}

function App() {
    const [lengthInpValue, setLengthInpValue] = useState(""); // length input's value
    const [disabledInputType, setDisabledInputType] = useState("password"); // disabled input's type
    const [generatedPassword, setGeneratedPassword] = useState(""); // Generated password
    const [toastMsg, setToastMsg] = useState("");
    const [displayValue, setDisplayValue] = useState("none");
    const [checkboxes, setCheckboxes] = useState({
        numbers: false,
        special_characters: false,
        uppercase_letters: false
    });

    const passwordChars = [
        "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
        "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
    ]; // Basic characters to create a random password
    const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const specialCharacters = ["!", "@", "#", "$", "%", "&", "*", "-", "_", "=", "+", "?"]; // Special characters
    const upperCaseLetters = [
        "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
        "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
    ];

    const handleChange = (e) => {
        setLengthInpValue(e.target.value);
    }

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setCheckboxes(prevState => ({
            ...prevState,
            [name]: checked
        }));
    }

    const handleGenerate = () => {
        if (lengthInpValue === "") {
            setDisplayValue("block")
            setToastMsg("You forgot to set your desired length!");
            setTimeout(() => {
                setDisplayValue("none");
            }, 3000);
        }

        let availableChars = [...passwordChars];

        if (checkboxes.numbers) {
            availableChars = availableChars.concat(numbers);
        }
        if (checkboxes.special_characters) {
            availableChars = availableChars.concat(specialCharacters);
        }
        if (checkboxes.uppercase_letters) {
            availableChars = availableChars.concat(upperCaseLetters);
        }

        let newPasswordArr = [];
        for (let i = 0; i < lengthInpValue; i++) {
            const randomNumber = Math.floor(Math.random() * availableChars.length);
            newPasswordArr.push(availableChars[randomNumber]);
        }
        setGeneratedPassword(newPasswordArr.join(''));
    }

    const handleReveal = () => {
        if (generatedPassword === "") {
            setDisplayValue("block")
            setToastMsg("Nothing to reveal!");
            setTimeout(() => {
                setDisplayValue("none");
            }, 3000);
        }
        setDisabledInputType(prevType => prevType === "password" ? "text" : "password");
    }

    const handleCopy = () => {
        if (generatedPassword.length === 0) {
            setDisplayValue("block")
            setToastMsg("Nothing to copy!");
            setTimeout(() => {
                setDisplayValue("none");
            }, 3000);
        }
        else {
            setDisplayValue("block")
            setToastMsg("Password copied successfully!");
            setTimeout(() => {
                setDisplayValue("none");
            }, 3000);
            navigator.clipboard.writeText(generatedPassword);
        }
    }

    const buttonContents = ["Reveal", "Generate", "Copy"];
    const buttonFuncs = [handleReveal, handleGenerate, handleCopy];

    return (
        <div id="container">
            <div style={{ display: displayValue }} id="toast">{toastMsg}</div>
            <h1>Your password:</h1>
            <br />
            <input className="input" id="password" type={disabledInputType} disabled value={generatedPassword} />
            <br />
            <input className="input" id="passwordLength" type="number" min={8} max={40} placeholder="Type in your desired length of password" onChange={handleChange} />
            {
                buttonContents.map((content, index) => <ButtonCreation key={index} content={content} onClickCallback={buttonFuncs[index]} />)
            }
            <h2>Numbers included?</h2>
            <label className="container">
                <input name="numbers" id="checkbox1" type="checkbox" onChange={handleCheckboxChange} checked={checkboxes.numbers} />
                <div className="checkmark"></div>
            </label>

            <h2>Special characters?</h2>
            <label className="container">
                <input name="special_characters" id="checkbox2" type="checkbox" onChange={handleCheckboxChange} checked={checkboxes.special_characters} />
                <div className="checkmark"></div>
            </label>

            <h2>Uppercase letters?</h2>
            <label className="container">
                <input name="uppercase_letters" id="checkbox3" type="checkbox" onChange={handleCheckboxChange} checked={checkboxes.uppercase_letters} />
                <div className="checkmark"></div>
            </label>
        </div>
    );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
