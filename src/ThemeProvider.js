//createContex allow create a context
import React, { createContext, useContext, useState } from "react";
import { BsFillMoonFill,BsFillSunFill } from "react-icons/bs";//Import icons
//*Save styles in const for status dark and light
const themeStyles = { 
  dark:{
    background:'#01211E',
    text:'white',
    img: <BsFillMoonFill/>
  },
  light:{
    background:'white',
    text:'black',
    img: <BsFillSunFill/>
  }
}
//Create a context and assign it to a variable
const ThemeContext = createContext();

const ThemeProvider = (props) => {
  //Asigning dark status
  const [theme, setTheme] = useState('dark');
  //Conditional to use
  const toggleTheme = () => theme === 'dark' ? setTheme('light') : setTheme('dark');
  //Asigning styles
  const value = { theme: themeStyles[theme], toggleTheme, themeName: theme };
  return <ThemeContext.Provider value={value} {...props} />;
}


/*Use a defined context*/
const useTheme = () => useContext(ThemeContext);

/*Export*/
export { ThemeProvider, useTheme };