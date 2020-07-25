import React from 'react';
import { Container, Row } from 'react-bootstrap';
import FooterItem from './FooterItem';

const styles = {
  container: {
    width: 300,
  },
};

export default function FooterItemsContainer(props) {
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
