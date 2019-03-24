import React, {Component} from 'react';
import {ThemeProvider, Button, Heading, Flex} from 'pcln-design-system'

import './App.css';
import {randomFlight} from './urlGenerators/flights'

class App extends Component {
  goToUrl = (url) => {
    window.open(url, '_blank')
  }

  render() {
    return (
      <ThemeProvider>
        <div className="App">
          <Flex
            justify={'center'}
            flexDirection={'column'}
          >
            <Heading.h1>PCLN Random Search</Heading.h1>
            <Flex
              justify={'center'}
            >
              <Button
                onClick={() => this.goToUrl(randomFlight())}
              >Flight</Button>
            </Flex>
          </Flex>
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
