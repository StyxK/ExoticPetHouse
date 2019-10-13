import React,{useState} from 'react'
import { Sidebar, Menu, Icon } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { Link,BrowserRouter } from 'react-router-dom'

export const SideBar = () => {

    return (
        <BrowserRouter>
        <Sidebar icon='labeled' as={Menu} width='thin' vertical visible>
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
            <Menu.Item link>
                <Icon name="list"/>Order
            </Menu.Item>
        </Sidebar>
        </BrowserRouter>
    )
}