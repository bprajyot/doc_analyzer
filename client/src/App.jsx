import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import './App.css'
import Dashboard from './pages/dashboard/Dashboard'
import Navbar from './components/Navbar'
function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
    </Routes>
  )
}

export default App
