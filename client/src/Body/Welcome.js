import React from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

import satelliteBackground from '../assets/images/satellite-background.jpg';

const styles = {
  container: {
    height: '86.6%',
    overflow: 'hidden',
    border: '2px solid #559de4',
  },
  welcomeImage: {
    height: '100%',
    backgroundImage: `url(${satelliteBackground})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    filter: 'blur(2px)',
    transform: 'scale(1.3)',
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
