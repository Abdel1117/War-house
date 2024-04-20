import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Accueil from "./pages/Accueil/Accueil.tsx"
import Login from './pages/Login/Login.tsx'
import Header from "./components/Header/Header.tsx"
import Footer from "./components/Footer/Footer.tsx"

function App() {

  return (
    <>
    <Header />
      <main className='min-h-[100vh]  bg-[#252525]'>
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    <Footer />
    </>
  )
}

export default App
