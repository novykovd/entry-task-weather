import "./TableTab.css"
import { useEffect, useState } from 'react' 

function MeteoTable(props) {

    const [page, setPage] = useState(1);
  
    const indexLast = page*12
    const indexFirst = indexLast - 12;

    const onClickF = () => {
    setPage(page + 1)
    }
    const onClickB = () => {
    setPage(page - 1)
    }

    return (
        <div>
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
                { props.info ? (
                    props.info.time.map((time, index) => {
                    if(indexLast >= index && index >= indexFirst){
                        return(
                        <tr>
                        <td>{time}</td>
                        <td>{props.info.temperature_2m[index]}</td>
                        <td>{props.info.relative_humidity_2m[index]}</td>
                        <td>{props.info.weather_code[index]}</td>
                        <td>{props.info.surface_pressure[index]}</td>
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
    )
}

export default MeteoTable;