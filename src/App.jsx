import { useEffect, useState } from 'react'
import './App.css'
import MeteoTable from './TableTab'
import MeteoGraph from './GraphTab'
import HeatIndexCalc from './CalcTab';

function App() {
  const [info, setInfo] = useState(null);
  const [rangeF, setRangeF] = useState(3)
  const [rangeP, setRangeP] = useState(3)

  useEffect(() => {

    const URL = `https://api.open-meteo.com/v1/forecast?latitude=51.5085&longitude=-0.1257&hourly=temperature_2m,relative_humidity_2m,weather_code,surface_pressure&past_days=${rangeP}&forecast_days=${rangeF}`;


    fetch(URL).then((response) => response.json()).then((response) => {
      const hourly = response.hourly;
      console.log(hourly)
      setInfo(hourly)
    }).catch((error) => {console.log(error)})
  }, [rangeF, rangeP]);

  const handleChangeSlider = (event) => {
    const newValue = parseInt(event.target.value, 10);
    if(event.target.id == 'futureSlider'){
      setRangeF(newValue)
    } else {
      setRangeP(newValue)
    }
  }

  return (
    <>
      <div className='main'>
        <div className='tab1'>
          <h2>info table</h2>
          <div>future days forecast<input type="range" min={1} max={3} step={1} value={rangeF} id='futureSlider' onChange={handleChangeSlider}/></div>
          <div>past days forecast<input type="range" min={0} max={3} step={1} value={rangeP} id='pastSlider' onChange={handleChangeSlider}/></div>
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
