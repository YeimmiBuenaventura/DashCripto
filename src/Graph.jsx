import "./Graph.css"
//useEffect receives as parameter a function that will be executed every time our component is rendered.
import {useEffect, useState, useRef} from 'react' 
//Import a module from node_modules
import { Line } from "react-chartjs-2"; 
/*Import how ChartJS from chart.js library*/
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
  } from 'chart.js';
import moment from "moment";

/*Save register of charts*/
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
)

/*Style of the graphs*/
export default function Graph({type = 1, coin = "bitcoin", currency = "usd", days = 30,color = "#04D99D"}){
    const chartStyle = {
        border: {
            display: false
        },
        grid:{
            display: false,  
        },
        ticks: {
            display: false
        }
    }
    //Link from Coingecko-Api, get info about coin
    let url = `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=${currency}&days=${days}&interval=daily` 
    let data , options
    /*Statuses*/
    const [prices, setPrices] = useState()
    const [dates, setDates] = useState()
    const [gradient, setGradient] = useState()
    //We ejecut async function, in the first const get info from url, in the second const we convert the info in json. 
    async function getData(){
        try{
            const response = await fetch(url)
            const json = await response.json()
            //Prices Coin, Math.round returns the value of a number rounded to the nearest integer.
            setPrices(json.prices.map(item => Math.round(item[1])))
            //We assign to the date a format
            setDates(json.prices.map(item => moment.unix(item[0]).format("MM-DD")))
        }catch(e){
            console.log("error:",e)
        }
    }
    //With useEffect ejecut a function when the page render, get data and draw the graph 
    const chartRef = useRef(null);
    useEffect(_ => {
        getData()
        const canvas = chartRef.current.firstChild
        let BGgradient = canvas.getContext("2d").createLinearGradient(0, 0, 0, canvas.height);
        BGgradient.addColorStop(0, 'rgba(78, 47, 64)');   
        BGgradient.addColorStop(1, 'rgba(122, 88, 106)')
        setGradient(BGgradient)
    },[])
    
    /*Implement a switch that have features for the graphs*/
    switch(type){
        case 0:

            options = {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                  legend: {
                    display: false,
                  },
                  title: {
                    display: false,
                  }
                },
                scales: {
                    x:{
                        grid:{
                            display: false
                        }
                    },
                    y:{
                        grid:{
                            display: false
                        },
                        ticks: {
                            callback: function(value, index, ticks) {
                                return `$${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} ${currency.toUpperCase()}`;
                            }
                        }
                    }
                }
              }
            data = {
                labels: dates,
                datasets: [
                  {
                    data: prices,
                    borderColor: color,
                    backgroundColor: gradient,
                    tension: .4,
                    pointRadius: 0,
                    fill: true
                  }
                ]
              }
              break
        case 1:
            options = {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                  legend: {
                    display: false,
                  },
                  title: {
                    display: false,
                  }
                },
                scales: {
                    x: chartStyle,
                    y: chartStyle
                }
              }
            data = {
                labels: dates,
                datasets: [
                  {
                    data: prices,
                    borderColor: color,
                    tension: .4,
                    pointRadius: 0,
                  }
                ]
              }
            break
    }
    /*return info to ref*/
    return (
        <div ref={chartRef} className="graph">
            <Line data={data} options={options}/>
        </div> 
    )
}