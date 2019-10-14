import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Modal,List, Label, Image, Grid, Segment } from 'semantic-ui-react'
import '../styles/Order.css'
import moment from 'moment'
import { OrderStep } from '../components/step'

export const OrderDetails = (props) => {

    const renderOrderLines = () => {
        let list = []
        props.order.orderLines.map(data=>{
            list.push(
                <Segment key={data.id}>
                    <List.Item>
                        <List.Content>
                            <Grid padded>
                                <Grid.Column width={8}>
                                <List.Content className='ListDescription'>
                                    <Image circular size='small' src={data.pet.image}/>
                                </List.Content>
                                </Grid.Column>
                                <Grid.Column width={8}>
                                    <Grid.Row>
                                        <List.Content className='ListDescription'>
                                            <Label>Pet name</Label> {data.pet.name}
                                        </List.Content>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <List.Content className='ListDescription'>
                                            <Label>Pet age</Label> {data.pet.age}
                                        </List.Content>
                                    </Grid.Row>
                                </Grid.Column>
                            </Grid>
                        </List.Content>
                    </List.Item>
                </Segment>
            )
        })
        return list
    }

    return(
        <Modal trigger={props.button} size='large'>
            <Modal.Header> Order Details of : {props.order.id} </Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    <List>
                        <Grid stretched>
                            <Grid.Column width={8}>
                                <Segment>
                                    <Grid.Row>
                                        <List.Description className='ListDescription'>
                                            <Label>Store name</Label> {props.order.store.name}
                                        </List.Description>
                                        <List.Description className='ListDescription'>
                                            <Label>Store Phone Number</Label> {props.order.store.phoneNumber}
                                        </List.Description>
                                        <List.Description className='ListDescription'>
                                            <Label>Customer</Label> {props.order.customerUsername}
                                        </List.Description>
                                        <List.Description className='ListDescription'>
                                            <Label>Submit Date</Label> {moment(props.order.submitDate).format('L')}
                                        </List.Description>
                                        <List.Description className='ListDescription'>
                                            <Label>Start Date</Label> {moment(props.order.startDate).format('L')}
                                        </List.Description>
                                        <List.Description className='ListDescription'>
                                            <Label>End Date</Label> {moment(props.order.endDate).format('L')}
                                        </List.Description>
                                    </Grid.Row>
                                </Segment>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                {renderOrderLines()}
                            </Grid.Column>
                            <Grid.Column width={16} className='Cell'>
                                <Segment>
                                    <OrderStep status={props.order.orderStatus.id}/>
                                </Segment>
                            </Grid.Column>
                        </Grid>
                    </List>
                </Modal.Description>
            </Modal.Content>
        </Modal>
    )
}