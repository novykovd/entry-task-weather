import { useEffect, useState } from 'react' 
import './CalcTab.css';


function HeatIndexCalc(){
    const [heatIndex, setIndex] = useState(0);
    const [historyQueue, setQueue] = useState([]);
    const [checked, setChecked] = useState(false);


    const onClickCalc = () => {
      var T = document.getElementById('tempInput').value;
      var rh = document.getElementById('humidityInput').value;
  
      if (checked === true) {
        T = (9/5)*T + 32
      }
  
      if (T < 80) {
        setIndex("invalid")
      } else {
        var HI = -42.379 + (2.04901523 * T) + (10.14333127 * rh) 
        - (0.22475541*T*rh) - (6.83783*10**-3*T**2)
        - (5.481717*10**-2*rh**2) + (1.22874*10**-3*T**2*rh)
        + (8.5282*10**-4*T*rh**2) - (1.99*10**-6*T**2*rh**2)
  
        if(checked == true){
          HI = (HI - 32)*(5/9)
        }
        HI = HI.toFixed(1);
        setIndex(HI)        
      }
      
    }

    const checkBoxState = () => {
      setChecked(!checked)
    }

    useEffect(() => {
      if(heatIndex == 0){
        return
      }
      if(historyQueue.length < 5){
        setQueue((oldQ) => { return [...oldQ, heatIndex]})
      } else {
        const [oldItem, ...tempQ] = historyQueue;
        setQueue(() => { return [...tempQ, heatIndex]})
      }
    }, [heatIndex])

    return(
      <div>
          <div>
            <h2>heat index calculator</h2>
            <input type="text" placeholder='enter temperature' id='tempInput'/>
            <input type="text" placeholder='enter humidity'id='humidityInput'/>
            <div>celsius?<input type="checkbox" id='c' onChange={checkBoxState} checked={checked}/></div>
            <div><button onClick={onClickCalc}>calculate</button></div>
            <div>
              <p>Heat Index</p>
              {heatIndex}
            </div>
          </div>
          <div>
            History:
            <ul>
              {historyQueue.map((item) => {
                return(<li>{item}</li>)
              })}
            </ul>
          </div>
      </div>
    )
}

export default HeatIndexCalc;