import React from "react";
import "./tableCoins.css";
import CoinRow from "./CoinRow";

function TableCoins({ coins }) {
  console.log(coins);
  return (
    //We create a table
    <table className="table_coins">
      <thead>
        {/* We specify the differents columns*/}
        <tr>
          <td>#</td>
          <td>Moneda</td>
          <td>Precio</td>
          <td>24h</td>
          <td>Vol. total</td>
          <td>Cap. mercado</td>
          <td>Ultimos 7 dias</td>
        </tr>
      </thead>
      {/*Indicate the info that will fill the table rows, calling CoinRow Component*/}
      <tbody>
        {coins.map((coin, index) => (
          <CoinRow coin={coin} key={index} index={index + 1} />
        ))}
      </tbody>
    </table>
  );
}

export default TableCoins;
