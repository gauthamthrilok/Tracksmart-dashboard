import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Homepage from './pages/homepage'
import Trackpage from './pages/trackpage';
import './App.css'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/trackorder" element={<Trackpage/>}/>
      </Routes>
    </Router>
  )
}

export default App
