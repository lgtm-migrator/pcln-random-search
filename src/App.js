import React, { useState } from "react";
import styled from "styled-components";
import { ThemeProvider, Button, Heading, Flex, Box } from "pcln-design-system";

import "./App.css";
import { randomFlight } from "./urlGenerators/flights";
import SelectEnv from "./components/SelectEnv";
import MaxPassengers from "./components/MaxPassengers";
import TripType from "./components/TripType/TripType";

const BtnContainer = styled(Flex)`
  & > * {
    margin: 0 8px;
  }
`;

const StyledPassengersInput = styled(MaxPassengers)`
  margin-bottom: 24px;
`;

const goToUrl = (url) => {
  window.open(url, "_blank");
};

function App() {
  const [env, setEnv] = useState("local");
  const [passengers, setPassengers] = useState(1);
  const [tripType, setTripType] = useState("RT");

  return (
    <ThemeProvider>
      <div className="App">
        <Flex justifyContent={"center"} flexDirection={"column"}>
          <Heading.h2 fontSize={18} mt={0} mb={2}>
            PCLN Random Search
          </Heading.h2>

          <Heading.h3 fontSize={14} mt={0} mb={2}>
            Environment
          </Heading.h3>
          <SelectEnv onChange={setEnv} env={env} />

          <Flex flexDirection={"column"} justifyContent={"center"}>
            <Heading.h3 fontSize={14} mt={0} mb={1}>
              Flight Parameters
            </Heading.h3>
            <Box mb={3}>
              <StyledPassengersInput onChange={setPassengers} />
            </Box>

            <TripType tripType={tripType} onChange={setTripType} />
          </Flex>

          <Heading.h3 fontSize={14} mt={0} mb={1}>
            Product
          </Heading.h3>
          <BtnContainer justifyContent={"center"}>
            <Button
              onClick={() => goToUrl(randomFlight(env, passengers, tripType))}
            >
              Flight
            </Button>
          </BtnContainer>
        </Flex>
      </div>
    </ThemeProvider>
  );
}

export default App;
