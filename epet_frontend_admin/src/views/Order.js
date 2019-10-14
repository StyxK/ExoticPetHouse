import React,{useEffect,useState} from 'react'
import { Dropdown, Table, Grid, } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import '../styles/Order.css'

export const Order = (props) => {

    const [order,setOrder] = useState([])
    const [status,setStatus] = useState([])
    const [filter,setFilter] = useState(undefined)

    const fetchStatus = async () => {
        let arr = [{key:0,text:'ทั้งหมด',value:'all'}]
        const respone = await fetch('http://localhost:3000/order/statuses')
        const data = await respone.json()
        data.map( statuses =>{
            arr.push({key:statuses.id,text:statuses.status,value:statuses.status})
        })
        setStatus(arr)
    }

    const fetchOrder = async () => {
        const respone = await fetch('http://localhost:3000/order/All')
        const data = await respone.json()
        setOrder(data)
    }

    const renderOrder = () => {
        let list = []
        let filtered = []
        if(!filter || filter=='all'){
            filtered = order
        }else{
            filtered = order.filter( data =>{
                return data.orderStatus.status == filter
            })
        }
        filtered.map(data => 
            list.push(
                <Table.Row key={data.id}>
                    <Table.Cell>{data.id}</Table.Cell>
                    <Table.Cell>{data.customerUsername}</Table.Cell>
                    <Table.Cell>{data.store.name}</Table.Cell>
                    <Table.Cell>{data.orderStatus.status}</Table.Cell>
                    <Table.Cell>{data.startDate}</Table.Cell>
                    <Table.Cell>{data.endDate}</Table.Cell>
                </Table.Row>
            )
        )
        return list
    }

    useEffect(()=>{
        fetchOrder()
        fetchStatus()
    },[])

    return(
        <Grid padded>
            <Grid.Row>
                <Grid.Column>
                    Order Status <Dropdown onChange={(event,data)=>setFilter(data.value)} placeholder='select status' selection options={status}/>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    <Table padded celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>order id</Table.HeaderCell>
                                <Table.HeaderCell>customer</Table.HeaderCell>
                                <Table.HeaderCell>store</Table.HeaderCell>
                                <Table.HeaderCell>orderStatus</Table.HeaderCell>
                                <Table.HeaderCell>startDate</Table.HeaderCell>
                                <Table.HeaderCell>endDate</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {renderOrder()}
                        </Table.Body>
                    </Table>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}