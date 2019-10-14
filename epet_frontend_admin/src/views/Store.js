import React,{useState,useEffect} from 'react'
import { Container, Card } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import '../styles/Store.css'

export const Store = (props) => {
    const [store,setStore] = useState([])

    const fetchStore = async ()=>{
        const response = await fetch('http://localhost:3000/store')
        const data = await response.json()
        console.log(data)
        setStore(data)
    }
    
    useEffect(()=>{
        fetchStore()
    },[])

    const storeCard = ()=>{
        let list=[]
        store.map( data =>{
            list.push(
                <Card key={data.id}>
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
            <Card.Group itemsPerRow='5'>
                {storeCard()}
            </Card.Group>
        </Container>
    )
}