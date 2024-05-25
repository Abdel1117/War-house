import { ReactNode, createContext, useEffect, useState } from "react"

interface ThemeContextType {
    theme: string;
    setTheme: (theme: string) => void;
    toggleTheme: () => void;
}
export const themeContext = createContext<ThemeContextType | undefined>(undefined)

/**
 * Propaging the value of the theme to display Light or Dark mode
 * @author Abderahmane Adjali
 * @param {MyComponentsProps} param0
 * @returns {JSX.Element}
 */

interface MyComponentsProps {
    children : ReactNode;
}

export const ThemeProvider = ({ children }: MyComponentsProps ) : JSX.Element => {

    const initalState : string = localStorage.getItem("theme") || "light";

    const [theme, setTheme] = useState<string>(initalState)

     const toggleTheme = () => {
        const newTheme : string = theme === "light" ? "dark" : "light"; 
        console.log(`The new theme is ${newTheme}`)
        localStorage.setItem("theme", newTheme)
        setTheme(newTheme)
    }

    useEffect(() => {
        setTheme(initalState)
       
    }, [ initalState])

    return (
        <themeContext.Provider value={{ theme, setTheme, toggleTheme }}>
            {children}
        </themeContext.Provider>
    )
}

