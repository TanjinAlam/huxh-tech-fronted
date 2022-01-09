import React from 'react'
import { Doughnut } from 'react-chartjs-2';

const DoughnutChart = (data) => { 
    return(
        <div className="pt-2 pb-2 h-100 d-flex align-items-center">
            <Doughnut
            data={data.data}
        />
        </div>
    )
}

export default DoughnutChart
