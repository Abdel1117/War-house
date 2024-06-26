import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { ThemeButton } from "../ThemeButton/ThemeButton"
const Header = () => {
  const [toogle, setToogle] = useState<boolean>(false)

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


  <section className="relative mx-auto">
    <nav className="flex justify-between bg-gray-900 text-white w-screen">
      <div className="px-5 xl:px-12 py-6 flex w-full items-center">
        <a className="text-3xl font-bold font-heading" href="#">
       <img className="h-9" src="../../../public/icon/icon.jpg" alt="logo" />
        </a>
        
        <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12 ">
          <li><a className="hover:text-gray-200 cursor-pointer" onClick={()=>{navigate("/")}}>Accueil</a></li>
          <li><a className="hover:text-gray-200 cursor-pointer" onClick={()=>{navigate("/")}}>Boutique</a></li>
          <li><a className="hover:text-gray-200 cursor-pointer" onClick={()=>{navigate("/")}}>Forum</a></li>
          <li><a className="hover:text-gray-200 cursor-pointer" onClick={()=>{navigate("/")}}>Salon</a></li>
        </ul>
        
        <div className="hidden md:flex items-center space-x-5">
         {/* Message Notification */}
         
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
        
        {/* End of message notification */}
        {/* Cart Icone */}
          <a onClick={()=>{navigate("/cart")}} className="flex items-center hover:text-gray-200 cursor-pointer" >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            <span className="flex absolute -mt-5 ml-4 ">
              <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500">
                </span>
              </span>
          </a>
          {/* End of Cart Modification */}
          {/* User Icone */}
          <a onClick={()=>{navigate("/user")}} className="flex items-center hover:text-gray-200 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
          </a>
          {/* End of user Icon */}
        </div>
      </div>
      <ThemeButton/>
      {/*  */}
    {/* Message Notification */}

      <a className="md:hidden flex mr-2 items-center" href="#">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </a>
          {/* End of message notification */}
          {/* Cart Icone */}
      <a className="md:hidden flex mr-2 items-center  " href="#">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <span className="flex absolute -mt-5 ml-4">
          <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500">
          </span>
        </span>
      </a>
        {/* End of Cart Modification */}
        {/* User Icon */}
        <a className="md:hidden flex items-center hover:text-gray-200 mr-2 " href="#">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
          </a>
          {/* End user Icon */}
          {/* Begin of Burger icon */}
            <a onClick={()=>{setToogle(!toogle)}} className="navbar-burger self-center mr-2  ml-6 md:hidden" href="#">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </a>
          {/* Begin of Burger icon */}
      

          {/* DropDown Menu */}

    <div className={`${toogle ? '' : 'hidden'}bg-gray-900 rounded-b-md absolute top-20 right-0 w-[320px] shadow-lg transition-height  duration-500 animate-height-expand`}>
      <ul className={` ${toogle ? '' : 'hidden'} px-4 mx-auto font-semibold font-heading text-center transition-height duration-500  animate-height-expand`}>
          <li className=""><a className="hover:text-gray-200 cursor-pointer" onClick={()=>{navigate("/")}}>Accueil</a></li>
          <li className="mt-2"><a className="hover:text-gray-200 cursor-pointer" onClick={()=>{navigate("/")}}>Boutique</a></li>
          <li className="mt-2"><a className="hover:text-gray-200 cursor-pointer" onClick={()=>{navigate("/")}}>Forum</a></li>
          <li className="mt-2 mb-2"><a className="hover:text-gray-200 cursor-pointer" onClick={()=>{navigate("/")}}>Salon</a></li>
      </ul>
    </div>

    {/* End of DrowDown Menu */}

    </nav>
    
  </section>



  )
}
export default Header