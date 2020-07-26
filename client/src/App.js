import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import NavigationBar from './Navbar/NavigationBar';
import Footer from './Footer/Footer';
import Welcome from './Body/Welcome';
import MapRendering from './Body/MapRendering';
import { BrowserRouter, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <NavigationBar></NavigationBar>
        <Route component={Welcome} path="/home"></Route>
        <Route component={MapRendering} path="/rendering"></Route>
        <Footer></Footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
