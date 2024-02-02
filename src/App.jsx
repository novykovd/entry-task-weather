import { useEffect, useState } from 'react'
import './App.css'
import { Line } from 'react-chartjs-2'
import { Chart } from 'chart.js/auto'

function App() {
  const [info, setInfo] = useState(null);
  const [options, setOptions] = useState(null);
  const [data, setData] = useState(null);
  const [heatIndex, setIndex] = useState(0);
  const [page, setPage] = useState(1);
  
  const indexLast = page*12
  const indexFirst = indexLast - 12;


  const onClickF = () => {
    setPage(page + 1)
  }
  const onClickB = () => {
    setPage(page - 1)
  }

  const onClickCalc = () => {
    var T = document.getElementById('tempInput').value;
    var rh = document.getElementById('humidityInput').value;
    var unitC = document.getElementById('c').value;

    if (unitC == 'on') {
      T = (9/5)*T + 32
    }

    if (T < 80) {
      setIndex("invalid")
    } else {
      var HI = -42.379 + (2.04901523 * T) + (10.14333127 * rh) 
      - (0.22475541*T*rh) - (6.83783*10**-3*T**2)
      - (5.481717*10**-2*rh**2) + (1.22874*10**-3*T**2*rh)
      + (8.5282*10**-4*T*rh**2) - (1.99*10**-6*T**2*rh**2)

      if(unitC == 'on'){
        HI = (5/9)*(HI-32)
        setIndex(HI)
      }else{
        setIndex(HI)
      }
      
    }
    
  }


  useEffect(() => {

    const URL = "https://api.open-meteo.com/v1/forecast?latitude=51.5085&longitude=-0.1257&hourly=temperature_2m,relative_humidity_2m,weather_code,surface_pressure&past_days=3&forecast_days=3";


    fetch(URL).then((response) => response.json()).then((response) => {
      const hourly = response.hourly;
      console.log(hourly)
      setInfo(hourly)
    }).catch((error) => {console.log(error)})
  }, []);

  useEffect(() => {
    try{
      setData({
        labels: info.time,
        datasets: [
          {
            label: 'temperature',
            data: info.temperature_2m,
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            fill: false,
          },
        ],
      })

      setOptions({
        scales: {
          x: {
            labels: data.labels,
          },
          y: {
            beginAtZero: true,
          },
        },
      })

      console.log(data);
    }catch(error){
      console.log(error)
    }
    
  }, [info])

  return (
    <>
      <div className='main'>
        <div className='tab1'>
          <h2>info table</h2>
          <table>
            <thead>
              <tr>
                <th>datetime</th>
                <th>temp</th>
                <th>relative humidity</th>
                <th>weather code</th>
                <th>surface_pressure</th>
              </tr>
            </thead>
            <tbody>
              { info ? (
                info.time.map((time, index) => {
                  if(indexLast >= index && index >= indexFirst){
                    return(
                    <tr>
                      <td>{time}</td>
                      <td>{info.temperature_2m[index]}</td>
                      <td>{info.relative_humidity_2m[index]}</td>
                      <td>{info.weather_code[index]}</td>
                      <td>{info.surface_pressure[index]}</td>
                    </tr>
                    )
                  }else{
                    console.log("skip")
                  }
                })) : (<tr><td>loading</td><td></td></tr>)
              }
            </tbody>
          </table>
          <div>
            <button onClick={onClickB}>back</button>
            <button onClick={onClickF}>forward</button>
          </div>
        </div>
        <div className='tab2'>
        {
          data ? (
            <div>
            <h2>line chart</h2>
            <Line data={data} options={options} className='graph'/>
            </div>
          ) : (<div>loading</div>)
        }
        </div>
        
        <div className='tab3'>
          <h2>heat index calc</h2>
          <input type="text" placeholder='enter temperature' id='tempInput'/>
          <input type="text" placeholder='enter humidity'id='humidityInput'/>
          <div>celsius?<input type="checkbox" id='c'/></div>
          <div><button onClick={onClickCalc}>calculate</button></div>
          <div>
            {heatIndex}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
