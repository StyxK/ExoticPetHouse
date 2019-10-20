import React,{useState,useEffect} from 'react'
import { Container, Card, Grid, Segment, Button } from 'semantic-ui-react'
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

    const storeCard = ()=>{
        let list=[]
        store.map( data =>{
            list.push(
                <Card key={data.id} link onClick={()=>setSelectedStore(data.address)} color={'blue'} raised >
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
                <Grid.Column width={10}>
                    <Card.Group className='CardGroup' itemsPerRow='1'>
                        {storeCard()}
                    </Card.Group>
                </Grid.Column>
                <Grid.Column width={6}>
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