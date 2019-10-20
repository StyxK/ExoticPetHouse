import React from 'react'
import { Container } from 'semantic-ui-react'
import { Pie,Line } from 'react-chartjs-2'
import 'semantic-ui-css/semantic.min.css'

export const Zone = (props) => {
    const data = {
        labels: ['ภาคเหนือ', 'ภาคอิสาน', 'ภาคตะวันออก', 'ภาคกลาง', 'ภาคตะวันตก', 'ภาคใต้'],
        datasets: [{
            data: [
                props.store.northern.length,
                props.store.northeastern.length,
                props.store.eastern.length,
                props.store.central.length,
                props.store.western.length,
                props.store.southern.length
            ],
            backgroundColor: [
                'green',
                'pink',
                'red',
                'orange',
                'yellow',
                'blue'
            ],
            borderWidth: 1
        }]
    }

    return(
        <Container>
            <Pie data={data} height={10000} width={10000}/>
        </Container>
    )
}

export const OrderChart = (props) => {
    let order = [0,0,0,0,0,0,0,0,0,0,0,0]
    if(props.order.length){
        props.order.map(data=>{
            switch(data.mon){
                case 'Jan' : order[0]=[data.amount];break;
                case 'Feb' : order[1]=[data.amount];break;
                case 'Mar' : order[2]=[data.amount];break;
                case 'Apr' : order[3]=[data.amount];break;
                case 'May' : order[4]=[data.amount];break;
                case 'Jun' : order[5]=[data.amount];break;
                case 'Jul' : order[6]=[data.amount];break;
                case 'Aug' : order[7]=[data.amount];break;
                case 'Sep' : order[8]=[data.amount];break;
                case 'Oct' : order[9]=[data.amount];break;
                case 'Nov' : order[10]=[data.amount];break;
                case 'Dec' : order[11]=[data.amount];break;
            }
        })
    }
    const data = {
        labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
        datasets: [{
            label : 'จำนวนการจอง',
            data: order,
            pointStyle:'rect',
            pointBackgroundColor:'green',
            backgroundColor:'rgba(0, 0, 0, 0)',
            borderColor: 'green',
            borderWidth: 2
        }]
    }

    return(
        <Container>
            <Line data={data}/>
        </Container>
    )
}