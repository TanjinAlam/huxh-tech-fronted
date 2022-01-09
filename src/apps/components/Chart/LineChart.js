import React from 'react'
import { Line } from 'react-chartjs-2';

const BarChart = (data) => { 
    return(
        <div className="pt-2 pb-2">
            <Line
            data={data.data}
            width={600}
            height={435}
            borderWidth={10}
            options={{ 
                maintainAspectRatio: true,
                scales:{
                    yAxes:[
                        {
                            tricks:{
                                beginAtZero:true
                            }
                        }
                    ]
                }
            }}
        />
        </div>
    )
}

export default BarChart
