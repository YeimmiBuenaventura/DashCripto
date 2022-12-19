import React from 'react';
import './Header.css';
/*We get styles and statuses fron ThemeProvider*/
import { useTheme } from './Context/ThemeProvider';

/*Get attributes*/
export default function Header({currencys, fun, cur}){
  /*This const get status*/
  const {theme, toggleTheme} = useTheme(); 
  return (
    <header className='app-header'>
      <p>Crypto Stadistics</p>
      {/*Select Header, get attributes*/}
      <div className='select-button'>
      <select value={cur} name="coinSelect" id="coinSelect" onChange={_ => {fun(document.getElementById("coinSelect").value)}}>
        {currencys.map((item, index) => <option value={item} key={index} >{item}</option>)}  
      </select>
      {/*We pass a status */}
      <button className='toogleMode' onClick={toggleTheme}>
        {theme.img}
      </button>
      </div>
    </header>
  )
}