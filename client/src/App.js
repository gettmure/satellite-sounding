import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import NavigationBar from './Navbar/NavigationBar';
import Footer from './Footer/Footer';
import Welcome from './Body/Welcome';
import Container from './Body/Rendering/Container';
import { BrowserRouter, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <NavigationBar></NavigationBar>
        <Route exact component={Welcome} path="/"></Route>
        <Route exact component={Container} path="/rendering"></Route>
        <Footer></Footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
