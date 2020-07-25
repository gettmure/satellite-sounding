import React from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

import satelliteBackground from '../assets/images/satellite-background.jpg';

const styles = {
  container: {
    height: '86.6%',
  },
  welcomeImage: {
    height: '100%',
    backgroundImage: `url(${satelliteBackground})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    filter: 'blur(2px)',
    border: '2px solid #559de4',
  },
  welcomeText: {
    backgroundColor: 'rgba(0,0,0, 0.4)',
    color: 'white',
    fontWeight: 'bold',
    border: '3px solid #f1f1f1',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 2,
    width: '70%',
    padding: '20px',
    textAlign: 'center',
    textShadow:
      '2px 0 0 #000, -2px 0 0 #000, 0 2px 0 #000, 0 -2px 0 #000, 1px 1px #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000',
  },
};

function Welcome({ loginClick }) {
  return (
    <div className="welcome-container" style={styles.container}>
      <div className="welcome-image" style={styles.welcomeImage}></div>
      <div className="welcome-text" style={styles.welcomeText}>
        <h1>Satellite sounding application</h1>
        <Button variant="primary" onClick={() => loginClick()}>
          Get started!
        </Button>
      </div>
    </div>
  );
}

Welcome.propTypes = {
  loginClick: PropTypes.func,
};

export default Welcome;