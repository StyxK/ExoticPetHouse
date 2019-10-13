import React from 'react';
import { BrowserRouter , Route } from 'react-router-dom'
import { Header, Container, Sidebar, Segment } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { Home } from './views/Home';
import { Store } from './views/Store'
import { SideBar } from './components/sideBar'
import '../src/styles/App.css'

function App() {
  return (
    <Sidebar.Pushable as={Segment} className='Sidebar'>
      {console.log(process.env)}
      <SideBar/>
      <Sidebar.Pusher>
        <Container fluid>
          <Header className='Header'>
            Exotic Pet House Admin
          </Header>
          <BrowserRouter>
            <Route path="/" component={Home}/>
            <Route path="/Store" component={Store}/>
          </BrowserRouter>
        </Container>
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  );
}

export default App;
