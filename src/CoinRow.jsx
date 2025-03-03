import React from "react";
import "./coinRow.css"
import Graph from './Graph'
import {deleteDec, colorDec, numberF} from './App'
//Coin Table
export default function CoinRow({ coin, index }) {
  console.log(index);
  return (
    <tr>
      <td>{index}</td>
      <td>
        {/*We get different info from json*/}
        <div className="coin_image_container">
            <img src={coin.image} title={coin.name} alt={coin.name} />
        </div>
      </td>
      <td>{numberF.format(coin.current_price)}US$</td>
      <td className={colorDec(coin.market_cap_change_percentage_24h)}>{deleteDec(coin.market_cap_change_percentage_24h, 2)}%</td>
      <td>{numberF.format(coin.total_volume)}US$</td>
      <td>{numberF.format(coin.market_cap)}US$</td>
      {/*Component Graph*/}
      <td><Graph coin={coin.id} days={7} color={colorDec(coin.market_cap_change_percentage_24h)}/></td>
    </tr>
  );
}
