import React from 'react';
import { BrowserRouter , Route } from 'react-router-dom'
import { home } from './views/Home';

function App() {
  return (
    <BrowserRouter>
      <Route path="/" component={home}/>
    </BrowserRouter>
  );
}

export default App;
