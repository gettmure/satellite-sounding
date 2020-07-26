import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import NavigationBar from './Navbar/NavigationBar';
import Footer from './Footer/Footer';
import Welcome from './Body/Welcome';
import MapRendering from './Body/MapRendering';

function App() {
  return (
    <div className="app">
      <NavigationBar></NavigationBar>
      <MapRendering></MapRendering>
      {/* <Welcome loginClick={googleAuth}></Welcome> */}
      <Footer></Footer>
    </div>
  );
}

export default App;
