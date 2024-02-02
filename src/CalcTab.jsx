import { useEffect, useState } from 'react' 
import './CalcTab.css';


function HeatIndexCalc(){
    const [heatIndex, setIndex] = useState(0);


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

    return(
        <div>
            <h2>heat index calc</h2>
            <input type="text" placeholder='enter temperature' id='tempInput'/>
            <input type="text" placeholder='enter humidity'id='humidityInput'/>
            <div>celsius?<input type="checkbox" id='c'/></div>
            <div><button onClick={onClickCalc}>calculate</button></div>
            <div>
            <p>Heat Index</p>
            {heatIndex}
            </div>
        </div>
    )
}

export default HeatIndexCalc;