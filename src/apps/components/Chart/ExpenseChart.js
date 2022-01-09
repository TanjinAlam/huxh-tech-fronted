import React, {useState, useEffect} from 'react';
import { Column } from '@ant-design/charts';
const ExpenseChart = (transactionData) => {

    
    let val = transactionData["transactionData"]
    var data = val
    console.log("data======",val)

    // console.log("tttttttttttttta",val)
    // datass.map(item => {
    //     // if(item)data.push(item)
    //     console.log("dasdasdas",item);
    // })
    // },{
    //     type: transactionHistory[1].updatedAt,
    //     sales: transactionHistory[1].amount,
    // },{
    //     type: transactionHistory[2].updatedAt,
    //     sales: transactionHistory[2].amount,
    // },{
    //     type: transactionHistory[3].updatedAt,
    //     sales: transactionHistory[3].amount,
    // },{
    //     type: transactionHistory[4].updatedAt,
    //     sales: transactionHistory[4].amount,
    // },{
    //     type: transactionHistory[5].updatedAt,
    //     sales: transactionHistory[5].amount,
    // },{
    //     type: transactionHistory[6].updatedAt,
    //     sales: transactionHistory[6].amount,
    // },
// ];
    const loadingData=true;
    useEffect(() => {
        if (loadingData) {
            setValue()
        }
    }, []);
    function setValue(){        
        // for (let i = 0; i < transactionData.length; i++) {
        //     var temp = {
        //         type: transactionData[i].updatedAt,
        //         sales: transactionData[i].amount,
        //     }
        //     data.push(temp)        
        // }
        // console.log("dddta",data)
        // if(transactionData) transactionData.map((item) => {
        //     data.push(item)
        // })
    }
    var config = {
        data: data,
        xField: 'type',
        yField: 'sales',
        label: {
            position: 'middle',
            style: {
                fill: '#FFFFFF',
                opacity: 1,
            },
        },
        xAxis: {
            label: {
                autoHide: true,
                autoRotate: false,
            },
        },
        meta: {
            type: { alias: '' },
            sales: { alias: 'Amount' },
        },
    };
    return <Column {...config}/>;
};
export default ExpenseChart;