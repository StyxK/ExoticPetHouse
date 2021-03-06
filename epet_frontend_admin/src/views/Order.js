import React,{useEffect,useState} from 'react'
import { Dropdown, Table, Grid, Button, Label } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import '../styles/Order.css'
import { OrderDetails } from '../components/orderDetails'
import moment from 'moment'
import { StoreSearchBar } from '../components/storeSearchBar'

export const Order = (props) => {

    const [order,setOrder] = useState([])
    const [status,setStatus] = useState([])
    const [filter,setFilter] = useState(undefined)
    const [store,setStore] = useState(undefined)
    const url = process.env.REACT_APP_URL

    const statusLabel = (data) => {
        switch(data){
            case 'รอร้านตอบรับ' : return <Label color='orange'> {data} </Label>
            case 'ร้านปฏิเสธการรับฝาก' : return <Label color='red'> {data} </Label>
            case 'ยกเลิกการส่งฝาก': return <Label color='red'> {data} </Label>
            case 'รับสัตว์เลี้ยงแล้ว': return <Label color='green'> {data} </Label>
            default : return <Label color='blue'> {data} </Label>
        }
    }

    const fetchStatus = async () => {
        let arr = [{key:0,text:'ทั้งหมด',value:'all'}]
        const respone = await fetch(`${url}/order/statuses`)
        const data = await respone.json()
        data.map( statuses =>{
            arr.push({key:statuses.id,text:statuses.status,value:statuses.status})
        })
        setStatus(arr)
    }

    const fetchOrder = async () => {
        const respone = await fetch(`${url}/order/All`)
        const data = await respone.json()
        setOrder(data)
        console.log(data)
    }

    const renderOrder = () => {
        let list = []
        let filtered = []
        if(!filter || filter==='all'){
            filtered = order
        }else{
            filtered = order.filter( data =>{
                return data.orderStatus.status === filter
            })
        }
        if(store){
            filtered = filtered.filter( data => {
                return data.store.name == store
            })
        }
        filtered.map(data => 
            list.push(
                <Table.Row key={data.id}>
                    <Table.Cell>{data.id}</Table.Cell>
                    <Table.Cell>{data.customerUsername}</Table.Cell>
                    <Table.Cell>{data.store.name}</Table.Cell>
                    <Table.Cell>
                        {statusLabel(data.orderStatus.status)}
                    </Table.Cell>
                    <Table.Cell>{moment(data.startDate).format('L')}</Table.Cell>
                    <Table.Cell>{moment(data.endDate).format('L')}</Table.Cell>
                    <Table.Cell className='Cell' textAlign='center'>
                        <OrderDetails button={<Button positive> more details </Button>} order={data}/>
                    </Table.Cell>
                </Table.Row>
            )
        )
        return list
    }

    const rerenderParentCallback = (value) => {
        setStore(value)
    }

    useEffect(()=>{
        fetchOrder()
        fetchStatus()
    },[])

    return(
        <Grid padded>
            <Grid.Row className='Filter'>
                <Grid.Column width={4}>
                    <Label> orderStatus</Label>
                    <Dropdown onChange={(event,data)=>setFilter(data.value)} placeholder='select status' selection options={status}/>
                </Grid.Column>
                <Grid.Column width={4}>
                    <Label> Store</Label>
                    <StoreSearchBar rerenderParentCallback={rerenderParentCallback}/>
                </Grid.Column>
                <Grid.Column width={4}>
                    <Button onClick={ () => setStore(undefined)}> Get from all store </Button>
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
                                <Table.HeaderCell>order lines</Table.HeaderCell>
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