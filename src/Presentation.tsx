import React from 'react';
import {
  Deck, Slide, Heading, Text, Image, FlexBox,
} from 'spectacle';
import Pyramid from './components/Pyramid';
import lentes from './images/lentes.svg';

const theme = {
  colors: {
    primary: 'white',
    secondary: '#fffd38',
    tertiary: '#22466a',
  },
};

function Presentation() {
  return (
    <Deck theme={theme}>
      <Slide>
        <FlexBox>
          <Image src={lentes} />
          <Heading>
            Del machismo ancestral a un nuevo paradigma de la masculinidad
          </Heading>
        </FlexBox>
        <Text textAlign="center" fontSize="h3">
          Una alternativa para la reconciliación
          y la equidad entre hombres y mujeres
        </Text>
        <Text textAlign="right">
          Ing. Arturo E. Rosales Jaime
        </Text>
      </Slide>
      <Slide>
        <FlexBox bg="grey" width="60%" height="100%" alignSelf="center">
          <svg
            viewBox="0 0 450 350"
            style={{
              background: '#ccdee8',
              boxSizing: 'border-box',
              display: 'inline',
              padding: 0,
              fontFamily: "'Fira Sans', sans-serif",
              width: '100%',
              height: 'auto',
            }}
          >
            <rect x="0" y="0" width="10" height="30" fill="#f01616" />
          </svg>
        </FlexBox>
      </Slide>
      <Slide>
        <Pyramid file="Nacional1910_v2" />
      </Slide>
      <Slide>
        <Heading>Siguiente</Heading>
      </Slide>
    </Deck>
  );
}

export default Presentation;
