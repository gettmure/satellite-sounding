import React from 'react';
import Col from 'react-bootstrap/Col';

const styles = {
  cell: {
    width: 20,
    height: 50,
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 100,
    border: '3px solid #2e7763',
  },
};

const CELL_CLASSNAME = 'd-flex justify-content-md-center';

export default function FooterItem({ credit }) {
  return (
    <Col className={CELL_CLASSNAME} style={styles.cell}>
      <a target="_blank" rel="noopener noreferrer" href={credit.url}>
        <img style={styles.img} src={credit.image} alt={credit.name}></img>
      </a>
    </Col>
  );
}
