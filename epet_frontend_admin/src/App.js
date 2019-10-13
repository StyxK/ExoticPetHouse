import React from 'react';
import { BrowserRouter , Route } from 'react-router-dom'
import { Header, Container } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { home } from './views/Home';
import { SideBar } from './components/sideBar'
import '../src/styles/App.css'

function App() {
  return (
    <Container className='Container'>
        <Header as='h3' block textAlign='center'>
            Exotic pet house admin
        </Header>
        <SideBar page = {home}/>
        <BrowserRouter>
          <Route path="/" component={home}/>
        </BrowserRouter>
    </Container>
  );
}

export default App;
