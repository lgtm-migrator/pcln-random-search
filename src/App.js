import React, { useState} from 'react';
import styled from 'styled-components'
import {ThemeProvider, Button, Heading, Flex, Text} from 'pcln-design-system'

import './App.css';
import {randomFlight} from './urlGenerators/flights'
import SelectEnv from './components/SelectEnv'

const BtnContainer = styled(Flex)`
  & > * {
    margin: 0 8px;
  }
`;

const goToUrl = (url) => {
  window.open(url, '_blank')
}

function App() {
  const [env, setEnv] = useState('qaa')

  return (
    <ThemeProvider>
      <div className="App">
        <Flex
          justifyContent={'center'}
          flexDirection={'column'}
        >
          <Heading.h2 mt={0}>PCLN Random Search</Heading.h2>

          <Heading.h3 mt={0} mb={2}>Environment</Heading.h3>
          <SelectEnv
            onChange={setEnv}
            env={env}
          />

          <Heading.h3 mt={0} mb={1}>Product</Heading.h3>
          <Text color={'gray'} mb={2}>(More products coming soon)</Text>
          <BtnContainer
            justifyContent={'center'}
          >
            <Button
              onClick={() => goToUrl(randomFlight(env))}
            >Flight</Button>
            <Button disabled>Hotel</Button>
            <Button disabled>Car</Button>
            <Button disabled>PKG</Button>
          </BtnContainer>
        </Flex>
      </div>
    </ThemeProvider>
  );
}

export default App;
