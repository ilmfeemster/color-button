import { useState } from 'react'
import './App.css'

function App() {
  const [buttonColor, setButtonColor] = useState('red')
  const [disable, setDisable] = useState(false)
  const newButtonColor = buttonColor === 'red' ? 'blue' : 'red'

  return (
    <div>
      <button
        style={{ backgroundColor: buttonColor }}
        onClick={() => setButtonColor(newButtonColor)}
        disabled={disable}
      >
        Change to {newButtonColor}
      </button>
      <input
        type="checkbox"
        onChange={(e) => setDisable(e.target.checked)}
      ></input>
    </div>
  )
}

export default App
