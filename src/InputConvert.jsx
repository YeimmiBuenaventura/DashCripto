/* useRef Intertwine with the HTML*/
import React, {useState, useRef} from "react";
import "./Convert.css";
import {deleteDec} from './App' 

/*Create const and asigned values, status*/
export default function InputConvert({ coin,  sel = "btc", fun, other,text, type = 1, result = 0}) {
  const selRef = useRef(null)
  const [selVal, setSelVal] = useState(sel)

  return (
    <>
    {/*we award features to inputs*/}
      <div className="input">
        {(type === 0) ? <input type="number" placeholder="0" onChange={e => {text(parseFloat(e.target.value))}}/>
        : <input type="number" placeholder="0" value={deleteDec(result, 4)} readOnly={true}/>}
        
          {/*This select get differents coins with their features*/}
        <div className="select">
          <img src="" alt="" />
          <select value={selVal} ref={selRef} onChange={() => {
              setSelVal(selRef.current.value)
              fun(selRef.current.value)
            }}>
              {/*We make a conditional that allows us to delete the second selection*/}
            {coin.map((co) => {
              if(co.symbol === selVal){
                selRef.current.previousSibling.src = co.image
                return <option value={co.symbol} key={co.id}>{co.symbol}</option>
              }else if(co.symbol != other){
                return <option value={co.symbol} key={co.id}>{co.name}</option>
              }
              /* if(index === sel){
              return <option selected value={co.symbol} key={co.id}>{co.symbol}</option>
              }else{
              return <option value={co.symbol} key={co.id}>{co.name}</option>
              }
              } */
            })}
          </select>
        </div>
      </div>
    </>
  );
}
