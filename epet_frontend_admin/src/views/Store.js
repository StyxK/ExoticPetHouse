import React,{useState,useEffect} from 'react'
import { Container, Card, Grid, Segment, Button, Label, Table, Radio } from 'semantic-ui-react'
import { StoreMap } from '../components/map'
import 'semantic-ui-css/semantic.min.css'
import '../styles/Store.css'

export const Store = (props) => {

    const [store,setStore] = useState([])
    const [selectedStore,setSelectedStore] = useState(undefined)
    const url = process.env.REACT_APP_URL
    let cardRef = React.createRef()

    const fetchStore = async ()=>{
        const response = await fetch(`${url}/store`)
        const data = await response.json()
        setStore(data)
    }
    
    useEffect(()=>{
        fetchStore()
    },[])

    const renderStoreInformation = () => {
        let store = selectedStore
        console.log(store)
        if(store){
            return(
                <Table textAlign='left'>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell><Label> store name </Label></Table.Cell>
                            <Table.Cell>{store.name}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell><Label> description </Label></Table.Cell>
                            <Table.Cell>{store.description}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell><Label> phone no. </Label></Table.Cell>
                            <Table.Cell>{store.phoneNumber}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell><Label> phone no. </Label></Table.Cell>
                            <Table.Cell>{store.phoneNumber}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell><Label> max deposit </Label></Table.Cell>
                            <Table.Cell>{store.maxOfDeposit}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell><Label> store status </Label></Table.Cell>
                            <Table.Cell>
                                <Grid>
                                    <Grid.Column width={8}>
                                        {store.banned ? 'prohibit':'availiable'}
                                    </Grid.Column>
                                    <Grid.Column width={8}>
                                        <Radio toggle defaultChecked={!store.banned}/>
                                    </Grid.Column>
                                </Grid>
                            </Table.Cell>
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

    const renderStoreAddress = () => {
        let store = selectedStore
        if(store){
            return(
                <Table textAlign='left' collapsing>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell><Label> street </Label></Table.Cell>
                            <Table.Cell>{store.address.street}</Table.Cell>
                            <Table.Cell><Label> district </Label></Table.Cell>
                            <Table.Cell>{store.address.district}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell><Label> province </Label></Table.Cell>
                            <Table.Cell>{store.address.province}</Table.Cell>
                            <Table.Cell><Label> postcode </Label></Table.Cell>
                            <Table.Cell>{store.address.postcode}</Table.Cell>
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

    const storeCard = ()=>{
        let list=[]
        store.map( data =>{
            list.push(
                <Card key={data.id} link onClick={()=>setSelectedStore(data)} color={'blue'} raised >
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
                <Grid.Column width={5}>
                    <Card.Group className='CardGroup' itemsPerRow='1'>
                        {storeCard()}
                    </Card.Group>
                </Grid.Column>
                <Grid.Column width={5}>
                    <Segment>
                        <Container className='StoreInfo'>
                            {renderStoreInformation()}
                        </Container>
                    </Segment>
                </Grid.Column>
                <Grid.Column width={6}>
                    <Segment>
                        <StoreMap
                            selectedStore={selectedStore}
                            stores={store}
                            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API}&v=3.exp&libraries=geometry,drawing,places`}
                            loadingElement={<div style={{ height: `100%` }} />}
                            containerElement={<div style={{ height: `50.5vh` }} />}
                            mapElement={<div style={{ height: `100%` }} />}
                        />
                    </Segment>
                    <Segment>
                        <Container textAlign='center' fluid className='StoreAddress'>
                            {renderStoreAddress()}
                        </Container>
                    </Segment>
                </Grid.Column>
            </Grid>
        </Container>
    )
}