import React,{useState,useEffect} from 'react'
import { Container, Card, Grid, Segment, Button, Label, Table, Radio, Form, Header } from 'semantic-ui-react'
import { StoreMap } from '../components/map'
import 'semantic-ui-css/semantic.min.css'
import '../styles/Store.css'

export const Store = (props) => {

    const [store,setStore] = useState([])
    const [radio,setRadio] = useState()
    const [selectedStore,setSelectedStore] = useState(undefined)
    const url = process.env.REACT_APP_URL
    
    useEffect(()=>{
        fetchStore()
    },[])

    useEffect(()=>{
        console.log('change')
    })

    const fetchStore = async ()=>{
        const response = await fetch(`${url}/store`)
        const data = await response.json()
        setStore(data)
    }

    const banned = async (id,checked)=>{
        const response = await fetch(`${url}/admin/banned`,{
            method:'POST',
            body:JSON.stringify({id:id,banned:checked}),
            headers: { 'Content-Type': 'application/json' }
        })
        await fetchStore()
        setRadio(checked)
    }
    

    const renderStoreInformation = () => {
        if(selectedStore){
            return(
                <Table textAlign='left' className="InfoTable">
                    <Table.Body className='StoreRow'>
                        <Table.Row >
                            <Table.Cell><Label> store name </Label></Table.Cell>
                            <Table.Cell>{selectedStore.name}</Table.Cell>
                        </Table.Row>
                        <Table.Row className='StoreRow'>
                            <Table.Cell><Label> description </Label></Table.Cell>
                            <Table.Cell>{selectedStore.description}</Table.Cell>
                        </Table.Row>
                        <Table.Row className='StoreRow'>
                            <Table.Cell><Label> phone no. </Label></Table.Cell>
                            <Table.Cell>{selectedStore.phoneNumber}</Table.Cell>
                        </Table.Row>
                        <Table.Row className='StoreRow'>
                            <Table.Cell><Label> max deposit </Label></Table.Cell>
                            <Table.Cell>{selectedStore.maxOfDeposit}</Table.Cell>
                        </Table.Row>
                        <Table.Row className='StoreRow'>
                            <Table.Cell><Label> store status </Label></Table.Cell>
                            <Table.Cell>
                                <Form>
                                    <Form.Field>
                                        <Radio checked={!radio} 
                                            label='available'
                                            value='available'
                                            onChange={()=>{banned(selectedStore.id,false)}}
                                        />
                                    </Form.Field>
                                    <Form.Field>
                                        <Radio checked={radio} 
                                            label='prohibit'
                                            value='prohibit'
                                            onChange={()=>{banned(selectedStore.id,true)}}
                                        />
                                    </Form.Field>
                                </Form>
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row className='StoreRow'>
                            <Table.Cell><Label> street </Label></Table.Cell>
                            <Table.Cell>{selectedStore.address.street}</Table.Cell>
                            <Table.Cell><Label> district </Label></Table.Cell>
                            <Table.Cell>{selectedStore.address.district}</Table.Cell>
                        </Table.Row>
                        <Table.Row className='StoreRow'>
                            <Table.Cell><Label> province </Label></Table.Cell>
                            <Table.Cell>{selectedStore.address.province}</Table.Cell>
                            <Table.Cell><Label> postcode </Label></Table.Cell>
                            <Table.Cell>{selectedStore.address.postcode}</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            )
        }
        else{
            return(
                <Container fluid>
                    <Label> select store for information </Label>
                </Container>
            )
        }
    }

    const rerenderParentCallback = (value) => {
        setStore(value)
    }

    const storeCard = ()=>{
        let list=[]
        store.map( data =>{
            list.push(
                <Card key={data.id} link onClick={()=>{setSelectedStore(data);setRadio(data.banned)}} color={'blue'} raised >
                    <Card.Content>
                         <Card.Header>
                            {data.name}
                        </Card.Header>
                        <Card.Meta>
                            {data.description}
                        </Card.Meta>
                    </Card.Content>
                </Card>
            )
        })
        return list
    }

    return(
        <Container fluid className='Container'>
            <Grid>
                <Grid.Column width={4}>
                    <Card.Group className='CardGroup' itemsPerRow='1'>
                        {storeCard()}
                    </Card.Group>
                </Grid.Column>
                <Grid.Column width={7}>
                    <Segment>
                        <Container className='StoreInfo'>
                            <Header size='huge' textAlign='center'> Store Information </Header>
                            {renderStoreInformation()}
                        </Container>
                    </Segment>
                </Grid.Column>
                <Grid.Column width={5}>
                    <Segment>
                        <StoreMap
                            selectedStore={selectedStore}
                            stores={store}
                            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API}&v=3.exp&libraries=geometry,drawing,places`}
                            loadingElement={<div style={{ height: `100%` }} />}
                            containerElement={<div style={{ height: `78.5vh` }} />}
                            mapElement={<div style={{ height: `100%` }} />}
                        />
                    </Segment>
                </Grid.Column>
            </Grid>
        </Container>
    )
}