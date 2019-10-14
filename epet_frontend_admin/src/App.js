import React from 'react';
import { BrowserRouter , Route } from 'react-router-dom'
import { Header, Container, Sidebar, Segment } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { Home } from './views/Home';
import { Order } from './views/Order'
import { Store } from './views/Store'
import { SideBar } from './components/sideBar'
import '../src/styles/App.css'

function App() {
  return (
    <BrowserRouter>
      <Sidebar.Pushable as={Segment} className='Sidebar'>
        {console.log(process.env)}
        <SideBar/>
        <Sidebar.Pusher>
          <Container fluid>
            <Header block>
              Exotic Pet House Admin
            </Header>
              <Route path="/" component={Home}/>
              <Route path="/Store" component={Store}/>
              <Route path="/Order" component={Order}/>
          </Container>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </BrowserRouter>
  );
}

export default App;
