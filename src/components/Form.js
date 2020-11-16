import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import useCoin from '../hooks/useCoin';
import useCryptocurrency from '../hooks/useCryptocurrencies';
import axios from 'axios';

const Button = styled.input`
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  background-color: #662afe;
  border: none;
  width: 100%;
  border-radius: 10px;
  color: #fff;
  transition: background-color .3s ease;

  &:hover {
    background-color: #326AC0;
    cursor: pointer;
  }
`;

const Form = ({ Error, saveCoin, saveCryptocurrency }) => {

  // crypto.. list
  const [listCrypto, saveListCrypto] = useState([]);
  const [error, saveError] = useState(false);

  const COINS = [
    { cod: 'USD', name: 'United States Dollar' },
    { cod: 'MXN', name: 'Mexican Peso' },
    { cod: 'COP', name: 'Colombian Peso' },
    { cod: 'EUR', name: 'Euro' },
    { cod: 'GBP', name: 'Pound Sterling' }
  ];

  // use custom hooks
  const [coin, SelectCoin] = useCoin('Choose your Coin', '', COINS);

  // use useCryptocurrencies
  const [usecryptocurrency, SelectCrypto] = useCryptocurrency('Choose your Cryptocurrency', '', listCrypto);

  // Consult Api
  useEffect(() => {
    const consultApi = async () => {
      const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD`;
      const result = await axios.get(url);
      saveListCrypto(result.data.Data);
    }
    consultApi();
  }, []);

  // form data
  const handleSubmit = e => {
    e.preventDefault();

    // validate data
    if (coin === '' || usecryptocurrency === '') {
      // show error
      saveError(true);
      return;
    }

    // delete error 
    saveError(false);

    // send data to the main component
    saveCoin(coin);
    saveCryptocurrency(usecryptocurrency);
  }

  return (
    <form onSubmit={handleSubmit}>
      {error ? <Error message="There is an error" /> : null}
      <SelectCoin />
      <SelectCrypto />
      <Button
        type="submit"
        value="Quote"
      />
    </form>
  );
}

Form.propTypes = {
  Error: PropTypes.func.isRequired,
  saveCoin: PropTypes.func.isRequired,
  saveCryptocurrency: PropTypes.func.isRequired
}

export default Form;