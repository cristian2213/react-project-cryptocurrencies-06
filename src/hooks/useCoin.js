import React, { Fragment, useState } from 'react';
import styled from '@emotion/styled';

const Label = styled.label`
  font-family: 'Bebas Neue', cursive;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 2.4rem;
  margin-top: 2rem;
  display: block;
`;

const SelectUi = styled.select`
  width: 100%;
  display: block;
  padding: 1rem;
  -webkit-appearance: none;
  border-radius: 10px;
  border: none;
  font-size: 1.1rem; 
`;

// A hooks is simply a function
// our custom hooks
const useCoin = (label, initialState, options) => {
  // status of our hooks
  const [state, updateState] = useState(initialState);

  const Select = () => (
    <Fragment>
      <Label>{label}</Label >
      <SelectUi
        onChange={e => updateState(e.target.value)}
        value={state}
      >
        <option>-- Select --</option>
        {options.map(option => (
          <option key={option.cod} value={option.cod}>{option.name}</option>
        ))
        }
      </SelectUi>
    </Fragment>
  );

  // return state, interface and function that modify the state
  return [state, Select, updateState];
}

export default useCoin;