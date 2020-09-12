import React from "react";
import styled from "styled-components";
import { Flex, Radio, Label } from "pcln-design-system";

import { envs } from "../../constants";

const Wrapper = styled(Flex)`
  margin-left: auto;
  margin-right: auto;
  text-align: left;
`;

const EnvLabel = styled(Label)`
  white-space: nowrap;
`;

export default function SelectEnv({ env, onChange }) {
  function updateEnv(e) {
    onChange(e.target.value);
  }

  return (
    <Wrapper mb={4} flexDirection={"column"}>
      {Object.keys(envs).map((key) => {
        return (
          <EnvLabel fontSize={1} key={key}>
            <Radio
              checked={key === env}
              name={"env"}
              value={key}
              onChange={updateEnv}
            />{" "}
            {key.toUpperCase()}
          </EnvLabel>
        );
      })}
    </Wrapper>
  );
}
