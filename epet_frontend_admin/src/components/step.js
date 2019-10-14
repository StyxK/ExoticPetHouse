import React from 'react'
import { Step,Icon } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

export const OrderStep = (props) => {

    const status = ['รอร้านตอบรับ','ยกเลิกการส่งฝาก','ร้านตอบรับการฝากแล้ว','กำลังอยู่ระหว่างการฝาก','ร้านปฎิเสธการรับฝาก','จบการฝาก','รับสัตว์เลี้ยงแล้ว','ร้านส่งสัตว์เลี้ยงตืน','ชำระค่าบริการแล้ว']
    const waitingStoreAccept = (active) => {
        return(
            active ? 
            <Step>
                <Icon name='wait' />
                <Step.Content>
                    <Step.Title>รอร้านตอบรับการฝาก</Step.Title>
                </Step.Content>
            </Step>
            :
            <Step disabled>
                <Icon name='wait' />
                <Step.Content>
                    <Step.Title>รอร้านตอบรับการฝาก</Step.Title>
                </Step.Content>
            </Step>
        )
    }
    const cancelOrder = (active) => {
        return (
            active ?
            <Step>
                <Icon name='remove' />
                <Step.Content>
                    <Step.Title>ยกเลิกการส่งฝาก</Step.Title>
                </Step.Content>
            </Step>
            :
            <Step disabled>
                <Icon name='remove' />
                <Step.Content>
                    <Step.Title>ยกเลิกการส่งฝาก</Step.Title>
                </Step.Content>
            </Step>
        )
    }
    const denyOrder = (active) => {
        return(
            active ?
            <Step>
                <Icon name='remove' />
                <Step.Content>
                    <Step.Title>ร้านปฎิเสธการรับฝาก</Step.Title>
                </Step.Content>
            </Step>
            :
            <Step disabled>
                <Icon name='remove' />
                <Step.Content>
                    <Step.Title>ร้านปฎิเสธการรับฝาก</Step.Title>
                </Step.Content>
            </Step>
        )
    }
    const acceptedOrder = (active) => {
        return(
            active ?
            <Step>
                <Icon name='checkmark' />
                <Step.Content>
                    <Step.Title>ร้านตอบรับการฝากแล้ว</Step.Title>
                </Step.Content>
            </Step>
            :
            <Step disabled>
                <Icon name='checkmark' />
                <Step.Content>
                    <Step.Title>ร้านตอบรับการฝากแล้ว</Step.Title>
                </Step.Content>
            </Step>
        )
    }
    const depositing = (active) => {
        return(
            active ?
            <Step>
                <Icon name='home' />
                <Step.Content>
                    <Step.Title>กำลังอยู่ระหว่างการฝาก</Step.Title>
                </Step.Content>
            </Step>
            :
            <Step disabled>
                <Icon name='home' />
                <Step.Content>
                    <Step.Title>กำลังอยู่ระหว่างการฝาก</Step.Title>
                </Step.Content>
            </Step>
        )
    }
    const depositingEnd = (active) => {
        return(
            active ?
            <Step>
                <Icon name='delete calendar' />
                <Step.Content>
                    <Step.Title>จบการฝาก</Step.Title>
                </Step.Content>
            </Step>
            :
            <Step disabled>
                <Icon name='delete calendar' />
                <Step.Content>
                    <Step.Title>จบการฝาก</Step.Title>
                </Step.Content>
            </Step>
        )
    }
    const payment = (active) => {
        return(
            active ?
            <Step>
                <Icon name='payment' />
                <Step.Content>
                    <Step.Title>ชำระค่าบริการแล้ว</Step.Title>
                </Step.Content>
            </Step>
            :
            <Step disabled>
                <Icon name='payment' />
                <Step.Content>
                    <Step.Title>ชำระค่าบริการแล้ว</Step.Title>
                </Step.Content>
            </Step>
        )
    }

    const returnPetBack = (active) => {
        return(
            active ?
            <Step>
                <Icon name='redo alternate' />
                <Step.Content>
                    <Step.Title>ร้านส่งสัตว์เลี้ยงคืน</Step.Title>
                </Step.Content>
            </Step>
            :
            <Step disabled>
                <Icon name='redo alternate' />
                <Step.Content>
                    <Step.Title>ร้านส่งสัตว์เลี้ยงคืน</Step.Title>
                </Step.Content>
            </Step>
        )
    }

    const renderStep = () => {
        switch(props.status){
            case 1 : return [waitingStoreAccept(true)] ; 
            case 2 : return [waitingStoreAccept(),acceptedOrder(true)] ;
            case 3 : return [waitingStoreAccept(),acceptedOrder(),depositing(true)] ;
            case 4 : return [waitingStoreAccept(),cancelOrder(true)] ;
            case 5 : return [waitingStoreAccept(),denyOrder(true)] ;
            case 6 : return [waitingStoreAccept(),acceptedOrder(),depositing(),depositingEnd(true)] ;
            case 7 : return [depositing(),depositingEnd(),payment(),returnPetBack(true)] ;
            case 8 : return [waitingStoreAccept(true)] ;
            case 9 : return [waitingStoreAccept(),acceptedOrder(),depositing(),depositingEnd(),payment(true)] ;
        }
    }

    return(
        <Step.Group size='mini'>
            {renderStep()}
        </Step.Group>
    )
}