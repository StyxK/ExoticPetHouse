import React from 'react'
import { Sidebar, Menu, Icon } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { Link } from 'react-router-dom'
import '../styles/App.css'

export const SideBar = (props) => {

    return (
        <Sidebar icon='labeled' animation="slide along" visible={props.visible} as={Menu} width='thin' vertical >
            <Menu.Item className='Admin'>
                <Icon name="user circle"/>
                Administrator
            </Menu.Item>
            <Menu.Item as={Link} to='/'>
                <Icon name="line graph"/>Dashboard
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