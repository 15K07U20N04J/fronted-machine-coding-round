import { useEffect, useState } from 'react'
import './App.css'
import usePasswordGenerator from './hooks/use-password-generator';

function App() {
  const [length, setLength] = useState(0)
  const [checkboxData, setCheckboxData] = useState([
    { title: "Include Uppercase Letters", state: false },
    { title: "Include Lowercase Letters", state: false },
    { title: "Include Numbers", state: false },
    { title: "Include Symbols", state: false }
  ]);
  const [copied, setCopied] = useState(false);

  function getPasswordStrength() {
    if (length >= 12) {
      return "Hard";
    } else if (length >= 8) {
      return "Medium"
    } else {
      return "Low"
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  function handlePasswordLength(e) {
    setLength(e.target.value)
  }

  function handleCheckboxData(i) {
    debugger
    const updatedCheckboxData = [...checkboxData];
    debugger
    updatedCheckboxData[i].state = !updatedCheckboxData[i].state;
    setCheckboxData(updatedCheckboxData);
  }

  const { password, errorMessage, generatePassword } = usePasswordGenerator()

  return (
    <div className='App'>
      <div className='box'>
        <div className='password-container'>
          <div>
            {password}
          </div>
          <div>
            <button>
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>

        <div className='character-cnt-container'>
          <span>Character Length</span>
          <span>{length}</span>
        </div>

        <div className='input-container'>
          <input type="range" min="0" max="30" value={length} onChange={handlePasswordLength} step="1" />
        </div>

        <div className='checkbox-container'>
          {
            checkboxData.map((data, index) => {
              return (
                <div key={index}>
                  <input id="uppercase" type='checkbox' value={data.state} onChange={() => handleCheckboxData(index)} />
                  <span>{data.title}</span>
                </div>
              )
            })
          }
        </div>

        <div className='strength-container'>
          <span>Strength : </span>
          <span>{getPasswordStrength()}</span>
        </div>
        {errorMessage && <div className="errorMessage">{errorMessage}</div>}
        <div className='button-container'>
          <button onClick={() => {generatePassword(checkboxData, length)}}>Generator Password</button>
        </div>
      </div>
    </div>
  )
}

export default App
