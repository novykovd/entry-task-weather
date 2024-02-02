import { useEffect, useState } from 'react'
import './App.css'
import MeteoTable from './TableTab'
import MeteoGraph from './GraphTab'
import HeatIndexCalc from './CalcTab';

function App() {
  const [info, setInfo] = useState(null);

  useEffect(() => {

    const URL = "https://api.open-meteo.com/v1/forecast?latitude=51.5085&longitude=-0.1257&hourly=temperature_2m,relative_humidity_2m,weather_code,surface_pressure&past_days=3&forecast_days=3";


    fetch(URL).then((response) => response.json()).then((response) => {
      const hourly = response.hourly;
      console.log(hourly)
      setInfo(hourly)
    }).catch((error) => {console.log(error)})
  }, []);

  return (
    <>
      <div className='main'>
        <div className='tab1'>
          <h2>info table</h2>
          <MeteoTable info={info}/>
        </div>
        <div className='tab2'>
          <MeteoGraph info={info}/>
        </div>
        
        <div className='tab3'>
          <HeatIndexCalc></HeatIndexCalc>
        </div>
      </div>
    </>
  )
}

export default App
