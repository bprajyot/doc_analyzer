import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import './App.css'
import Dashboard from './pages/dashboard/Dashboard'
import Navbar from './components/Navbar'
import Upload from './pages/upload/Upload';
import DocumentDetails from './pages/reports/DocumentDetails';
import Documents from './pages/reports/Documents';
function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="/documents" element={<Documents />} />
      <Route path="/documents/:id" element={<DocumentDetails />} />
    </Routes>
  )
}

export default App
