import { createContext, ReactNode, useState } from "react";

export interface ThemeContextProps {
  dark: boolean;
  toggleFunction: () => void;
}

const inititalState={
    dark: false,
    toggleFunction: () => {}
}
const ThemeContext = createContext<ThemeContextProps >(inititalState);

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [dark, setDark] = useState(false);

  const toggleFunction = () => {
    const body=document.body;
    if(!dark){
        body.classList.remove('dark-mode')
        body.classList.add('light-mode')
    }else{
        body.classList.remove('light-mode')
        body.classList.add('dark-mode')
    }
    setDark(!dark);

  };

  return (
    <ThemeContext.Provider value={{ dark, toggleFunction }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
