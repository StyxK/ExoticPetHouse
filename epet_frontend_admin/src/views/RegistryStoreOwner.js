import React,{useState,useEffect} from 'react'
import { Grid , Radio , Table  } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

export const RegistryStoreOwner = (props) => {

    const [user,setUser] = useState([])

    useEffect(()=>{
        fetchStoreOwner()
    },[])

    const fetchStoreOwner = async () => {
        const response = await fetch(`${process.env.REACT_APP_URL}/storeowner/users`)
        const data = await response.json()
        setUser(data)
    }

    const approved = async (userName,checked) => {
        const response = await fetch(`${process.env.REACT_APP_URL}/admin/approve`,{
            method:'POST',
            body:JSON.stringify({userName:userName,approved:checked}),
            headers: { 'Content-Type': 'application/json' }
        })
        const data = await response.json()
        fetchStoreOwner()
        console.log(data) 
    }

    const renderOwnerList = () => {
        let list = []
        user.map(data=>{
            list.push(
                <Table.Row key={data.userName}>
                    <Table.Cell>{data.userName}</Table.Cell>
                    <Table.Cell>{data.firstName}</Table.Cell>
                    <Table.Cell>{data.lastName}</Table.Cell>
                    <Table.Cell>{data.email}</Table.Cell>
                    <Table.Cell>
                        <Radio toggle defaultChecked={data.approved} onChange={( e,checked )=> {approved(data.userName,checked)}}/>
                    </Table.Cell>
                </Table.Row>
            )
        })
        return list
    }

    return(
        <Grid padded>
            <Grid.Row>
                <Grid.Column>
                    <Table padded celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>username</Table.HeaderCell>
                                <Table.HeaderCell>firstname</Table.HeaderCell>
                                <Table.HeaderCell>lastname</Table.HeaderCell>
                                <Table.HeaderCell>email</Table.HeaderCell>
                                <Table.HeaderCell>approved</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {renderOwnerList()}
                        </Table.Body>
                    </Table>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}