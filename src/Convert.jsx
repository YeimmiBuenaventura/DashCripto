import { useEffect, useState } from "react";
import axios from "axios";
import InputConvert from "./InputConvert"; // Componente
import { FaExchangeAlt } from "react-icons/fa"; // Icono
import "./Convert.css"; // Estilos
import { object } from "prop-types";

export default function Convert() {
  //Differents const with a status
  const [coin, setCoin] = useState([])
  const [selCoin1, setSelCoin1] = useState("btc")
  const [selCoin2, setSelCoin2] = useState("eth")
  const [mainTxt, setMainTxt] = useState(0)
  const [res, setRes] = useState(0)

  //Asynchronous function to obtain API data
  const getData = async () => {
    //we make a request to the API
    const result = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1"
    );

    // Establish the value of the data obtained
    setCoin(result.data);
  };
  //Get the data when the component loads
  useEffect(() => {
    //API data
    getData()
  }, []);
 //We eject a ciclo for and conditional, for make a coin change
  useEffect(_ => {
    let a,b
    coin.forEach(({symbol, current_price}) =>{
      if(symbol == selCoin1){
        a = (mainTxt * current_price) / 1
      }else if(symbol == selCoin2){
        b = current_price
      }
    })
    //Inputs
      a ? setRes(a / b) : setRes(0)
  },[mainTxt,selCoin1,selCoin2])

  return (
    <div className="contenedor">
      <h2>Comparación de Monedas</h2>

      <div className="input-convert">
        {/*Info inputs 1 */}
        <InputConvert coin={coin} fun={setSelCoin1} other={selCoin2} text={setMainTxt} type={0} />
        {/*Info Icon to exchange */}
        <FaExchangeAlt className="icono" />
        {/*Info inputs 2 */}
        <InputConvert coin={coin} sel="eth" fun={setSelCoin2} other={selCoin1} result={res}/>
      </div>
    </div>
  );
}
