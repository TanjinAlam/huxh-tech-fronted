import React from 'react'
import { Bar } from 'react-chartjs-2';

const BarChart = (data) => { 
    return(
        <div className="pt-2 pb-2">
            <Bar
            data={data.data}
            width={600}
            height={435}
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
