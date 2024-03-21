import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TabelaCarros from './tabelaCarros'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <TabelaCarros />
    </>
  )
}

export default App
