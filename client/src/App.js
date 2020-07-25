import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import NavigationBar from './Navbar/NavigationBar';
import Footer from './Footer/Footer';
import Welcome from './Body/Welcome';

function App() {
  const googleAuth = async () => {
    // const login = await fetch('https://localhost:1337/login');
  };

  return (
    <div className="app">
      <NavigationBar></NavigationBar>
      <Welcome loginClick={googleAuth}></Welcome>
      <Footer></Footer>
    </div>
  );
}

export default App;
