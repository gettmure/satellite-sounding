import React from 'react';

const styles = {
  container: {
    // padding: '20px'
  },
  loader: {
    zIndex: 1000,
    margin: '10px 30px 0 0',
  },
};

export default function Loader() {
  return (
    <div className="loader-container" style={styles.container}>
      <div className="lds-ring" style={styles.loader}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      Waiting for response...
    </div>
  );
}
