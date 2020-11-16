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

const SelectCryptoUi = styled.select`
  width: 100%;
  display: block;
  padding: 1rem;
  -webkit-appearance: none;
  border-radius: 10px;
  border: none;
  font-size: 1.1rem; 
`;


const useCryptocurrency = (label, initialState, options) => {

  const [state, updateState] = useState(initialState);

  const SelectCrypto = () => (
    <Fragment>
      <Label>{label}</Label >

      <SelectCryptoUi
        onChange={e => updateState(e.target.value)}
        value={state}
      >
        <option>-- Select --</option>
        {
          options.map(crypto => (
            <option key={crypto.CoinInfo.Id} value={crypto.CoinInfo.Name}>{crypto.CoinInfo.FullName}</option>
          ))
        }
      </SelectCryptoUi>
    </Fragment>
  );

  return [state, SelectCrypto, updateState];
}

export default useCryptocurrency;