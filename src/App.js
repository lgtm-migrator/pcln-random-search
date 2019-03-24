import React, { useState} from 'react';
import {ThemeProvider, Button, Heading, Flex} from 'pcln-design-system'

import './App.css';
import {randomFlight} from './urlGenerators/flights'
import SelectEnv from './components/SelectEnv'
import {envs} from './constants'

const goToUrl = (url) => {
  window.open(url, '_blank')
}

function App() {
  const [envUrl, setEnv] = useState(envs.qaa.urlRoot)

  return (
    <ThemeProvider>
      <div className="App">
        <Flex
          justifyContent={'center'}
          flexDirection={'column'}
        >
          <Heading.h1>PCLN Random Search</Heading.h1>

          <SelectEnv
            onChange={setEnv}
            envUrl={envUrl}
          />

          <Flex
            justifyContent={'center'}
          >
            <Button
              onClick={() => goToUrl(randomFlight(envUrl))}
            >Flight</Button>
          </Flex>
        </Flex>
      </div>
    </ThemeProvider>
  );
}

export default App;
