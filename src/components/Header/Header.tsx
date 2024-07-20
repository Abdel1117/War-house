import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { ThemeButton } from "../ThemeButton/ThemeButton"
const Header = () => {
  const [toogle, setToogle] = useState<boolean>(false)
  const [toogleMenuInMenu, setToogleMenuInMenu] = useState<boolean>(false)
  const navigate = useNavigate()

  const resetToogle = () => {
    const innerWidth = window.innerWidth

    if (innerWidth >= 760) setToogle(false)
  }

  useEffect(() => {
    window.addEventListener('resize', resetToogle);

    return () => window.removeEventListener('resize', resetToogle)
  }, [])

  return (


    <nav className="border-gray-200 dark:bg-gray-900">
    <div className="container mx-auto flex flex-wrap items-center justify-between h-[80px]">
        <a onClick={() => {navigate("/")}} className="ml-8">
        <img className="h-9" src="../../../public/icon/icon.jpg" alt="logo" />
        </a>
            <ThemeButton/>
        <button onClick={()=>{setToogle(!toogle)}} data-collapse-toggle="mobile-menu" type="button" className="md:hidden ml-3 mr-6 text-gray-400 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-lg inline-flex items-center justify-center" aria-controls="mobile-menu-2" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
        <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </button>
        <div className={`${toogle ? "" : "hidden" } bg-gray-200 rounded-md border md:border-none dark:bg-gray-900 md:block w-10/12 md:w-auto z-50 absolute right-[50%] left-[50%] translate-x-[-50%] top-20 md:translate-x-0   md:static`} id="mobile-menu">
        <ul className="flex-col md:flex-row flex md:space-x-8 mt-4 md:mt-0 md:text-sm md:font-medium mr-8">
            <li>
            <a onClick={() => {navigate("/")}} className="text-black dark:text-white block pl-3 pr-4 py-2 md:p-0 rounded focus:outline-none hover:cursor-pointer hover:hover:text-blue-700 hover:underline">Accueil</a>
            </li>
            <li>
                <button onClick={()=>{setToogleMenuInMenu(!toogleMenuInMenu)}} id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar" className="text-black dark:text-white md:border-0 pl-3 pr-4 py-2 hover:hover:text-blue-700 hover:underline md:p-0 font-medium flex items-center justify-between w-full md:w-auto relative border-black">Dropdown <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></button>
                {/* Dropdown menu  */}
                <div id="dropdownNavbar" className={`${toogleMenuInMenu ? '' : 'hidden'}  text-base z-10 list-none divide-y divide-gray-100 rounded shadow my-4 w-44 absolute top-24 md:top-10 dark:bg-gray-400`}>
                    <ul className="py-1" aria-labelledby="dropdownLargeButton">
                    <li>
                        <a onClick={() => {navigate("/boutique")}} className="text-sm hover:cursor-pointer hover:underline text-black dark:text-white block px-4 py-2">Dashboard</a>
                    </li>
                    <li>
                        <a onClick={() => {navigate("/chat")}} className="text-sm hover:cursor-pointer hover:underline text-black dark:text-white block px-4 py-2">Settings</a>
                    </li>
                    <li>
                        <a onClick={() => {navigate("/")}} className="text-sm hover:cursor-pointer hover:underline text-black dark:text-white block px-4 py-2">Earnings</a>
                    </li>
                    </ul>
                    <div className="py-1">
                    <a onClick={() => {navigate("/inscription")}} className="text-sm hover:cursor-pointer hover:underline text-black dark:text-white block px-4 py-2">S'inscire</a>
                    </div>
                </div>
            </li>
            <li>
            <a onClick={() => {navigate("/")}} className="text-black dark:text-white hover:underline hover:hover:text-blue-700 border-b hover:cursor-pointer border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-blue-700 md:p-0">Services</a>
            </li>
            <li>
            <a onClick={() => {navigate("/")}} className="text-black dark:text-white hover:underline hover:hover:text-blue-700 border-b hover:cursor-pointer border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-blue-700 md:p-0">Pricing</a>
            </li>
            <li>
            <a onClick={() => {navigate("/")}} className="text-black dark:text-white hover:underline hover:hover:text-blue-700 border-b hover:cursor-pointer border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-blue-700 md:p-0">Contact</a>
            </li>
        </ul>
        </div>
    </div>
    </nav>



  )
}
export default Header