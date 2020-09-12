import React from "react";
import styled from "styled-components";
import { Flex, Radio, Label } from "pcln-design-system";

const Wrapper = styled(Flex)`
  margin-left: auto;
  margin-right: auto;
  text-align: left;
`;

const TripTypeLabel = styled(Label)`
  white-space: nowrap;
`;

const TRIP_TYPES = ["OW", "RT", "MD"];

export default function TripType({ tripType, onChange }) {
  return (
    <Wrapper mb={4} flexDirection={"column"}>
      <Label htmlFor="tripType">Trip Type</Label>
      {TRIP_TYPES.map((key) => {
        return (
          <TripTypeLabel fontSize={1} key={key}>
            <Radio
              checked={key === tripType}
              name={"tripType"}
              value={key}
              onChange={(e) => onChange(e.target.value)}
            />{" "}
            {key.toUpperCase()}
          </TripTypeLabel>
        );
      })}
    </Wrapper>
  );
}
