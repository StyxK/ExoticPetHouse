import React,{useState,useEffect} from 'react'
import { Container, Label, Grid, Card, Segment } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import '../styles/Dashboard.css'
import { Zone,OrderChart } from '../components/chart'

export const Dashboard = () => {
    
    const [balance,setBalance] = useState(0)
    const [totalUser,setTotalUser] = useState({customerNumber:0,providerNumber:0,storeNumber:0})
    const [filteredStoreByZone,setFilteredStoreZone] = useState({northern:[],northeastern:[],central:[],western:[],eastern:[],southern:[]})
    const [filteredCustomerByZone,setFilteredCustomerZone] = useState({northern:[],northeastern:[],central:[],western:[],eastern:[],southern:[]})
    const [orderSequence,setOrderSequence] = useState({})
    const url = process.env.REACT_APP_URL

    const fetchBalance = async () => {
        const response = await fetch(`${url}/charge/balance`)
        const data = await response.json()
        setBalance(data.total)
    }

    const fetchTotalUser = async () => {
        const response = await fetch(`${url}/admin/totalUser`)
        const data = await response.json()
        setTotalUser(data)
    }

    const fetchFilteredStoreZone = async () => {
        const response = await fetch(`${url}/admin/filterStoreByZone`)
        const data = await response.json()
        setFilteredStoreZone(data)
    }

    const fetchFilteredCustomerZone = async () => {
        const response = await fetch(`${url}/admin/filterCustomerByZone`)
        const data = await response.json()
        setFilteredCustomerZone(data)
    }

    const fetchOrderSequence = async () => {
        const response = await fetch(`${url}/admin/orderSequence`)
        const data = await response.json()
        setOrderSequence(data)
    }

    useEffect(()=>{
        fetchBalance()
        fetchTotalUser()
        fetchFilteredStoreZone()
        fetchFilteredCustomerZone()
        fetchOrderSequence()
    },[])

    return(
        <Container>
            <Grid padded centered>
                <Grid.Row columns={4}>
                    <Grid.Column>
                        <Card className='BalanceCard'>
                            <Card.Content textAlign='center'>
                                <Card.Header>
                                    <span className='Card-Header'>ยอดเงินทั้งหมด</span>
                                </Card.Header>
                                <Card.Meta className='Card-Meta'>
                                    <span className='Card-Meta-Content'>{parseInt(balance/100)}</span>
                                </Card.Meta>
                                <Card.Description>
                                    <span className='Card-Description'>บาท</span>
                                </Card.Description>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                    <Grid.Column>
                        <Card className='CustomerCard'>
                            <Card.Content textAlign='center'>
                                <Card.Header>
                                    <span className='Card-Header'>ลูกค้า</span>
                                </Card.Header>
                                <Card.Meta className='Card-Meta'>
                                    <span className='Card-Meta-Content'>{totalUser.customerNumber}</span>
                                </Card.Meta>
                                <Card.Description>
                                    <span className='Card-Header'>คน</span>
                                </Card.Description>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                    <Grid.Column>
                        <Card className='ProviderCard'>
                            <Card.Content textAlign='center'>
                                <Card.Header>
                                    <span className='Card-Header'>เจ้าของร้าน</span>
                                </Card.Header>
                                <Card.Meta className='Card-Meta'>
                                    <span className='Card-Meta-Content'>{totalUser.providerNumber}</span>
                                </Card.Meta>
                                <Card.Description>
                                    <span className='Card-Header'>คน</span>
                                </Card.Description>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                    <Grid.Column>
                        <Card className='StoreCard'>
                            <Card.Content textAlign='center'>
                                <Card.Header>
                                    <span className='Card-Header'>ร้านรับฝาก</span>
                                </Card.Header>
                                <Card.Meta className='Card-Meta'>
                                    <span className='Card-Meta-Content'>{totalUser.storeNumber}</span>
                                </Card.Meta>
                                <Card.Description>
                                    <span className='Card-Header'>แห่ง</span>
                                </Card.Description>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row stretched columns={3}>
                    <Grid.Column width={8}>
                        <Card fluid>
                            <Card.Content textAlign='center' className='Row-Chart'>
                                <Card.Header>
                                    ยอดการจองกรง
                                </Card.Header>
                                <OrderChart order={orderSequence}/>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <Card fluid>
                            <Card.Content textAlign='center' className='Row-Chart'>
                                <Card.Header>
                                    ร้านตามภูมิภาค
                                </Card.Header>
                                <Zone store={filteredStoreByZone}/>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <Card fluid>
                            <Card.Content textAlign='center' className='Row-Chart'>
                                <Card.Header>
                                    ลูกค้าตามภูมิภาค
                                </Card.Header>
                                <Zone store={filteredCustomerByZone}/>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    )
}