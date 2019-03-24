import React from 'react'
import styled from 'styled-components'
import {Flex, Radio, Label} from 'pcln-design-system'

import {envs} from '../../constants'

const Wrapper = styled(Flex)`
  margin-left: auto;
  margin-right: auto;
  max-width: 400px;
  width: 100%;
`;

export default function SelectEnv({envUrl, onChange}) {
  function updateEnv(e) {
    onChange(e.target.value)
  }

  return (<Wrapper
    mb={4}
  >
    {Object.keys(envs).map((key) => {
      return (<Label fontSize={1} key={key}>
        <Radio
          checked={envs[key].urlRoot === envUrl}
          name={'env'}
          value={envs[key].urlRoot}
          onChange={updateEnv}
        />
        {' '}
        {key.toUpperCase()}
      </Label>)
    })}
  </Wrapper>)
}
