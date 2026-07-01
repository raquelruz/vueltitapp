import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Navbar } from './components/Navbar.jsx'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { ExplorePage } from './pages/ExplorePage'
import { MyTripsPage } from './pages/MyTripsPage.jsx'

export const App = () => {
  return (
    <>
    <Navbar />
    
    <Routes> 
      <Route path="/" element={<HomePage />} />
      <Route path="/explore" element={<ExplorePage />} />
      <Route path="/my-trips/:id" element={<MyTripsPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>

    </>
  )
}