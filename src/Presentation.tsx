import React from 'react';
import {
  Deck, Slide, Heading, Text, Image, FlexBox,
} from 'spectacle';
import lentes from './Images/Lentes.svg';

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
          <Heading>Del machismo ancestral a un nuevo paradigma de la masculinidad</Heading>
        </FlexBox>
        <Text textAlign="center" fontSize="h3">
          Una alternativa para la reconciliación y la equidad entre hombres y mujeres
        </Text>
        <Text textAlign="right">
          Ing. Arturo E. Rosales Jaime
        </Text>
      </Slide>
    </Deck>
  );
}

export default Presentation;
