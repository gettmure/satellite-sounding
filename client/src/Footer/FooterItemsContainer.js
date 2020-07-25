import React from 'react';
import { Container, Row } from 'react-bootstrap';
import FooterItem from './FooterItem';
import PropTypes from 'prop-types';

const styles = {
  container: {
    width: 300,
  },
};

function FooterItemsContainer(props) {
  return (
    <Container style={styles.container}>
      <Row>
        {props.credits.map((credit) => {
          return <FooterItem credit={credit} key={credit.name}></FooterItem>;
        })}
      </Row>
    </Container>
  );
}

FooterItemsContainer.propTypes = {
  credits: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default FooterItemsContainer;
