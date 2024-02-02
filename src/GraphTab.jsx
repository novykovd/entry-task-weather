import { useEffect, useState } from 'react' 
import { Line } from 'react-chartjs-2'
import { Chart } from 'chart.js/auto'
import './GraphTab.css';

function MeteoGraph(props){
    const [options, setOptions] = useState(null);
    const [data, setData] = useState(null);

    useEffect(() => {
        try{
            setData({
            labels: props.info.time,
            datasets: [
                {
                label: 'temperature',
                data: props.info.temperature_2m,
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
    
    }, [props.info])

    return (
        data ? (
            <div>
            <h2>line chart</h2>
            <Line data={data} options={options} className='graph'/>
            </div>
          ) : (<div>loading</div>)
    )
}

export default MeteoGraph;