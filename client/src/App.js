import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import NavigationBar from './Navbar/NavigationBar';
import Footer from './Footer/Footer';

function App() {
  return (
    <div className="app">
      <NavigationBar></NavigationBar>
      <Footer></Footer>
    </div>
  );
}

export default App;
