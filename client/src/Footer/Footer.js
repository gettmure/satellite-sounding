import React from 'react';
import FooterItemsContainer from './FooterItemsContainer';

import githubLogo from './../assets/images/github.png';
import tangekuImg from './../assets/images/Tangeku.jpg';
import gettmureImg from './../assets/images/gettmure.jpg';
import lliriknatImg from './../assets/images/LliriKnat.jpg';
import fefuImg from './../assets/images/FEFU.png';

const styles = {
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'fixed',
    bottom: 0,
    width: '100%',
    height: 70,
    backgroundColor: '#cdd2d7',
  },
};

export default function Footer() {
  const credits = [
    {
      name: 'Github Repository',
      image: githubLogo,
      url: 'https://github.com/gettmure/satellite-sounding',
    },
    {
      name: 'Tangeku VK',
      image: tangekuImg,
      url: 'https://vk.com/flimu',
    },
    {
      name: 'Gettmure VK',
      image: gettmureImg,
      url: 'https://vk.com/gettmure',
    },
    {
      name: 'LliriKnat VK',
      image: lliriknatImg,
      url: 'https://vk.com/yas0su_bibu',
    },
    {
      name: 'FEFU Website',
      image: fefuImg,
      url: 'https://dvfu.ru/',
    },
  ];
  return (
    <div className="footer" style={styles.footer}>
      <FooterItemsContainer credits={credits}></FooterItemsContainer>
    </div>
  );
}
