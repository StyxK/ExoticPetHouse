import React,{useState} from 'react'
import { Sidebar, Menu, Icon, Segment } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

export const SideBar = () => {
    
    return (
        <Sidebar.Pushable as={Segment}>
            <Sidebar as={Menu} width='thin' vertical visible>
                <Menu.Item>
                    <Icon name="home"/>Home
                </Menu.Item>
            </Sidebar>
            <Sidebar.Pusher>
                {this.props.page}
            </Sidebar.Pusher>
        </Sidebar.Pushable>
    )
}