import React,{useState,useEffect} from 'react'
import { Container, Label, Grid, Card } from 'semantic-ui-react'
import { Bar,Doughnut } from 'react-chartjs-2'
import 'semantic-ui-css/semantic.min.css'
import '../styles/Dashboard.css'

export const Dashboard = () => {
    
    const [balance,setBalance] = useState(0)
    const [totalUser,setTotalUser] = useState({customerNumber:0,providerNumber:0,storeNumber:0})

    const fetchBalance = async () => {
        const response = await fetch('http://localhost:3000/charge/balance')
        const data = await response.json()
        setBalance(data.total)
    }

    const fetchTotalUser = async () => {
        const response = await fetch('http://localhost:3000/admin/totalUser')
        const data = await response.json()
        setTotalUser(data)
    }

    useEffect(()=>{
        fetchBalance()
        fetchTotalUser()
    },[])

    return(
        <Container fluid>
            <Grid padded>
                <Grid.Row columns={4}>
                    <Grid.Column>
                        <Card>
                            <Card.Content textAlign='center'>
                                <Card.Header className='Card.Header'>
                                    ยอดเงินทั้งหมด
                                </Card.Header>
                                <Card.Meta className='Card-Meta'>
                                    <span className='Card-Meta-Content'>{balance/100}</span>
                                </Card.Meta>
                                <Card.Description>
                                    บาท
                                </Card.Description>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                    <Grid.Column>
                        <Card>
                            <Card.Content textAlign='center'>
                                <Card.Header className='Card.Header'>
                                    ลูกค้า
                                </Card.Header>
                                <Card.Meta className='Card-Meta'>
                                    <span className='Card-Meta-Content'>{totalUser.customerNumber}</span>
                                </Card.Meta>
                                <Card.Description>
                                    คน
                                </Card.Description>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                    <Grid.Column>
                        <Card>
                            <Card.Content textAlign='center'>
                                <Card.Header className='Card.Header'>
                                    เจ้าของร้าน
                                </Card.Header>
                                <Card.Meta className='Card-Meta'>
                                    <span className='Card-Meta-Content'>{totalUser.providerNumber}</span>
                                </Card.Meta>
                                <Card.Description>
                                    คน
                                </Card.Description>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                    <Grid.Column>
                        <Card>
                            <Card.Content textAlign='center'>
                                <Card.Header className='Card.Header'>
                                    ร้านรับฝาก
                                </Card.Header>
                                <Card.Meta className='Card-Meta'>
                                    <span className='Card-Meta-Content'>{totalUser.storeNumber}</span>
                                </Card.Meta>
                                <Card.Description>
                                    แห่ง
                                </Card.Description>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    )
}