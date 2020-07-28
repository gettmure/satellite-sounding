import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const styles = {
  toolbar: {
    position: 'fixed',
    top: '10%',
    left: '10px',
    zIndex: 999,
  },
};

function Toolbar({ setDragging }) {
  const panClickHandler = () => {
    setDragging(true);
  };
  const areaClickHandler = () => {
    setDragging(false);
  };

  return (
    <ButtonGroup style={styles.toolbar} className="toolbar" vertical>
      <Button onClick={panClickHandler} className="pan">
        PAN
      </Button>
      <Button onClick={areaClickHandler} className="area">
        AREA
      </Button>
    </ButtonGroup>
  );
}

Toolbar.propTypes = {
  setDragging: PropTypes.func.isRequired,
};

export default Toolbar;
