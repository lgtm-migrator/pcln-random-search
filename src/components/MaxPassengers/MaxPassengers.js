import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Label, Input, Flex, Box } from "pcln-design-system";

const PassengersInput = styled(Input)`
  max-width: 400px;
  text-align: center;
  width: 100%;
`;

export default function MaxPassengers({ onChange }) {
  return (
    <Flex justifyContent={"center"}>
      <Box>
        <Label htmlFor="passengers">Max. Passengers</Label>
        <PassengersInput
          id="passengers"
          name="passengers"
          defaultValue={1}
          type={"number"}
          onChange={(e) => onChange(e.target.value)}
        />
      </Box>
    </Flex>
  );
}

MaxPassengers.propTypes = {
  onChange: PropTypes.func.isRequired,
};
