import React,{useState} from 'react';
import { BrowserRouter , Route } from 'react-router-dom'
import { Header, Icon, Sidebar, Segment, Button } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { Order } from './views/Order'
import { Store } from './views/Store'
import { SideBar } from './components/sideBar'
import { Dashboard } from './views/Dashboard';
import '../src/styles/App.css'

function App() {

  const [visible,setVisible] = useState(false)

  return (
    <BrowserRouter>
      <Sidebar.Pushable as={Segment} className='Sidebar'>
        <SideBar visible={visible}/>
        <Sidebar.Pusher>
            <Header block>
              <Button icon={<Icon name='list'/>} onClick={()=>setVisible(!visible)}/>
              Exotic Pet House Admin
            </Header>
            <Route path="/" exact component={Dashboard}/>
            <Route path="/Store" exact component={Store}/>
            <Route path="/Order" exact component={Order}/>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </BrowserRouter>
  );
}

export default App;
