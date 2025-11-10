import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/navbar'
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='dark:bg-gray-800 min-h-screen'>
      <Navbar/>
    </div>
  )
}

export default App
