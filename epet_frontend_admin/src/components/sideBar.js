import React,{useState} from 'react'
import { Sidebar, Menu, Icon } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { Link } from 'react-router-dom'

export const SideBar = (props) => {

    return (
        <Sidebar icon='labeled' animation="slide along" visible={props.visible} as={Menu} width='thin' vertical >
            <Menu.Item>
                <Icon name="user circle"/>
                Administrator
            </Menu.Item>
            <Menu.Item as={Link} to='/Store'>
                <Icon name="home"/>Store
            </Menu.Item>
            <Menu.Item link>
                <Icon name="add user"/>Registry Owner
            </Menu.Item>
            <Menu.Item as={Link} to='/Order'>
                <Icon name="list"/>Order
            </Menu.Item>
        </Sidebar>
    )
}